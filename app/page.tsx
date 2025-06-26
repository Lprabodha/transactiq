import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Shield,
  CreditCard,
  BarChart4,
  Webhook,
  AreaChart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
              TIQ
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              TransactIQ
            </span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Login
            </Link>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              asChild
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-purple-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800 mb-2">
                  Trusted by 10,000+ businesses worldwide
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    Secure Payments with Advanced AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Reduce fraud by up to 97% and increase approval rates by 15%
                    with our AI-powered payment platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-base"
                    asChild
                  >
                    <Link href="/signup">
                      Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base"
                    asChild
                  >
                    <Link href="#features">See How It Works</Link>
                  </Button>
                </div>

                {/* Social proof */}
                <div className="mt-6 flex flex-col space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[
                        "stripe.com",
                        "paypal.com",
                        "solidgate.com",
                        "squareup.com",
                        "adyen.com",
                      ].map((domain, i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full border-2 border-white overflow-hidden relative"
                        >
                          <Image
                            src={`https://logo.clearbit.com/${domain}`}
                            alt={`Logo of ${domain}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="ml-3">Trusted by 10,000+ businesses</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className="h-8 w-8 rounded-full overflow-hidden border-2 border-white relative"
                            >
                              <Image
                                src={`https://randomuser.me/api/portraits/men/${
                                  i + 10
                                }.jpg`}
                                alt={`User ${i}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <span className="ml-2">4.9/5 from 2,000+ reviews</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative lg:order-last">
                <div className="absolute -top-4 -right-4 h-72 w-72 rounded-full bg-purple-100 blur-3xl"></div>
                <Image
                  src="images/E-Wallet-pana.png?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Secure payment platform dashboard"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="w-full py-8 md:py-12 border-y bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                TRUSTED BY INDUSTRY LEADERS
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
                {[
                  {
                    name: "Stripe",
                    src: "/images/logo-stripe.png",
                    alt: "Stripe Logo",
                  },
                  {
                    name: "PayPal",
                    src: "/images/logo-paypal.png",
                    alt: "PayPal Logo",
                  },
                  {
                    name: "Adyen",
                    src: "/images/logo-adyen.png",
                    alt: "Adyen Logo",
                  },
                  {
                    name: "Solidgate",
                    src: "/images/logo-solidgate.jpg",
                    alt: "Solidgate Logo",
                  },
                  {
                    name: "Square",
                    src: "/images/logo-square.png",
                    alt: "Square Logo",
                  },
                ].map((logo, i) => (
                  <div key={i} className="h-10 w-24 relative">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-purple-50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
              <div className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-3 py-1 text-sm text-white">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Advanced AI-powered payment solutions
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Our platform provides cutting-edge tools to secure your
                payments, optimize routing, and forecast revenue.
              </p>
            </div>

            {/* Feature highlight */}
            <div className="mb-12 md:mb-16 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 p-4 md:p-8 border border-purple-100">
              <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
                <div className="order-2 md:order-1">
                  <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800 mb-4">
                    FEATURED
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Real-time Fraud Detection
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Our AI-powered fraud detection system analyzes transactions
                    in real-time, identifying suspicious patterns and preventing
                    fraud before it happens.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>97% accuracy in fraud detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Reduces chargebacks by up to 85%</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Customizable risk thresholds</span>
                    </li>
                  </ul>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                    Learn More
                  </Button>
                </div>
                <div className="order-1 md:order-2">
                  <Image
                    src="/images/fraud.png?height=400&width=400"
                    width={400}
                    height={400}
                    alt="Fraud Detection Dashboard"
                    className="mx-auto rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-3">
              {/* Keep the existing feature cards but add a hover effect */}
              <Card className="border-2 border-purple-100 hover:border-purple-200 transition-all hover:shadow-md hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Shield className="h-8 w-8 text-purple-600" />
                  <div>
                    <CardTitle className="text-xl">Fraud Detection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Real-time fraud prediction using trained ML models. Flags
                    issues like country mismatch, public email domains, and
                    unusual amounts.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Confidence scoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Detailed fraud reasons</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Model metadata</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100 hover:border-blue-200 transition-all hover:shadow-md hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-xl">
                      Chargeback Prediction
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Predicts likelihood of a chargeback using customer
                    transaction features, helping you reduce financial losses.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Risk scoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Transaction analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Preventive measures</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-indigo-100 hover:border-indigo-200 transition-all hover:shadow-md hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <BarChart4 className="h-8 w-8 text-indigo-600" />
                  <div>
                    <CardTitle className="text-xl">
                      Smart Payment Routing
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Recommends optimal gateway (Stripe, PayPal, Adyen) using
                    deep learning to maximize approval rates and minimize costs.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Multi-gateway support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Intelligent routing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Cost optimization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-100 hover:border-pink-200 transition-all hover:shadow-md hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <AreaChart className="h-8 w-8 text-pink-600" />
                  <div>
                    <CardTitle className="text-xl">
                      Revenue Forecasting
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Predicts next month&apos;s revenue per customer using
                    regression models, helping you plan and grow your business.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        Customer-level predictions
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Trend analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Growth planning</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-200 transition-all hover:shadow-md hover:-translate-y-1 lg:col-span-2">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Webhook className="h-8 w-8 text-green-600" />
                  <div>
                    <CardTitle className="text-xl">
                      Webhook Integration
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Seamlessly integrate with your existing systems through our
                    robust webhook system. Receive real-time notifications for
                    all payment events.
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-3">
                      <h3 className="font-medium">Payment Events</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified about successful and failed payments
                      </p>
                    </div>
                    <div className="rounded-lg border bg-card p-3">
                      <h3 className="font-medium">Fraud Alerts</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts when suspicious activity is detected
                      </p>
                    </div>
                    <div className="rounded-lg border bg-card p-3">
                      <h3 className="font-medium">Custom Triggers</h3>
                      <p className="text-sm text-muted-foreground">
                        Create your own webhook triggers for specific events
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-sm text-white">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Secure your payments in minutes
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed to be easy to integrate and use, with
                  powerful features that work right out of the box.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border-2 border-purple-100 bg-white p-6 text-center shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                  1
                </div>
                <h3 className="text-xl font-bold">Connect Your Account</h3>
                <p className="text-sm text-muted-foreground">
                  Sign up and connect your payment gateways to start processing
                  transactions securely.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border-2 border-blue-100 bg-white p-6 text-center shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                  2
                </div>
                <h3 className="text-xl font-bold">Configure AI Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Set up your fraud detection thresholds and payment routing
                  preferences to match your business needs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border-2 border-indigo-100 bg-white p-6 text-center shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                  3
                </div>
                <h3 className="text-xl font-bold">Process Payments</h3>
                <p className="text-sm text-muted-foreground">
                  Start processing payments with real-time fraud detection and
                  optimal gateway routing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold mb-2">97%</div>
                <div className="text-sm text-white/80">
                  Fraud Detection Accuracy
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold mb-2">15%</div>
                <div className="text-sm text-white/80">
                  Increase in Approval Rates
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold mb-2">85%</div>
                <div className="text-sm text-white/80">
                  Reduction in Chargebacks
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-sm text-white/80">
                  Businesses Protected
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-purple-50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-3 py-1 text-sm text-white">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple, transparent pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that works best for you and your team. All
                  plans include a 14-day free trial.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <Tabs defaultValue="monthly" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="bg-purple-100">
                    <TabsTrigger
                      value="monthly"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                    >
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger
                      value="quarterly"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                    >
                      Quarterly
                    </TabsTrigger>
                    <TabsTrigger
                      value="annual"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                    >
                      Annual
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="monthly" className="w-full">
                  <div className="grid gap-6 md:grid-cols-3">
                    {[
                      {
                        title: "Starter",
                        price: "$29",
                        description:
                          "Perfect for individuals and small teams just getting started.",
                        features: [
                          "Up to 5 team members",
                          "5GB storage",
                          "Basic fraud detection",
                          "24/7 support",
                        ],
                        popular: false,
                        color: "from-purple-600 to-blue-500",
                      },
                      {
                        title: "Professional",
                        price: "$79",
                        description:
                          "Ideal for growing teams that need more features and flexibility.",
                        features: [
                          "Up to 20 team members",
                          "50GB storage",
                          "Advanced fraud detection",
                          "Chargeback prediction",
                          "Smart payment routing",
                          "Priority support",
                        ],
                        popular: true,
                        color: "from-blue-600 to-indigo-600",
                      },
                      {
                        title: "Enterprise",
                        price: "$149",
                        description:
                          "For large organizations with advanced needs and dedicated support.",
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
                        popular: false,
                        color: "from-indigo-600 to-purple-600",
                      },
                    ].map((plan, index) => (
                      <Card
                        key={index}
                        className={`flex flex-col ${
                          plan.popular
                            ? "border-2 border-blue-200 shadow-lg"
                            : ""
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 right-0 -mt-2 -mr-2">
                            <div className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 text-xs font-medium text-white">
                              Popular
                            </div>
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{plan.title}</CardTitle>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold">
                              {plan.price}
                            </span>
                            <span className="text-muted-foreground">
                              /month
                            </span>
                          </div>
                          <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <ul className="space-y-2">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button
                            asChild
                            className={`w-full ${
                              plan.popular
                                ? `bg-gradient-to-r ${plan.color} hover:brightness-110`
                                : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"
                            }`}
                            variant={plan.popular ? "default" : "outline"}
                          >
                            <Link href="/signup">Get Started</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="quarterly" className="w-full">
                  <div className="grid gap-6 md:grid-cols-3">
                    {[
                      {
                        title: "Starter",
                        price: "$79",
                        description:
                          "Perfect for individuals and small teams just getting started.",
                        features: [
                          "Up to 5 team members",
                          "5GB storage",
                          "Basic fraud detection",
                          "24/7 support",
                        ],
                        popular: false,
                        color: "from-purple-600 to-blue-500",
                      },
                      {
                        title: "Professional",
                        price: "$199",
                        description:
                          "Ideal for growing teams that need more features and flexibility.",
                        features: [
                          "Up to 20 team members",
                          "50GB storage",
                          "Advanced fraud detection",
                          "Chargeback prediction",
                          "Smart payment routing",
                          "Priority support",
                        ],
                        popular: true,
                        color: "from-blue-600 to-indigo-600",
                      },
                      {
                        title: "Enterprise",
                        price: "$399",
                        description:
                          "For large organizations with advanced needs and dedicated support.",
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
                        popular: false,
                        color: "from-indigo-600 to-purple-600",
                      },
                    ].map((plan, index) => (
                      <Card
                        key={index}
                        className={`flex flex-col ${
                          plan.popular
                            ? "border-2 border-blue-200 shadow-lg"
                            : ""
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 right-0 -mt-2 -mr-2">
                            <div className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 text-xs font-medium text-white">
                              Popular
                            </div>
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{plan.title}</CardTitle>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold">
                              {plan.price}
                            </span>
                            <span className="text-muted-foreground">
                              /quarter
                            </span>
                          </div>
                          <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <ul className="space-y-2">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button
                            asChild
                            className={`w-full ${
                              plan.popular
                                ? `bg-gradient-to-r ${plan.color} hover:brightness-110`
                                : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"
                            }`}
                            variant={plan.popular ? "default" : "outline"}
                          >
                            <Link href="/signup">Get Started</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="annual" className="w-full">
                  <div className="grid gap-6 md:grid-cols-3">
                    {[
                      {
                        title: "Starter",
                        price: "$290",
                        description:
                          "Perfect for individuals and small teams just getting started.",
                        features: [
                          "Up to 5 team members",
                          "5GB storage",
                          "Basic fraud detection",
                          "24/7 support",
                        ],
                        popular: false,
                        color: "from-purple-600 to-blue-500",
                      },
                      {
                        title: "Professional",
                        price: "$790",
                        description:
                          "Ideal for growing teams that need more features and flexibility.",
                        features: [
                          "Up to 20 team members",
                          "50GB storage",
                          "Advanced fraud detection",
                          "Chargeback prediction",
                          "Smart payment routing",
                          "Priority support",
                        ],
                        popular: true,
                        color: "from-blue-600 to-indigo-600",
                      },
                      {
                        title: "Enterprise",
                        price: "$1,490",
                        description:
                          "For large organizations with advanced needs and dedicated support.",
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
                        popular: false,
                        color: "from-indigo-600 to-purple-600",
                      },
                    ].map((plan, index) => (
                      <Card
                        key={index}
                        className={`flex flex-col ${
                          plan.popular
                            ? "border-2 border-blue-200 shadow-lg"
                            : ""
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 right-0 -mt-2 -mr-2">
                            <div className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 text-xs font-medium text-white">
                              Popular
                            </div>
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{plan.title}</CardTitle>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold">
                              {plan.price}
                            </span>
                            <span className="text-muted-foreground">/year</span>
                          </div>
                          <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <ul className="space-y-2">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button
                            asChild
                            className={`w-full ${
                              plan.popular
                                ? `bg-gradient-to-r ${plan.color} hover:brightness-110`
                                : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"
                            }`}
                            variant={plan.popular ? "default" : "outline"}
                          >
                            <Link href="/signup">Get Started</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-50 to-white"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-sm text-white">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  What our customers say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don&apos;t just take our word for it. Here&apos;s what our
                  customers have to say about our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  quote:
                    "The fraud detection system has saved us thousands of dollars in potential chargebacks. It's incredibly accurate and easy to use.",
                  author: "Sarah Johnson",
                  role: "Payment Manager at TechCorp",
                  avatar: "images/sarah-johnson.jpg",
                  color: "border-purple-200",
                },
                {
                  quote:
                    "Smart payment routing has increased our approval rates by 15%. The AI makes intelligent decisions that have directly improved our bottom line.",
                  author: "Michael Chen",
                  role: "CTO at StartupX",
                  avatar: "images/michael-chen.jpg",
                  color: "border-blue-200",
                },
                {
                  quote:
                    "The revenue forecasting feature has transformed how we plan our business growth. It's remarkably accurate and gives us confidence in our financial projections.",
                  author: "Emily Rodriguez",
                  role: "CFO at GrowthCo",
                  avatar: "images/emily-rodriguez.jpg",
                  color: "border-indigo-200",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className={`text-left border-2 ${testimonial.color} hover:shadow-md transition-all`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex-1">
                        <p className="text-muted-foreground">
                          &quot;{testimonial.quote}&quot;
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.author}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
              <div className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-3 py-1 text-sm text-white">
                FAQ
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Frequently asked questions
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Everything you need to know about our payment platform.
              </p>
            </div>

            <div className="mx-auto grid max-w-3xl gap-4 md:gap-8">
              {[
                {
                  question: "How does the fraud detection system work?",
                  answer:
                    "Our AI-powered fraud detection system analyzes transactions in real-time, using machine learning models trained on millions of transactions to identify suspicious patterns and prevent fraud before it happens.",
                },
                {
                  question: "What payment gateways do you support?",
                  answer:
                    "We support all major payment gateways including Stripe, PayPal, Adyen, Braintree, and more. Our smart routing system automatically selects the optimal gateway for each transaction.",
                },
                {
                  question: "How accurate is your chargeback prediction?",
                  answer:
                    "Our chargeback prediction system has an accuracy rate of over 90%, helping you identify and prevent potential chargebacks before they occur.",
                },
                {
                  question: "Is there a setup fee?",
                  answer:
                    "No, there are no setup fees. You only pay for what you use, and we offer a 14-day free trial so you can test our platform before committing.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                  Ready to secure your payments?
                </h2>
                <p className="text-xl text-white/80 md:text-2xl/relaxed">
                  Join thousands of businesses that use our platform to process
                  payments securely and efficiently.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-6">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 text-base"
                  asChild
                >
                  <Link href="/signup">
                    Start Your Free Trial{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white/20 hover:bg-white/10 text-base"
                  asChild
                >
                  <Link href="#pricing">View Pricing</Link>
                </Button>
              </div>
              <div className="mt-8 text-sm text-white/60">
                No credit card required. 14-day free trial.
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  TIQ
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  TransactIQ
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Secure your payments and optimize your revenue with our
                AI-powered platform.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    API Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TransactIQ. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
