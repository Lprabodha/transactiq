import type { Metadata } from "next"
import { SubscriptionForm } from "@/app/subscription/subscription-form"

export const metadata: Metadata = {
  title: "Choose Your Subscription | TransactIQ",
  description: "Select the subscription plan that works best for you and your team.",
}

export default function SubscriptionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container px-4 py-6 md:max-w-4xl md:py-10">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">Choose your subscription plan</h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Select the plan that works best for you and your team.
          </p>
        </div>
        <SubscriptionForm />
      </div>
    </div>
  )
}

