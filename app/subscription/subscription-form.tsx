"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, ArrowRight, Shield, Star, Calendar, CreditCard, Sparkles, Clock, X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { createCheckoutSession, getOrCreateStripeCustomer } from "./actions"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const PLANS = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$49.95",
    cycle: "mo",
    description: "Invoiced every month",
    features: ["All basic features", "Flexible monthly billing", "Cancel anytime"],
    icon: Calendar,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "annual",
    name: "Annually",
    price: "$19.95",
    cycle: "mo",
    description: "Invoiced every year",
    features: ["All premium features", "60% savings", "Billed annually"],
    savings: "60%",
    icon: Star,
    color: "from-purple-600 to-indigo-600",
    recommended: true,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: "$29.95",
    cycle: "mo",
    description: "Invoiced each quarter",
    features: ["All premium features", "Balance of flexibility & savings", "Billed quarterly"],
    icon: Clock,
    color: "from-indigo-500 to-indigo-600",
  },
] as const

const PAYMENT_GATEWAYS = {
  stripe: {
    name: "Stripe",
    logo: "/stripe.png",
    features: ["Fast processing", "Global coverage", "Strong security"],
    color: "border-purple-200 hover:border-purple-400",
    bgColor: "bg-purple-50",
  },
  paypal: {
    name: "PayPal",
    logo: "/paypal.webp",
    features: ["Trusted brand", "Buyer protection", "Easy integration"],
    color: "border-blue-200 hover:border-blue-400",
    bgColor: "bg-blue-50",
  },
  solidgate: {
    name: "Solidgate",
    logo: "/solidgate.jpeg",
    features: ["High approval rates", "Advanced fraud tools", "Multiple currencies"],
    color: "border-indigo-200 hover:border-indigo-400",
    bgColor: "bg-indigo-50",
  },
} as const

type PlanId = (typeof PLANS)[number]["id"]
type GatewayId = keyof typeof PAYMENT_GATEWAYS

