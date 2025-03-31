"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createUser, validateUser } from "@/lib/models/user"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!name || !email || !password || !confirmPassword) {
    return { error: "All fields are required" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters" }
  }

  try {
    await createUser({ name, email, password })

    const loginFormData = new FormData()
    loginFormData.append("email", email)
    loginFormData.append("password", password)

    return await loginUser(loginFormData)

  } catch (error: any) {
    console.error("Registration error:", error)

    if (error.message === "User with this email already exists") {
      return { error: "User with this email already exists" }
    }

    return { error: "Failed to register user" }
  }
}


export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const user = await validateUser(email, password)

    if (!user) {
      return { error: "Invalid email or password" }
    }

    const token = await new SignJWT({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(JWT_SECRET)

    const cookieStore = await cookies()
    await cookieStore.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true, redirectUrl: "/dashboard" }

  } catch (error) {
    console.error("Login error:", error)
    return { error: "Failed to authenticate user" }
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  await cookieStore.delete("auth_token")
  return { success: true, redirectUrl: "/" }
}

export async function getCurrentUser() {
  const token = cookies().get("auth_token")?.value

  if (!token) {
    return null
  }

  try {
    const decoded = verify(token, JWT_SECRET) as {
      id: string
      email: string
      name: string
    }

    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    }
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}
