import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, JWT_SECRET)

    return NextResponse.json({
      user: {
        id: payload.id as string,
        email: payload.email as string,
        name: payload.name as string,
      },
    })
  } catch (error: any) {
    console.error("Auth verification error:", error)

    if (error.name === "TokenExpiredError") {
      return NextResponse.json({ user: null }, { status: 401, statusText: "Token has expired" })
    }

    return NextResponse.json({ user: null }, { status: 401, statusText: "Invalid token" })
  }
}
