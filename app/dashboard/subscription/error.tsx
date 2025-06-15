"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex max-w-md flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-muted-foreground">We encountered an error while processing your subscription request.</p>
        <div className="flex gap-4">
          <Button onClick={() => reset()} variant="outline">
            Try again
          </Button>
          <Button onClick={() => router.push("/")}>Return to home</Button>
        </div>
      </div>
    </div>
  )
}

