import { type NextRequest, NextResponse } from "next/server"
import { createUser } from "@/lib/models/user"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    await createUser({ name, email, password })

    return NextResponse.json({ success: true, message: "User registered successfully" }, { status: 201 })
  } catch (error: any) {
    console.error("Registration error:", error)

    if (error.message === "User with this email already exists") {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}
