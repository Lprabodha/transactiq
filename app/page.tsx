import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
            <span className="text-xl font-bold">TransactIQ</span>
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
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    AI-powered SaaS payment integration  with TransactIQ
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The all-in-one platform that helps teams collaborate, manage projects, and deliver results faster.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/signup">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Hero"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need to succeed
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides all the tools you need to streamline your workflow, collaborate with your team,
                  and deliver results.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  title: "Seamless Integration",
                  description: "Connect with your favorite tools and services without any hassle.",
                  icon: "🔄",
                },
                {
                  title: "Real-time Collaboration",
                  description: "Work together with your team in real-time, no matter where they are.",
                  icon: "👥",
                },
                {
                  title: "Advanced Analytics",
                  description: "Get insights into your team's performance and make data-driven decisions.",
                  icon: "📊",
                },
                {
                  title: "Automated Workflows",
                  description: "Automate repetitive tasks and focus on what matters most.",
                  icon: "⚙️",
                },
                {
                  title: "Secure & Reliable",
                  description: "Your data is always safe and accessible when you need it.",
                  icon: "🔒",
                },
                {
                  title: "24/7 Support",
                  description: "Our team is always available to help you with any questions or issues.",
                  icon: "🛟",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, transparent pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that works best for you and your team. All plans include a 14-day free trial.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <Tabs defaultValue="monthly" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                    <TabsTrigger value="annual">Annual</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="monthly" className="w-full">
                  <div className="grid gap-6 md:grid-cols-3">
                    {[
                      {
                        title: "Starter",
                        price: "$29",
                        description: "Perfect for individuals and small teams just getting started.",
                        features: ["Up to 5 team members", "5GB storage", "Basic analytics", "24/7 support"],
                        popular: false,
                      },
                      {
                        title: "Professional",
                        price: "$79",
                        description: "Ideal for growing teams that need more features and flexibility.",
                        features: [
                          "Up to 20 team members",
                          "50GB storage",
                          "Advanced analytics",
                          "Priority support",
                          "Custom integrations",
                        ],
                        popular: true,
                      },
                      {
                        title: "Enterprise",
                        price: "$149",
                        description: "For large organizations with advanced needs and dedicated support.",
                        features: [
                          "Unlimited team members",
                          "500GB storage",
                          "Enterprise analytics",
                          "Dedicated support",
                          "Custom integrations",
                          "Advanced security",
                        ],
                        popular: false,
                      },
                    ].map((plan, index) => (
                      <Card key={index} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                        {plan.popular && (
                          <div className="absolute top-0 right-0 -mt-2 -mr-2">
                            <div className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                              Popular
                            </div>
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{plan.title}</CardTitle>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold">{plan.price}</span>
                            <span className="text-muted-foreground">/month</span>
                          </div>
                          <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <ul className="space-y-2">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
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
                        description: "Perfect for individuals and small teams just getting started.",
                        features: ["Up to 5 team members", "5GB storage", "Basic analytics", "24/7 support"],
                        popular: false,
                      },
                      {
                        title: "Professional",
                        price: "$199",
                        description: "Ideal for growing teams that need more features and flexibility.",
                        features: [
                          "Up to 20 team members",
                          "50GB storage",
                          "Advanced analytics",
                          "Priority support",
                          "Custom integrations",
                        ],
                        popular: true,
                      },
                      {
                        title: "Enterprise",
                        price: "$399",
                        description: "For large organizations with advanced needs and dedicated support.",
                        features: [
                          "Unlimited team members",
                          "500GB storage",
                          "Enterprise analytics",
                          "Dedicated support",
                          "Custom integrations",
                          "Advanced security",
                        ],
                        popular: false,
                      },
                    ].map((plan, index) => (
                      <Card key={index} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                        {plan.popular && (
                          <div className="absolute top-0 right-0 -mt-2 -mr-2">
                            <div className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                              Popular
                            </div>
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{plan.title}</CardTitle>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold">{plan.price}</span>
                            <span className="text-muted-foreground">/quarter</span>
                          </div>
                          <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <ul className="space-y-2">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
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
                        description: "Perfect for individuals and small teams just getting started.",
                        features: ["Up to 5 team members", "5GB storage", "Basic analytics", "24/7 support"],
                        popular: false,
                      },
                      {
                        title: "Professional",
                        price: "$790",
                        description: "Ideal for growing teams that need more features and flexibility.",
                        features: [
                          "Up to 20 team members",
                          "50GB storage",
                          "Advanced analytics",
                          "Priority support",
                          "Custom integrations",
                        ],
                        popular: true,
                      },
                      {
                        title: "Enterprise",
                        price: "$1,490",
                        description: "For large organizations with advanced needs and dedicated support.",
                        features: [
                          "Unlimited team members",
                          "500GB storage",
                          "Enterprise analytics",
                          "Dedicated support",
                          "Custom integrations",
                          "Advanced security",
                        ],
                        popular: false,
                      },
                    ].map((plan, index) => (
                      <Card key={index} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                        {plan.popular && (
                          <div className="absolute top-0 right-0 -mt-2 -mr-2">
                            <div className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                              Popular
                            </div>
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{plan.title}</CardTitle>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold">{plan.price}</span>
                            <span className="text-muted-foreground">/year</span>
                          </div>
                          <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <ul className="space-y-2">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
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
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What our customers say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it. Here's what our customers have to say about our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  quote:
                    "TransactIQ has completely transformed how our team works. We're more productive, more collaborative, and more efficient than ever before.",
                  author: "Sarah Johnson",
                  role: "Product Manager at TechCorp",
                  avatar: "/placeholder.svg?height=40&width=40",
                },
                {
                  quote:
                    "The platform is intuitive and powerful. It's helped us streamline our workflows and focus on what really matters - delivering value to our customers.",
                  author: "Michael Chen",
                  role: "CTO at StartupX",
                  avatar: "/placeholder.svg?height=40&width=40",
                },
                {
                  quote:
                    "Customer support is exceptional. Whenever we've had questions or issues, the team has been quick to respond and incredibly helpful.",
                  author: "Emily Rodriguez",
                  role: "Operations Director at GrowthCo",
                  avatar: "/placeholder.svg?height=40&width=40",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="text-left">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex-1">
                        <p className="text-muted-foreground">"{testimonial.quote}"</p>
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
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to get started?</h2>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed">
                  Join thousands of teams that use TransactIQ to streamline their workflows and boost productivity.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/signup">
                    Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="#pricing">View Pricing</Link>
                </Button>
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
                <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
                <span className="text-xl font-bold">TransactIQ</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered SaaS payment integration  and boost productivity with our all-in-one platform.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground transition-colors hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground transition-colors hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
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
  )
}

