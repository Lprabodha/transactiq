import { type NextRequest, NextResponse } from "next/server"
import { validateUser } from "@/lib/models/user"
import { cookies } from "next/headers"
import { SignJWT } from "jose"
import { UserValidationError } from "@/lib/exceptions"

const JWT_EXPIRATION = "7d"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 
const COOKIE_NAME = "auth_token"

// Environment valiation
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set")
}
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json()
    const { email, password } = requestBody

    if (!email || !password) {
      throw new UserValidationError("Email and password are required")
    }

    const user = await validateUser(email, password)
    if (!user) {
      throw new UserValidationError("Invalid email or password")
    }

    const token = await createJwtToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    })

    setAuthCookie(token)

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })

  } catch (error) {
    console.error("Login error:", error)
    
    if (error instanceof UserValidationError) {
      return NextResponse.json(
        { error: error.message }, 
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "An unexpected error occurred during authentication" },
      { status: 500 }
    )
  }
}

async function createJwtToken(payload: object): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET)
}

function setAuthCookie(token: string): void {
  const isProduction = process.env.NODE_ENV === "production"
  
  cookies().set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    path: "/",
    secure: isProduction,
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  })
}