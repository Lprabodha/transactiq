import Link from "next/link"
import Image from "next/image"

import { LoginForm } from "@/app/login/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-xl transition-shadow">
                TIQ
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                TransactIQ
              </span>
            </Link>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100/50 p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>

            <LoginForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-semibold text-primary hover:text-purple-700 transition-colors">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

