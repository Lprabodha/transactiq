import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SubscriptionForm } from "@/app/subscription/subscription-form";
import { getCurrentUser } from "@/app/actions/auth";
import { getUserById } from "@/lib/models/user";

export const metadata: Metadata = {
  title: "Choose Your Subscription | TransactIQ",
  description:
    "Select the subscription plan that works best for you and your team.",
};

export default async function SubscriptionPage() {
  const currentUser = await getCurrentUser();
  const userData = await getUserById(currentUser.id);

  if (userData?.plan_id !== 0) {
    redirect("/dashboard/billing");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container px-4 py-6 md:max-w-4xl md:py-10">
        <header className="mb-6 md:mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">
            Choose your subscription plan
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Select the plan that works best for you and your team.
          </p>
        </header>

        <SubscriptionForm />
      </div>
    </div>
  );
}
