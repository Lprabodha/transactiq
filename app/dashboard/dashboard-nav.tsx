"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, Home, LifeBuoy, LogOut, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { logoutUser } from "@/app/actions/auth"

export function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Account",
      href: "/dashboard/account",
      icon: User,
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: CreditCard,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex h-full flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg font-bold">SaaSify</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  isActive ? "bg-muted text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <nav className="grid gap-2">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary"
          >
            <LifeBuoy className="h-4 w-4" />
            Help & Support
          </Link>
          <Separator />
          <form action={logoutUser}>
            <Button variant="ghost" className="flex items-center gap-3 px-3 py-2 justify-start w-full" type="submit">
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </form>
        </nav>
      </div>
    </div>
  )
}

