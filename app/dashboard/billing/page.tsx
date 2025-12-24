import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/app/dashboard/dashboard-header"
import { DashboardShell } from "@/app/dashboard/dashboard-shell"
import { getCurrentUser } from "@/app/actions/auth"
import { getUserById } from "@/lib/models/user"
import { format } from "date-fns"
import {
  CreditCard,
  Calendar,
  CheckCircle2,
  Download,
  Clock,
  ArrowUpRight,
  Shield,
  BadgeCheck,
} from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { createStripePortal } from "@/app/actions/stripe"
import { ChangePlanButton, AddPaymentMethodButton, UpgradePlanButton, ChangePlanButtonSmall } from "./billing-actions"

// Helper function to get plan name by ID
function getPlanName(planId: number): string {
  switch (planId) {
    case 1:
      return "Monthly Plan"
    case 2:
      return "Quarterly Plan"
    case 3:
      return "Annual Plan"
    default:
      return "Free Plan"
  }
}

function getPlanPrice(planId: number): string {
  switch (planId) {
    case 1:
      return "$49.95/month"
    case 2:
      return "$29.95/month (billed quarterly)"
    case 3:
      return "$19.95/month (billed annually)"
    default:
      return "Free"
  }
}

function getPlanFeatures(planId: number): string[] {
  const baseFeatures = ["Core platform access", "Customer support"]

  switch (planId) {
    case 1:
      return [...baseFeatures, "Up to 5 team members", "5GB storage", "Basic fraud detection"]
    case 2:
      return [
        ...baseFeatures,
        "Up to 20 team members",
        "50GB storage",
        "Advanced fraud detection",
        "Chargeback prediction",
      ]
    case 3:
      return [
        ...baseFeatures,
        "Unlimited team members",
        "500GB storage",
        "Enterprise fraud detection",
        "Chargeback prediction",
        "Smart payment routing",
        "Revenue forecasting",
      ]
    default:
      return baseFeatures
  }
}

function getCardIcon(cardNumber: string): string {
  const firstDigit = cardNumber.charAt(0)
  switch (firstDigit) {
    case "4":
      return "/images/visa-logo.svg"
    case "5":
      return "/images/mastercard-logo.svg"
    case "3":
      return "/images/amex-logo.svg"
    default:
      return "/images/generic-card.svg"
  }
}