export function SubscriptionForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<"plan" | "payment">("plan")
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("annual")
  const [selectedGateway, setSelectedGateway] = useState<GatewayId>("stripe")
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null)
  const [showPromoCode, setShowPromoCode] = useState(false)
  const [promoCode, setPromoCode] = useState("")

  // Initialize Stripe customer on mount
  useEffect(() => {
    const initializeStripeCustomer = async () => {
      try {
        const { customerId, error } = await getOrCreateStripeCustomer()
        if (error) throw new Error(error)
        if (customerId) {
          setStripeCustomerId(customerId)
          toast({
            title: "Payment processor initialized",
            description: "Your account is ready for subscription setup",
          })
        }
      } catch (error) {
        console.error("Failed to initialize Stripe customer:", error)
        toast({
          title: "Error",
          description: "Failed to initialize payment processor",
          variant: "destructive",
        })
      }
    }

    initializeStripeCustomer()
  }, [toast])

  const handlePlanContinue = () => setCurrentStep("payment")

  const handlePaymentRedirect = async () => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("plan", selectedPlan)
      formData.append("billingCycle", selectedPlan)
      formData.append("gateway", selectedGateway)
      if (promoCode) formData.append("promoCode", promoCode)

      const result = await createCheckoutSession(formData)

      if (result?.error) {
        throw new Error(result.error)
      }

      if (result?.url) {
        window.location.href = result.url
        return
      }

      toast({
        title: "Redirecting to payment",
        description: `You'll be redirected to ${PAYMENT_GATEWAYS[selectedGateway].name} to complete your payment.`,
      })
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment failed",
        description: error instanceof Error ? error.message : "Could not process payment",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const activePlan = PLANS.find((plan) => plan.id === selectedPlan)
  const activeGateway = PAYMENT_GATEWAYS[selectedGateway]

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Progress Steps */}
      <div className="relative mb-6 md:mb-8">
        <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 ease-in-out ${
              currentStep === "plan" ? "w-1/4" : "w-3/4"
            }`}
          />
        </div>
        <ol className="relative z-10 flex justify-between">
          <li className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all duration-300 ${
                currentStep === "plan"
                  ? "border-purple-500 bg-gradient-to-r from-purple-600 to-blue-500 text-white scale-110"
                  : "border-purple-500 bg-gradient-to-r from-purple-600 to-blue-500 text-white"
              }`}
            >
              1
            </div>
            <span className="mt-2 text-xs md:text-sm font-medium">Choose Plan</span>
          </li>
          <li className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all duration-300 ${
                currentStep === "payment"
                  ? "border-blue-500 bg-gradient-to-r from-blue-600 to-indigo-500 text-white scale-110"
                  : "border-muted bg-background text-muted-foreground"
              }`}
            >
              2
            </div>
            <span className="mt-2 text-xs md:text-sm font-medium">Payment</span>
          </li>
        </ol>
      </div>

      {/* Plan Selection Step */}
      {currentStep === "plan" && (
        <div className="space-y-6 md:space-y-8">
          <div>
            <h2 className="text-xl font-semibold md:text-2xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Choose your subscription plan
            </h2>
            <p className="text-sm text-muted-foreground md:text-base mt-1">
              Select the plan that works best for you. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {PLANS.map((plan) => {
              const PlanIcon = plan.icon
              return (
                <Card
                  key={plan.id}
                  className={`relative border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedPlan === plan.id
                      ? "border-primary shadow-md ring-2 ring-primary/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-0 right-0 flex justify-center">
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-500 px-3 py-1 text-white">
                        <Sparkles className="h-3.5 w-3.5 mr-1" />
                        Recommended
                      </Badge>
                    </div>
                  )}
                  <CardContent className={`p-6 ${plan.recommended ? "pt-8" : "pt-6"}`}>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r ${plan.color} text-white`}
                          >
                            <PlanIcon className="h-4 w-4" />
                          </div>
                          <h3 className="text-lg font-semibold">{plan.name}</h3>
                        </div>
                        {plan.savings && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Save {plan.savings}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-end gap-1">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-sm text-muted-foreground">/{plan.cycle}</span>
                      </div>

                      <p className="text-sm text-muted-foreground">{plan.description}</p>

                      <ul className="space-y-2 pt-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      variant={selectedPlan === plan.id ? "default" : "outline"}
                      className={`w-full ${selectedPlan === plan.id ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600" : ""}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
            <div className="text-sm text-muted-foreground">
              All plans include a 14-day free trial. No credit card required to start.
            </div>
            <Button
              onClick={handlePlanContinue}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            >
              Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Payment Gateway Selection Step */}
      {currentStep === "payment" && (
        <div className="space-y-6 md:space-y-8">
          <div>
            <h2 className="text-xl font-semibold md:text-2xl bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Select payment method
            </h2>
            <p className="text-sm text-muted-foreground md:text-base mt-1">
              Choose your preferred payment gateway to complete your purchase.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {(Object.entries(PAYMENT_GATEWAYS) as [GatewayId, (typeof PAYMENT_GATEWAYS)[GatewayId]][]).map(
              ([key, gateway]) => (
                <Card
                  key={key}
                  className={`border-2 cursor-pointer transition-all ${
                    selectedGateway === key ? "border-primary shadow-md ring-2 ring-primary/20" : gateway.color
                  }`}
                  onClick={() => setSelectedGateway(key)}
                >
                  <CardContent className={`p-6 ${gateway.bgColor} rounded-t-lg`}>
                    <div className="flex justify-center h-16 items-center">
                      <Image
                        src={gateway.logo || "/placeholder.svg"}
                        alt={gateway.name}
                        width={120}
                        height={40}
                        className="h-10 object-contain"
                        onError={(e) => {
                          // Fallback to SVG if PNG fails to load
                          const target = e.target as HTMLImageElement
                          if (target.src.endsWith(".png")) {
                            target.src = gateway.logo.replace(".png", ".svg")
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                  <CardContent className="p-6 pt-4">
                    <div className="flex flex-col space-y-4">
                      <RadioGroup value={selectedGateway} className="flex items-center justify-between">
                        <h3 className="font-medium">{gateway.name}</h3>
                        <RadioGroupItem
                          value={key}
                          id={key}
                          checked={selectedGateway === key}
                          className={selectedGateway === key ? "text-primary border-primary" : ""}
                        />
                      </RadioGroup>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {gateway.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>

          <Card className="border-2 border-indigo-100 overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Secure Checkout</h3>
                  <p className="text-sm text-muted-foreground">
                    All payments are protected by our advanced fraud detection system
                  </p>
                </div>
              </div>

              <div className="rounded-lg border p-4 bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="text-sm font-medium mb-3">Order Summary</div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Plan</span>
                    <span className="text-sm font-medium">{activePlan?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Billing</span>
                    <span className="text-sm font-medium">{activePlan?.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Payment method</span>
                    <span className="text-sm font-medium">{activeGateway.name}</span>
                  </div>
                </div>

                {showPromoCode ? (
                  <div className="flex gap-2 mb-4">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                      {promoCode && (
                        <button
                          onClick={() => setPromoCode("")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0">
                      Apply
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm text-muted-foreground hover:text-primary mb-4"
                    onClick={() => setShowPromoCode(true)}
                  >
                    Have a promo code?
                  </Button>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total</span>
                    <div className="text-right">
                      <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        {activePlan?.price}/{activePlan?.cycle}
                      </div>
                      <div className="text-xs text-muted-foreground">First 14 days free</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>Your payment information is securely processed by {activeGateway.name}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-between md:gap-4 pt-2">
            <Button type="button" variant="outline" onClick={() => setCurrentStep("plan")} className="w-full md:w-auto">
              Back to Plans
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-full md:w-auto">
                    <Button
                      onClick={handlePaymentRedirect}
                      disabled={isLoading || !stripeCustomerId}
                      className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600"
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Complete Purchase <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </TooltipTrigger>
                {!stripeCustomerId && (
                  <TooltipContent>
                    <p>Initializing payment processor...</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}
    </div>
  )
}

