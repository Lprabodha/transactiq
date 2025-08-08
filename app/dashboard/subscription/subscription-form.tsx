"use client"

import { useState, useEffect } from "react"
import { Check, ArrowRight, Shield, Star, Calendar, CreditCard, Sparkles, Clock, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { createCheckoutSession, getOrCreateStripeCustomer, updateSolidgateUser } from "./actions"
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
    recommended: false,
    savings: undefined,
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
    recommended: false,
    savings: undefined,
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
type Order = {
  currency: string
  order_id: string
  subscription_id: string
  status: string
}
type PaymentFormEventCallback = {
  data: {
    order: Order
  }
}

declare global {
  interface Window {
    PaymentFormSdk?: {
      init: (config: {
        merchantData: {
          merchant: string
          signature: string
          paymentIntent: string
        }
        iframeParams: { containerId: string }
        formParams: {
          buttonType: string
          submitButtonText: string
          isCardHolderVisible: boolean
          hideCvvNumbers: boolean
          headerText: string
          titleText: string
          formTypeClass: string
        }
        styles: {
          submit_button: {
            "background-color": string
            color: string
            ":hover": { "background-color": string }
          }
          form_body: { "font-family": string }
        }
      }) => {
        on: (event: string, callback: (data: PaymentFormEventCallback) => void) => void
      }
    }
  }
}

function initializePaymentForm(merchant: string, signature: string, paymentIntent: string, planId: string) {
  if (!window?.PaymentFormSdk) return console.error("Solidgate SDK not loaded")

  const form = window.PaymentFormSdk.init({
    merchantData: { merchant, signature, paymentIntent },
    iframeParams: { containerId: "solid-payment-form-container" },
    formParams: {
      buttonType: "default",
      submitButtonText: "Pay Now",
      isCardHolderVisible: true,
      hideCvvNumbers: false,
      headerText: "Enter your card details",
      titleText: "Secure Checkout",
      formTypeClass: "default",
    },
    styles: {
      submit_button: {
        "background-color": "#4f46e5",
        color: "#fff",
        ":hover": { "background-color": "#4338ca" },
      },
      form_body: {
        "font-family": "DM Sans",
      },
    },
  })

  form.on("success", ({ data: { order } }: PaymentFormEventCallback) => {
    const { currency, order_id, subscription_id } = order
    const params = new URLSearchParams({
      currency,
      payment_id: order_id,
      status: "approved",
      subscription_id,
      plan_id: planId,
    })

    updateSolidgateUser(planId)
    

    window.location.replace(`/dashboard/billing?${params.toString()}`)
  })

  form.on("fail", ({ data: { order } }: PaymentFormEventCallback) => {
    alert(order.status === "declined" ? "Payment declined" : "Payment failed")
  })

  form.on("error", ({ data }: PaymentFormEventCallback) => console.error("Solidgate error:", data))

  form.on("mounted", () => console.log("Solidgate form mounted"))
}

export function SubscriptionForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<"plan" | "payment">("plan")
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("annual")
  const [selectedGateway, setSelectedGateway] = useState<GatewayId>("stripe")
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null)
  const [showPromoCode, setShowPromoCode] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [isFormLoading, setIsFormLoading] = useState(false)

  useEffect(() => {
    if (!document.getElementById("solidgate-sdk")) {
      const script = document.createElement("script")
      script.src = "https://cdn.solidgate.com/js/solid-form.js"
      script.async = true
      script.id = "solidgate-sdk"
      document.body.appendChild(script)
    }
  }, [])

  useEffect(() => {
    const fetchCustomer = async () => {
      const { customerId, error } = await getOrCreateStripeCustomer()
      if (error) {
        toast({
          title: "Error",
          description: "Failed to initialize payment processor",
          variant: "destructive",
        })
        return
      }
      setStripeCustomerId(customerId)
    }
    fetchCustomer()
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

      if ("error" in result && result.error) throw new Error(String(result.error))

      if (result.gateway === "solidgate" && result.merchantData) {
        const { merchant, signature, paymentIntent } = result.merchantData as {
          merchant: string
          signature: string
          paymentIntent: string
        }
        setShowPaymentForm(true)
        setIsFormLoading(true)
        setTimeout(() => {
          initializePaymentForm(merchant, signature, paymentIntent, selectedPlan)
          setIsFormLoading(false)
        }, 300)
        return
      }

      if (result?.url) {
        window.location.href = result.url
        return
      }

      toast({ title: "Redirecting to payment", description: "Please wait..." })
    } catch (err) {
      console.error(err)
      toast({
        title: "Payment failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const activePlan = PLANS.find((p) => p.id === selectedPlan)
  const activeGateway = PAYMENT_GATEWAYS[selectedGateway]

  return (
    <div className="space-y-6 md:space-y-8">

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
                      className={`w-full ${
                        selectedPlan === plan.id
                          ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                          : ""
                      }`}
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

          {!showPaymentForm && (
            <div className="grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
              {(Object.entries(PAYMENT_GATEWAYS) as [GatewayId, (typeof PAYMENT_GATEWAYS)[GatewayId]][]).map(
                ([key, gateway]) => (
                <Card
                    key={key}
                    className={`border-2 cursor-pointer transition-all hover:shadow-lg ${
                      selectedGateway === key
                        ? "border-primary shadow-md ring-2 ring-primary/20 bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
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
          )}

          {!showPaymentForm && (
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
          )}

          {selectedGateway === "solidgate" && isFormLoading && (
            <div className="mt-6 border rounded-lg p-6 bg-white shadow-sm flex items-center justify-center h-[300px]">
              <div className="flex flex-col items-center gap-2">
                <svg
                  className="animate-spin h-8 w-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Loading payment form...</span>
              </div>
            </div>
          )}

          {selectedGateway === "solidgate" && showPaymentForm && !isFormLoading && (
            <div className="mt-6 border rounded-lg p-6 bg-white shadow-sm">
              {/* Header: Solidgate logo and caption */}
              <div className="flex items-center gap-3 mb-4">
                <Image src="/solidgate.jpeg" alt="Solidgate" width={120} height={40} className="h-8 object-contain" />
                <span className="text-sm text-muted-foreground">Secure payment processing</span>
              </div>

              {/* Solidgate Payment Form Mount Point */}
              <div
                id="solid-payment-form-container"
                className="min-h-[300px] w-full bg-gray-50 border border-dashed border-gray-300 rounded-md p-4  flex items-center justify-center"
                aria-label="Secure payment form"
              />

              {/* Security info */}
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Your payment details are encrypted and processed securely.</span>
              </div>
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-between md:gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setCurrentStep("plan")
                setShowPaymentForm(false)
              }}
              className="w-full md:w-auto"
            >
              Back to Plans
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-full md:w-auto">
                    <Button
                      onClick={handlePaymentRedirect}
                      disabled={isLoading || !stripeCustomerId || (selectedGateway === "solidgate" && showPaymentForm)}
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
                          {selectedGateway === "solidgate" && showPaymentForm ? "Processing..." : "Complete Purchase"}{" "}
                          <ArrowRight className="ml-2 h-4 w-4" />
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