export default async function BillingPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/login")
  }

  const userData = await getUserById(currentUser.id)
  if (!userData?.plan_id || userData.plan_id === 0) {
    redirect("/dashboard/subscription")
  }

  const expirationDate = userData.plan_expire_date
    ? format(new Date(userData.plan_expire_date), "MMMM d, yyyy")
    : "Not available"

  const today = new Date()
  const expDate = userData.plan_expire_date ? new Date(userData.plan_expire_date) : null
  const daysRemaining = expDate ? Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : 0
  const totalDays = 30 
  const progressPercentage = expDate ? Math.max(0, Math.min(100, (daysRemaining / totalDays) * 100)) : 0

  return (
    <DashboardShell>
      <DashboardHeader heading="Billing" text="Manage your subscription and billing information." />

      {/* Subscription Summary Card */}
      <Card className="mb-6 border-2 border-purple-200/50 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-md">
                  <BadgeCheck className="h-5 w-5 text-white" />
                </div>
                {getPlanName(userData.plan_id)}
              </h3>
              <p className="text-muted-foreground font-medium">{getPlanPrice(userData.plan_id)}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <ChangePlanButton />
              <form action={async () => {
                "use server"
                const portalUrl = await createStripePortal()
                if (portalUrl) {
                  redirect(portalUrl)
                }
              }}>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Manage Billing
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="subscription" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full md:w-auto bg-muted/60 p-1">
          <TabsTrigger 
            value="subscription" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
          >
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Subscription</span>
          </TabsTrigger>
          <TabsTrigger 
            value="payment-method" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
          >
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
          <TabsTrigger 
            value="billing-history" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
          >
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-2 border-purple-100/50 hover:shadow-lg transition-all bg-gradient-to-br from-white to-purple-50/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  Subscription Details
                </CardTitle>
                <CardDescription>Your current plan and billing information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border-2 border-purple-200/50 p-4 bg-gradient-to-br from-purple-50/50 to-blue-50/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg">{getPlanName(userData.plan_id)}</p>
                      <p className="text-sm text-muted-foreground font-medium">{getPlanPrice(userData.plan_id)}</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-sm">
                      Active
                    </Badge>
                  </div>

                  {userData.plan_expire_date && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Billing period</span>
                        <span className="font-semibold text-purple-600">{daysRemaining} days remaining</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2.5 bg-purple-100" />
                      <p className="text-xs text-muted-foreground mt-2">Renews on {expirationDate}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3 text-purple-600">Plan Features</h4>
                  <ul className="space-y-2.5">
                    {getPlanFeatures(userData.plan_id).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 border-t pt-6">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-red-200 hover:bg-red-50 hover:border-red-300 text-red-600"
                >
                  Cancel Subscription
                </Button>
                <ChangePlanButtonSmall />
              </CardFooter>
            </Card>

            <Card className="border-2 border-blue-100/50 hover:shadow-lg transition-all bg-gradient-to-br from-white to-blue-50/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  Usage & Limits
                </CardTitle>
                <CardDescription>Monitor your current usage and limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Storage</span>
                    <span className="font-semibold text-blue-600">2.4GB / 5GB</span>
                  </div>
                  <Progress value={48} className="h-2.5 bg-blue-100" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Team Members</span>
                    <span className="font-semibold text-blue-600">3 / 5</span>
                  </div>
                  <Progress value={60} className="h-2.5 bg-blue-100" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">API Calls</span>
                    <span className="font-semibold text-blue-600">8,245 / 10,000</span>
                  </div>
                  <Progress value={82.45} className="h-2.5 bg-blue-100" />
                </div>

                <div className="rounded-lg border-2 border-amber-200/50 p-4 bg-gradient-to-br from-amber-50 to-orange-50">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-amber-900">Approaching limit</p>
                      <p className="text-sm text-amber-800 mt-1">You&apos;re using 82% of your API calls limit. Consider upgrading your plan.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <UpgradePlanButton />
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payment-method" className="space-y-4">
          <Card className="border-2 border-purple-100/50 hover:shadow-lg transition-all bg-gradient-to-br from-white to-purple-50/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-white" />
                </div>
                Payment Methods
              </CardTitle>
              <CardDescription>Manage your payment methods and billing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border-2 border-purple-200/50 p-4 bg-gradient-to-br from-purple-50/50 to-blue-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-16 flex items-center justify-center bg-white rounded-md border border-purple-200/50 shadow-sm">
                      <Image src="/images/logo-stripe.png" alt="Card" width={48} height={32} className="object-contain" />
                    </div>
                    <div>
                      <p className="font-semibold">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 04/2024</p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-sm">
                    Default
                  </Badge>
                </div>
                <div className="mt-4 pt-4 border-t border-purple-200/50 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Added on April 12, 2023</p>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-purple-100">
                            <span className="sr-only">Edit</span>
                            <CreditCard className="h-4 w-4 text-purple-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit payment method</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border-2 border-dashed border-purple-200/50 p-4 flex items-center justify-center bg-purple-50/30">
                <AddPaymentMethodButton />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t pt-6">
              <div className="rounded-lg bg-gradient-to-br from-purple-50/50 to-blue-50/50 border-2 border-purple-200/50 p-4 w-full">
                <h4 className="font-semibold mb-2 text-purple-600">Billing Address</h4>
                <p className="text-sm text-muted-foreground">
                  John Doe
                  <br />
                  123 Main Street
                  <br />
                  San Francisco, CA 94103
                  <br />
                  United States
                </p>
                <Button variant="link" className="p-0 h-auto mt-2 text-purple-600 hover:text-purple-700 font-medium">
                  Update address
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing-history" className="space-y-4">
          <Card className="border-2 border-blue-100/50 hover:shadow-lg transition-all bg-gradient-to-br from-white to-blue-50/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                Billing History
              </CardTitle>
              <CardDescription>View your past invoices and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border-2 border-blue-200/50 overflow-hidden bg-white">
                <div className="grid grid-cols-5 gap-4 p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 font-semibold text-sm border-b-2 border-blue-200/50">
                  <div>Date</div>
                  <div>Invoice</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>

                {[
                  { date: "Apr 1, 2023", amount: "$49.95", status: "Paid", invoice: "INV-2023-001" },
                  { date: "Mar 1, 2023", amount: "$49.95", status: "Paid", invoice: "INV-2023-002" },
                  { date: "Feb 1, 2023", amount: "$49.95", status: "Paid", invoice: "INV-2023-003" },
                  { date: "Jan 1, 2023", amount: "$49.95", status: "Paid", invoice: "INV-2023-004" },
                  { date: "Dec 1, 2022", amount: "$49.95", status: "Paid", invoice: "INV-2022-012" },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-5 gap-4 p-4 border-t border-blue-100/50 items-center text-sm hover:bg-blue-50/30 transition-colors">
                    <div className="font-medium">{item.date}</div>
                    <div className="text-muted-foreground">{item.invoice}</div>
                    <div className="font-semibold text-blue-600">{item.amount}</div>
                    <div>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-sm">
                        {item.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 gap-1 hover:bg-blue-100 text-blue-600">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" className="border-purple-200 hover:bg-purple-50 hover:border-purple-300">
                Export All
              </Button>
              <Button variant="link" className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium">
                View All Invoices
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}