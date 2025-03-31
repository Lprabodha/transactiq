import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/app/dashboard/dashboard-header"
import { DashboardShell } from "@/app/dashboard/dashboard-shell"
import { getCurrentUser } from "@/app/actions/auth"
import { getUserById } from "@/lib/models/user"
import { redirect } from "next/navigation"


export default async function BillingPage() {

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/login")
  }

    const userData = await getUserById(currentUser.id)
    if (!userData?.plan_id || userData.plan_id === 0) {
      redirect("/subscription")
    }

  return (
    <DashboardShell>
      <DashboardHeader heading="Billing" text="Manage your subscription and billing information." />
      <Tabs defaultValue="subscription" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payment-method">Payment Method</TabsTrigger>
          <TabsTrigger value="billing-history">Billing History</TabsTrigger>
        </TabsList>
        <TabsContent value="subscription" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Subscription</CardTitle>
              <CardDescription>You are currently on the Professional plan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Professional Plan</p>
                    <p className="text-sm text-muted-foreground">$79/month</p>
                  </div>
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Active</div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Your next billing date is May 1, 2023</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0 md:space-y-0">
              <Button variant="outline">Cancel Subscription</Button>
              <Button>Change Plan</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="payment-method" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Update your payment method.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-16 rounded-md bg-muted"></div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 04/2024</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Default</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Payment Method</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="billing-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your billing history and download invoices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { date: "Apr 1, 2023", amount: "$79.00", status: "Paid", invoice: "INV-001" },
                { date: "Mar 1, 2023", amount: "$79.00", status: "Paid", invoice: "INV-002" },
                { date: "Feb 1, 2023", amount: "$79.00", status: "Paid", invoice: "INV-003" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{item.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.amount} - {item.status}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

