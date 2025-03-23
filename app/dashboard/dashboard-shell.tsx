import type React from "react"
import { DashboardNav } from "@/app/dashboard/dashboard-nav"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardNav />
      <main className="flex flex-col gap-6 p-6 md:gap-8">
        <div className="flex flex-col gap-6 md:gap-8">{children}</div>
      </main>
    </div>
  )
}

