import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart2,
  PieChart,
  Download,
  FileText,
  Clock,
  CheckCircle,
  Search,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export function DashboardContent() {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <TabsList className="h-10 p-1 bg-muted/60">
          <TabsTrigger
            value="overview"
            className="rounded-md px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="rounded-md px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
          >
            Reports
          </TabsTrigger>
        </TabsList>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full sm:w-[200px] pl-8 rounded-md border-muted bg-background"
          />
        </div>
      </div>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all bg-gradient-to-br from-white to-green-50/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$45,231.89</div>
              <div className="flex items-center mt-2">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1 border-green-200">
                  <TrendingUp className="h-3 w-3" />
                  <span>20.1%</span>
                </Badge>
                <span className="text-xs text-muted-foreground ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all bg-gradient-to-br from-white to-blue-50/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">+2,350</div>
              <div className="flex items-center mt-2">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1 border-green-200">
                  <TrendingUp className="h-3 w-3" />
                  <span>180.1%</span>
                </Badge>
                <span className="text-xs text-muted-foreground ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-all bg-gradient-to-br from-white to-purple-50/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md">
                <Users className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">+12,234</div>
              <div className="flex items-center mt-2">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1 border-green-200">
                  <TrendingUp className="h-3 w-3" />
                  <span>19%</span>
                </Badge>
                <span className="text-xs text-muted-foreground ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-all bg-gradient-to-br from-white to-amber-50/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
                <Activity className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">+573</div>
              <div className="flex items-center mt-2">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1 border-green-200">
                  <TrendingUp className="h-3 w-3" />
                  <span>201</span>
                </Badge>
                <span className="text-xs text-muted-foreground ml-2">since last hour</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 hover:shadow-lg transition-all border-2 border-purple-100/50 bg-gradient-to-br from-white to-purple-50/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Revenue Overview</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-purple-200 hover:from-purple-100 hover:to-blue-100">
                    Monthly
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-purple-100">
                    <BarChart2 className="h-4 w-4 text-purple-600" />
                  </Button>
                </div>
              </div>
              <CardDescription>Daily revenue for the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[240px] w-full rounded-lg bg-gradient-to-b from-purple-50/50 to-blue-50/50 flex items-end p-4 border border-purple-100/30">
                {/* Simulated chart bars */}
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="h-full flex-1 mx-0.5 flex flex-col justify-end group">
                    <div
                      className="bg-gradient-to-t from-purple-600 via-purple-500 to-blue-500 rounded-t-sm group-hover:from-purple-700 group-hover:via-purple-600 group-hover:to-blue-600 transition-all relative shadow-sm group-hover:shadow-md"
                      style={{
                        height: `${Math.max(15, Math.floor(Math.random() * 100))}%`,
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap z-10">
                        ${Math.floor(Math.random() * 1000) + 500}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-between text-sm text-muted-foreground">
              <div>Apr 1</div>
              <div>Apr 30</div>
            </CardFooter>
          </Card>

          <Card className="col-span-3 hover:shadow-lg transition-all border-2 border-blue-100/50 bg-gradient-to-br from-white to-blue-50/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Recent Sales</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-100">
                  <PieChart className="h-4 w-4 text-blue-600" />
                </Button>
              </div>
              <CardDescription>You made 265 sales this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { name: "Olivia Martin", email: "olivia@example.com", amount: 1999, status: "success" },
                  { name: "Jackson Lee", email: "jackson@example.com", amount: 1499, status: "success" },
                  { name: "Isabella Nguyen", email: "isabella@example.com", amount: 2199, status: "pending" },
                  { name: "William Kim", email: "will@example.com", amount: 899, status: "success" },
                  { name: "Sofia Davis", email: "sofia@example.com", amount: 3999, status: "success" },
                ].map((sale, i) => (
                  <div key={i} className="flex items-center">
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage src={`/placeholder.svg?height=36&width=36&text=${sale.name.charAt(0)}`} />
                      <AvatarFallback>{sale.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{sale.name}</p>
                      <p className="text-sm text-muted-foreground">{sale.email}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="font-medium">${(sale.amount / 100).toFixed(2)}</div>
                      {sale.status === "success" ? (
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-center">
              <Button variant="outline" size="sm" className="w-full">
                View All Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="analytics" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">User Growth</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Users className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>New users over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full rounded-md bg-gradient-to-b from-blue-500/10 to-blue-500/5 flex items-end p-4">
                {/* Simulated chart area */}
                <div className="w-full h-full relative">
                  <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-blue-500/20 to-blue-500/5 rounded-md"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-[40%] border-t border-blue-500/20"></div>
                  <div className="absolute bottom-0 left-[25%] right-0 h-[30%] border-t border-blue-500/20"></div>
                  <div className="absolute bottom-0 left-[50%] right-0 h-[20%] border-t border-blue-500/20"></div>
                  <div className="absolute bottom-0 left-[75%] right-0 h-[10%] border-t border-blue-500/20"></div>
                  <div className="absolute top-[20%] left-0 right-0 h-0 border-t border-dashed border-blue-500/30"></div>
                  <div className="absolute top-[50%] left-0 right-0 h-0 border-t border-dashed border-blue-500/30"></div>
                  <div className="absolute top-[80%] left-0 right-0 h-0 border-t border-dashed border-blue-500/30"></div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-between text-sm text-muted-foreground">
              <div>Jan</div>
              <div>Dec</div>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Conversion Rate</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <PieChart className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Visitor to customer conversion</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[200px] w-[200px] relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-8 border-muted"></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-transparent border-t-primary"
                  style={{ transform: "rotate(45deg)" }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-transparent border-r-primary"
                  style={{ transform: "rotate(45deg)" }}
                ></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24.8%</div>
                  <div className="text-sm text-muted-foreground">Conversion</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-center">
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">+2.4% from last month</Badge>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Traffic Sources</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <BarChart2 className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Where your visitors come from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { source: "Direct", percentage: 35, color: "bg-blue-500" },
                  { source: "Organic Search", percentage: 28, color: "bg-green-500" },
                  { source: "Referral", percentage: 22, color: "bg-purple-500" },
                  { source: "Social Media", percentage: 15, color: "bg-amber-500" },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.source}</span>
                      <span className="font-medium">{item.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="hover:shadow-md transition-all">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Performance Metrics</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  This Week
                </Button>
                <Button variant="outline" size="sm">
                  This Month
                </Button>
                <Button variant="outline" size="sm" className="bg-primary/5">
                  This Year
                </Button>
              </div>
            </div>
            <CardDescription>Key performance indicators for your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md bg-gradient-to-b from-primary/10 to-primary/5 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
                {[
                  { title: "Page Views", value: "1.2M", change: "+12.3%", icon: Activity },
                  { title: "Bounce Rate", value: "42.8%", change: "-3.6%", icon: TrendingDown, positive: true },
                  { title: "Avg. Session", value: "3m 42s", change: "+0.8%", icon: Clock },
                  { title: "Conversion", value: "3.24%", change: "+1.2%", icon: TrendingUp },
                ].map((metric, i) => (
                  <div key={i} className="bg-background rounded-lg p-4 shadow-sm flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
                      <metric.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div
                        className={`text-xs ${metric.positive ? "text-green-600" : "text-primary"} flex items-center gap-1`}
                      >
                        {metric.change.startsWith("+") ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {metric.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reports" className="space-y-6">
        <Card className="hover:shadow-md transition-all">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Monthly Reports</CardTitle>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Generate Report
              </Button>
            </div>
            <CardDescription>View and download your monthly reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
                <div className="col-span-4">Report</div>
                <div className="col-span-3">Period</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1 text-right">Action</div>
              </div>

              {[
                {
                  name: "Monthly Financial Report",
                  period: "April 2023",
                  size: "4.2 MB",
                  status: "Available",
                  icon: FileText,
                  iconColor: "text-blue-600",
                },
                {
                  name: "User Activity Summary",
                  period: "March 2023",
                  size: "2.8 MB",
                  status: "Available",
                  icon: Users,
                  iconColor: "text-purple-600",
                },
                {
                  name: "Sales Performance",
                  period: "February 2023",
                  size: "3.5 MB",
                  status: "Available",
                  icon: DollarSign,
                  iconColor: "text-green-600",
                },
                {
                  name: "Marketing Campaign Results",
                  period: "January 2023",
                  size: "5.1 MB",
                  status: "Available",
                  icon: BarChart2,
                  iconColor: "text-amber-600",
                },
                {
                  name: "Q2 Financial Forecast",
                  period: "Q2 2023",
                  size: "1.8 MB",
                  status: "Processing",
                  icon: Clock,
                  iconColor: "text-gray-600",
                },
              ].map((report, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 gap-4 p-4 border-t items-center text-sm hover:bg-muted/20 transition-colors"
                >
                  <div className="col-span-4 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                      <report.icon className={`h-4 w-4 ${report.iconColor}`} />
                    </div>
                    <span className="font-medium">{report.name}</span>
                  </div>
                  <div className="col-span-3">{report.period}</div>
                  <div className="col-span-2">{report.size}</div>
                  <div className="col-span-2">
                    {report.status === "Available" ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1 w-fit">
                        <CheckCircle className="h-3 w-3" />
                        <span>{report.status}</span>
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <Clock className="h-3 w-3" />
                        <span>{report.status}</span>
                      </Badge>
                    )}
                  </div>
                  <div className="col-span-1 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled={report.status !== "Available"}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Export All
            </Button>
            <div className="text-sm text-muted-foreground">Showing 5 of 24 reports</div>
          </CardFooter>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-md transition-all">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Scheduled Reports</CardTitle>
              <CardDescription>Reports scheduled for automatic generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Weekly Sales Summary", frequency: "Every Monday", next: "May 8, 2023" },
                  { name: "Monthly Financial Report", frequency: "1st of month", next: "June 1, 2023" },
                  { name: "Quarterly Performance", frequency: "End of quarter", next: "June 30, 2023" },
                ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {report.frequency}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Next: {report.next}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                Add Scheduled Report
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Report Templates</CardTitle>
              <CardDescription>Custom report templates for your business</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Executive Summary", description: "High-level overview for management" },
                  { name: "Detailed Sales Analysis", description: "In-depth sales metrics and trends" },
                  { name: "Customer Acquisition", description: "New customer metrics and sources" },
                  { name: "Product Performance", description: "Product-level sales and metrics" },
                ].map((template, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Use
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                Create Template
              </Button>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

