"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, CreditCard } from "lucide-react"
import Link from "next/link"

export function ChangePlanButton() {
  return (
    <Button 
      variant="outline" 
      className="flex items-center gap-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300"
      asChild
    >
      <Link href="/dashboard/subscription">
        <RefreshCw className="h-4 w-4" />
        Change Plan
      </Link>
    </Button>
  )
}

export function AddPaymentMethodButton() {
  return (
    <Button 
      variant="outline" 
      className="flex items-center gap-2 border-purple-300 hover:bg-purple-100 hover:border-purple-400"
      asChild
    >
      <Link href="/dashboard/subscription">
        <CreditCard className="h-4 w-4" />
        Add Payment Method
      </Link>
    </Button>
  )
}

export function UpgradePlanButton() {
  return (
    <Button 
      className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all"
      asChild
    >
      <Link href="/dashboard/subscription">
        Upgrade Plan
      </Link>
    </Button>
  )
}

export function ChangePlanButtonSmall() {
  return (
    <Button 
      className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
      asChild
    >
      <Link href="/dashboard/subscription">
        Change Plan
      </Link>
    </Button>
  )
}

