import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose" 

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isProtectedPath = path.startsWith("/dashboard")

    const isAuthPath = path === "/login" || path === "/signup" || path === "/forgot-password"

    const token = request.cookies.get("auth_token")?.value

    if (isProtectedPath && !token) {
        const url = new URL("/login", request.url)
        url.searchParams.set("callbackUrl", encodeURI(request.nextUrl.pathname))
        return NextResponse.redirect(url)
    }

    if (token) {
        try {
            const { payload } = await jwtVerify(token, JWT_SECRET)

            const requestHeaders = new Headers(request.headers)
            requestHeaders.set("x-user-id", payload.id as string)
            requestHeaders.set("x-user-email", payload.email as string)
            requestHeaders.set("x-user-name", payload.name as string)

            if (isAuthPath) {
                return NextResponse.redirect(new URL("/dashboard", request.url))
            }

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            })
        } catch (error) {
            console.error("Token verification failed:", error)

            if (isProtectedPath) {
                const response = NextResponse.redirect(new URL("/login", request.url))
                response.cookies.delete("auth_token")
                return response
            }
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/login",
        "/signup",
        "/forgot-password",
    ],
}

