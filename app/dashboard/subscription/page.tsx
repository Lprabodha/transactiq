import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SubscriptionForm } from "@/app/dashboard/subscription/subscription-form";
import { getCurrentUser } from "@/app/actions/auth";
import { getUserById } from "@/lib/models/user";
import { DashboardHeader } from "@/app/dashboard/dashboard-header"
import { DashboardShell } from "@/app/dashboard/dashboard-shell"

export const metadata: Metadata = {
  title: "Choose Your Subscription | TransactIQ",
  description:
    "Select the subscription plan that works best for you and your team.",
};

export default async function SubscriptionPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const userData = await getUserById(currentUser.id);

  if (userData?.plan_id !== 0) {
    redirect("/dashboard/billing");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Subscription"
        text="Choose Your Subscription"
      />
      <div className="flex min-h-screen flex-col">
        <div className="container px-4 py-6 md:max-w-4xl md:py-10">
          <SubscriptionForm />
        </div>
      </div>
    </DashboardShell>
  );
}
