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
  RefreshCw,
} from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { createStripePortal } from "@/app/actions/stripe"

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
      <Card className="mb-6 border-2 border-primary/10 bg-gradient-to-r from-primary/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-primary" />
                {getPlanName(userData.plan_id)}
              </h3>
              <p className="text-muted-foreground mt-1">{getPlanPrice(userData.plan_id)}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Change Plan
              </Button>
              <form action={async () => {
                "use server"
                const portalUrl = await createStripePortal()
                if (portalUrl) {
                  redirect(portalUrl)
                }
              }}>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                >
                  Manage Billing
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="subscription" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Subscription</span>
          </TabsTrigger>
          <TabsTrigger value="payment-method" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
          <TabsTrigger value="billing-history" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Subscription Details
                </CardTitle>
                <CardDescription>Your current plan and billing information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{getPlanName(userData.plan_id)}</p>
                      <p className="text-sm text-muted-foreground">{getPlanPrice(userData.plan_id)}</p>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Active
                    </Badge>
                  </div>

                  {userData.plan_expire_date && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Billing period</span>
                        <span className="font-medium">{daysRemaining} days remaining</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">Renews on {expirationDate}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Plan Features</h4>
                  <ul className="space-y-2">
                    {getPlanFeatures(userData.plan_id).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 border-t pt-6">
                <Button variant="outline" className="w-full sm:w-auto">
                  Cancel Subscription
                </Button>
                <Button className="w-full sm:w-auto">Change Plan</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Usage & Limits
                </CardTitle>
                <CardDescription>Monitor your current usage and limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Storage</span>
                    <span className="font-medium">2.4GB / 5GB</span>
                  </div>
                  <Progress value={48} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Team Members</span>
                    <span className="font-medium">3 / 5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>API Calls</span>
                    <span className="font-medium">8,245 / 10,000</span>
                  </div>
                  <Progress value={82.45} className="h-2" />
                </div>

                <div className="rounded-lg border p-4 bg-amber-50 border-amber-200 text-amber-800">
                  <div className="flex gap-2">
                    <Clock className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Approaching limit</p>
                      <p className="text-sm">You're using 82% of your API calls limit. Consider upgrading your plan.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                  Upgrade Plan
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payment-method" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment Methods
              </CardTitle>
              <CardDescription>Manage your payment methods and billing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-16 flex items-center justify-center">
                      <Image src="/images/visa-logo.svg" alt="Visa" width={48} height={32} className="object-contain" />
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 04/2024</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Default
                  </Badge>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Added on April 12, 2023</p>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Edit</span>
                            <CreditCard className="h-4 w-4" />
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

              <div className="rounded-lg border p-4 border-dashed flex items-center justify-center">
                <Button variant="outline" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t pt-6">
              <div className="rounded-lg bg-muted p-4 w-full">
                <h4 className="font-medium mb-2">Billing Address</h4>
                <p className="text-sm text-muted-foreground">
                  John Doe
                  <br />
                  123 Main Street
                  <br />
                  San Francisco, CA 94103
                  <br />
                  United States
                </p>
                <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                  Update address
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Billing History
              </CardTitle>
              <CardDescription>View your past invoices and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 bg-muted/50 font-medium text-sm">
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
                  <div key={i} className="grid grid-cols-5 gap-4 p-4 border-t items-center text-sm">
                    <div>{item.date}</div>
                    <div>{item.invoice}</div>
                    <div>{item.amount}</div>
                    <div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {item.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline">Export All</Button>
              <Button variant="link" className="flex items-center gap-1">
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