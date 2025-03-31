"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ArrowRight, Shield } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals and small teams just getting started.",
    features: ["Up to 5 team members", "5GB storage", "Basic fraud detection", "24/7 support"],
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
      "Advanced fraud detection",
      "Chargeback prediction",
      "Smart payment routing",
      "Priority support",
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
      "Enterprise fraud detection",
      "Chargeback prediction",
      "Smart payment routing",
      "Revenue forecasting",
      "Dedicated support",
      "Custom integrations",
    ],
    prices: {
      monthly: "$149",
      quarterly: "$399",
      annual: "$1,490",
    },
  },
]

// Payment gateway options with features
const paymentGateways = {
  stripe: {
    name: "Stripe",
    logo: "/placeholder.svg?height=30&width=60",
    redirectUrl: "https://checkout.stripe.com/c/pay/mock_checkout",
    features: ["Fast processing", "Global coverage", "Strong security"],
    color: "border-purple-200 hover:border-purple-400",
  },
  paypal: {
    name: "PayPal",
    logo: "/placeholder.svg?height=30&width=60",
    redirectUrl: "https://www.paypal.com/checkout/mock",
    features: ["Trusted brand", "Buyer protection", "Easy integration"],
    color: "border-blue-200 hover:border-blue-400",
  },
  solidgate: {
    name: "Solidgate",
    logo: "/placeholder.svg?height=30&width=60",
    redirectUrl: "https://checkout.solidgate.com/payment/mock_checkout",
    features: ["High approval rates", "Advanced fraud tools", "Multiple currencies"],
    color: "border-indigo-200 hover:border-indigo-400",
  },
}

export function SubscriptionForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<"plan" | "payment">("plan")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "annual">("monthly")
  const [selectedPlan, setSelectedPlan] = useState<string>("professional")
  const [selectedGateway, setSelectedGateway] = useState<"stripe" | "paypal" | "solidgate">("stripe")

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
        <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-200"></div>
        <ol className="relative z-10 flex justify-between">
          <li className="flex items-center justify-center">
            <div
              className={`flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full border-2 text-xs font-semibold ${
                currentStep === "plan"
                  ? "border-purple-500 bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                  : currentStep === "payment"
                    ? "border-purple-500 bg-gradient-to-r from-purple-600 to-blue-500 text-white"
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
                  ? "border-blue-500 bg-gradient-to-r from-blue-600 to-indigo-500 text-white"
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
            <h2 className="text-lg font-semibold md:text-xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              1. Choose your plan
            </h2>
            <p className="text-xs text-muted-foreground md:text-sm">Select the plan that works best for you.</p>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="inline-flex rounded-md border p-1 bg-gradient-to-r from-purple-50 to-blue-50">
              <button
                type="button"
                className={`flex-1 rounded-sm px-2 py-1.5 text-xs md:px-3 md:py-2 md:text-sm font-medium ${
                  billingCycle === "monthly" ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white" : ""
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`flex-1 rounded-sm px-2 py-1.5 text-xs md:px-3 md:py-2 md:text-sm font-medium ${
                  billingCycle === "quarterly" ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white" : ""
                }`}
                onClick={() => setBillingCycle("quarterly")}
              >
                Quarterly
              </button>
              <button
                type="button"
                className={`flex-1 rounded-sm px-2 py-1.5 text-xs md:px-3 md:py-2 md:text-sm font-medium ${
                  billingCycle === "annual" ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white" : ""
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
                  className={`flex flex-col space-y-2 md:space-y-3 rounded-md border-2 p-3 md:p-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 cursor-pointer transition-all ${
                    selectedPlan === plan.id ? "border-purple-500 shadow-md" : "border-gray-200 border-gray-800"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="flex justify-between">
                    <span
                      className={`text-sm font-medium md:text-base ${
                        selectedPlan === plan.id
                          ? "bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
                          : ""
                      }`}
                    >
                      {plan.name}
                    </span>
                    <span className="text-sm font-medium md:text-base">{plan.prices[billingCycle]}</span>
                  </div>
                  <span className="text-xs text-muted-foreground md:text-sm">{plan.description}</span>
                  <ul className="space-y-1 text-xs text-muted-foreground md:text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={handlePlanContinue}
              className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            >
              Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Payment Gateway Selection Step */}
      {currentStep === "payment" && (
        <div className="space-y-4 md:space-y-6">
          <div>
            <h2 className="text-lg font-semibold md:text-xl bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              2. Select payment method
            </h2>
            <p className="text-xs text-muted-foreground md:text-sm">
              Choose your preferred payment gateway to complete your purchase.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {Object.entries(paymentGateways).map(([key, gateway]) => (
              <Card
                key={key}
                className={`border-2 cursor-pointer transition-all ${
                  selectedGateway === key ? "border-blue-500 shadow-md" : gateway.color
                }`}
                onClick={() => setSelectedGateway(key as "stripe" | "paypal" | "solidgate")}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center justify-center h-12 w-full">
                      <Image
                        src={gateway.logo || "/placeholder.svg"}
                        alt={gateway.name}
                        width={60}
                        height={30}
                        className="h-8 object-contain"
                      />
                    </div>
                    <h3 className="font-medium text-center">{gateway.name}</h3>
                    <RadioGroup value={selectedGateway} className="hidden">
                      <RadioGroupItem value={key} id={key} checked={selectedGateway === key} />
                    </RadioGroup>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {gateway.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 border-indigo-100">
            <CardContent className="p-4 space-y-4 md:p-6 md:space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Fraud Protection Included</h3>
                  <p className="text-xs text-muted-foreground">
                    All payments are protected by our advanced fraud detection system
                  </p>
                </div>
              </div>

              <div className="rounded-md border p-3 md:p-4 bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="text-xs font-medium mb-2 md:text-sm md:mb-3">Order Summary</div>
                <div className="flex justify-between mb-1 md:mb-2">
                  <span className="text-xs md:text-sm">Plan</span>
                  <span className="text-xs font-medium md:text-sm">{activePlan?.name}</span>
                </div>
                <div className="flex justify-between mb-1 md:mb-2">
                  <span className="text-xs md:text-sm">Billing cycle</span>
                  <span className="text-xs font-medium capitalize md:text-sm">{billingCycle}</span>
                </div>
                <div className="flex justify-between mb-1 md:mb-2">
                  <span className="text-xs md:text-sm">Payment method</span>
                  <span className="text-xs font-medium md:text-sm">{paymentGateways[selectedGateway].name}</span>
                </div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    {activePlan?.prices[billingCycle]}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-between md:gap-0 pt-2">
            <Button type="button" variant="outline" onClick={() => setCurrentStep("plan")} className="w-full md:w-auto">
              Back
            </Button>
            <Button
              onClick={handlePaymentRedirect}
              disabled={isLoading}
              className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600"
            >
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

