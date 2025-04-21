"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  Home,
  LifeBuoy,
  LogOut,
  Settings,
  User,
  BarChart2,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { logoutUser } from "@/app/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/app/context/auth-context";

export function DashboardNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart2,
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
  ];

  // Get user initials for avatar
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="flex h-full flex-col border-r bg-background/95 backdrop-blur-sm">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
            TIQ
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            TransactIQ
          </span>
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-3 px-6 py-4 border-b">
          <Avatar className="h-9 w-9 border-2 border-primary/10">
            <AvatarImage src="/placeholder.svg" alt={user.name || "User"} />
            <AvatarFallback className="bg-gradient-to-br from-purple-600/10 to-blue-500/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.name || "User"}</span>
            <span className="text-xs text-muted-foreground truncate max-w-[140px]">
              {user?.email || "user@example.com"}
            </span>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto py-6 px-3">
        <div className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Main
        </div>
        <nav className="grid items-start gap-1 text-sm font-medium">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                className={`group flex items-center justify-between gap-3 rounded-md px-4 py-2.5 transition-all hover:bg-muted ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600/10 to-blue-500/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={`h-4 w-4 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                  <span>{item.title}</span>
                </div>
                {isActive && (
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Support
        </div>
        <nav className="grid items-start gap-1 text-sm font-medium">
          <Link
            href="#"
            className="group flex items-center gap-3 rounded-md px-4 py-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <HelpCircle className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
            Help Center
          </Link>
          <Link
            href="#"
            className="group flex items-center gap-3 rounded-md px-4 py-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <LifeBuoy className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
            Contact Support
          </Link>
        </nav>
      </div>

      <div className="mt-auto p-4 border-t">
        <div className="rounded-lg bg-muted/50 p-4 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-medium">Pro Plan</div>
              <div className="text-xs text-muted-foreground">
                Renews on May 15, 2023
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full gap-1 text-xs">
            <span>Manage Subscription</span>
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>

        <Button
          variant="outline"
          className="flex items-center gap-3 justify-center w-full border-dashed"
          type="submit"
          onClick={() => logoutUser()}
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </Button>
      </div>
    </div>
  );
}
