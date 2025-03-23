"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ArrowRight } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals and small teams just getting started.",
    features: ["Up to 5 team members", "5GB storage", "Basic analytics", "24/7 support"],
    prices: {
      monthly: "$29",
      quarterly: "$79",
      annual: "$290",
    },
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing teams that need more features and flexibility.",
    features: [
      "Up to 20 team members",
      "50GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    prices: {
      monthly: "$79",
      quarterly: "$199",
      annual: "$790",
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with advanced needs and dedicated support.",
    features: [
      "Unlimited team members",
      "500GB storage",
      "Enterprise analytics",
      "Dedicated support",
      "Custom integrations",
      "Advanced security",
    ],
    prices: {
      monthly: "$149",
      quarterly: "$399",
      annual: "$1,490",
    },
  },
]

// Mock payment gateway URLs - in a real app, these would be generated server-side
const paymentGateways = {
  stripe: {
    name: "Stripe",
    logo: "/placeholder.svg?height=30&width=60",
    redirectUrl: "https://checkout.stripe.com/c/pay/mock_checkout",
  },
  solidgate: {
    name: "Solidgate",
    logo: "/placeholder.svg?height=30&width=60",
    redirectUrl: "https://checkout.solidgate.com/payment/mock_checkout",
  },
}

export function SubscriptionForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<"plan" | "payment">("plan")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "annual">("monthly")
  const [selectedPlan, setSelectedPlan] = useState<string>("professional")
  const [selectedGateway, setSelectedGateway] = useState<"stripe" | "solidgate">("stripe")

  function handlePlanContinue() {
    setCurrentStep("payment")
  }

  async function handlePaymentRedirect() {
    setIsLoading(true)

    // Simulate a brief loading state before redirect
    await new Promise((resolve) => setTimeout(resolve, 800))

    const plan = plans.find((p) => p.id === selectedPlan)

    // Show toast before redirecting
    toast({
      title: "Redirecting to payment",
      description: `You'll be redirected to ${paymentGateways[selectedGateway].name} to complete your ${plan?.name} plan purchase.`,
    })

    // In a real app, you would generate a checkout session server-side
    // and redirect to the actual checkout URL with proper parameters

    // Simulate redirect by showing loading state for a moment
    setTimeout(() => {
      setIsLoading(false)
      // For demo purposes, redirect to dashboard instead of actual payment gateway
      router.push("/dashboard")

      // In a real app, you would redirect to the payment gateway:
      // window.location.href = paymentGateways[selectedGateway].redirectUrl
    }, 1500)
  }

  const activePlan = plans.find((plan) => plan.id === selectedPlan)

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Progress Steps */}
      <div className="relative mb-6 md:mb-8">
        <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted"></div>
        <ol className="relative z-10 flex justify-between">
          <li className="flex items-center justify-center">
            <div
              className={`flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full border-2 text-xs font-semibold ${
                currentStep === "plan"
                  ? "border-primary bg-primary text-primary-foreground"
                  : currentStep === "payment"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground bg-background text-muted-foreground"
              }`}
            >
              1
            </div>
            <span className="absolute mt-8 text-xs md:mt-10 md:text-sm font-medium">Plan</span>
          </li>
          <li className="flex items-center justify-center">
            <div
              className={`flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full border-2 text-xs font-semibold ${
                currentStep === "payment"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground bg-background text-muted-foreground"
              }`}
            >
              2
            </div>
            <span className="absolute mt-8 text-xs md:mt-10 md:text-sm font-medium">Payment</span>
          </li>
        </ol>
      </div>

      {/* Plan Selection Step */}
      {currentStep === "plan" && (
        <div className="space-y-4 md:space-y-6">
          <div>
            <h2 className="text-lg font-semibold md:text-xl">1. Choose your plan</h2>
            <p className="text-xs text-muted-foreground md:text-sm">Select the plan that works best for you.</p>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="inline-flex rounded-md border p-1">
              <button
                type="button"
                className={`flex-1 rounded-sm px-2 py-1.5 text-xs md:px-3 md:py-2 md:text-sm font-medium ${
                  billingCycle === "monthly" ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`flex-1 rounded-sm px-2 py-1.5 text-xs md:px-3 md:py-2 md:text-sm font-medium ${
                  billingCycle === "quarterly" ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => setBillingCycle("quarterly")}
              >
                Quarterly
              </button>
              <button
                type="button"
                className={`flex-1 rounded-sm px-2 py-1.5 text-xs md:px-3 md:py-2 md:text-sm font-medium ${
                  billingCycle === "annual" ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => setBillingCycle("annual")}
              >
                Annual
              </button>
            </div>

            <div className="space-y-3 md:space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`flex flex-col space-y-2 md:space-y-3 rounded-md border p-3 md:p-4 hover:bg-muted cursor-pointer ${
                    selectedPlan === plan.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="flex justify-between">
                    <span className="text-sm font-medium md:text-base">{plan.name}</span>
                    <span className="text-sm font-medium md:text-base">{plan.prices[billingCycle]}</span>
                  </div>
                  <span className="text-xs text-muted-foreground md:text-sm">{plan.description}</span>
                  <ul className="space-y-1 text-xs text-muted-foreground md:text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handlePlanContinue} className="w-full md:w-auto">
              Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Payment Gateway Selection Step */}
      {currentStep === "payment" && (
        <div className="space-y-4 md:space-y-6">
          <div>
            <h2 className="text-lg font-semibold md:text-xl">2. Select payment method</h2>
            <p className="text-xs text-muted-foreground md:text-sm">
              Choose your preferred payment gateway to complete your purchase.
            </p>
          </div>

          <Card>
            <CardContent className="p-4 space-y-4 md:p-6 md:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <div className="text-sm font-medium md:text-base">Payment Gateway</div>
                <RadioGroup
                  defaultValue={selectedGateway}
                  onValueChange={(value) => setSelectedGateway(value as "stripe" | "solidgate")}
                  className="space-y-2 md:space-y-3"
                >
                  {Object.entries(paymentGateways).map(([key, gateway]) => (
                    <div key={key} className="flex items-center space-x-2 rounded-md border p-3 md:p-4">
                      <RadioGroupItem value={key} id={key} />
                      <Label htmlFor={key} className="flex flex-1 items-center gap-2 md:gap-3 cursor-pointer">
                        <Image
                          src={gateway.logo || "/placeholder.svg"}
                          alt={gateway.name}
                          width={60}
                          height={30}
                          className="h-5 md:h-7 object-contain"
                        />
                        <span className="text-sm md:text-base">{gateway.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="rounded-md border p-3 md:p-4 bg-muted/20">
                <div className="text-xs font-medium mb-2 md:text-sm md:mb-3">Order Summary</div>
                <div className="flex justify-between mb-1 md:mb-2">
                  <span className="text-xs md:text-sm">Plan</span>
                  <span className="text-xs font-medium md:text-sm">{activePlan?.name}</span>
                </div>
                <div className="flex justify-between mb-1 md:mb-2">
                  <span className="text-xs md:text-sm">Billing cycle</span>
                  <span className="text-xs font-medium capitalize md:text-sm">{billingCycle}</span>
                </div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-sm font-medium">{activePlan?.prices[billingCycle]}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-between md:gap-0 pt-2">
            <Button type="button" variant="outline" onClick={() => setCurrentStep("plan")} className="w-full md:w-auto">
              Back
            </Button>
            <Button onClick={handlePaymentRedirect} disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <>Processing...</>
              ) : (
                <>
                  Proceed to {paymentGateways[selectedGateway].name} <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

