import { DashboardHeader } from "@/app/dashboard/dashboard-header"
import { DashboardShell } from "@/app/dashboard/dashboard-shell"
import { DashboardContent } from "@/app/dashboard/dashboard-content"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome to your TransactIQ dashboard." />
      <DashboardContent />
    </DashboardShell>
  )
}

