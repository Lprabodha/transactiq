"use server"

import { redirect } from "next/navigation"
import { ObjectId } from "mongodb"
import { getCurrentUser } from "@/app/actions/auth"
import clientPromise from "@/lib/mongodb"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16", 
})

export async function getOrCreateStripeCustomer() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return { error: "User not authenticated" }
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_URI || "saasify")
    const usersCollection = db.collection("users")

    const user = await usersCollection.findOne({ _id: new ObjectId(currentUser.id) })

    if (!user) {
      return { error: "User not found" }
    }

    if (user.stripe_customer_id) {
      return { customerId: user.stripe_customer_id }
    }

    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      metadata: {
        userId: currentUser.id,
      },
    })

    await usersCollection.updateOne(
      { _id: new ObjectId(currentUser.id) },
      {
        $set: {
          stripe_customer_id: customer.id,
          updatedAt: new Date(),
        },
      },
    )

    return { customerId: customer.id }
  } catch (error) {
    console.error("Error creating Stripe customer:", error)
    return { error: "Failed to create Stripe customer" }
  }
}

export async function createCheckoutSession(formData: FormData) {
  const plan = formData.get("plan") as string
  const billingCycle = formData.get("billingCycle") as string
  const gateway = formData.get("gateway") as string

  if (!plan || !billingCycle || !gateway) {
    throw new Error("Missing required parameters")
  }

  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      redirect("/login")
    }

    const { customerId, error } = await getOrCreateStripeCustomer()

    if (error || !customerId) {
      throw new Error(error || "Failed to get or create Stripe customer")
    }

    let planId = 0

    switch (plan) {
      case "monthly":
        planId = 1
        break
      case "quarterly":
        planId = 2
        break
      case "annual":
        planId = 3
        break
      default:
        planId = 0
    }

    const now = new Date()
    const expirationDate = new Date()

    switch (billingCycle) {
      case "monthly":
        expirationDate.setMonth(now.getMonth() + 1)
        break
      case "quarterly":
        expirationDate.setMonth(now.getMonth() + 3)
        break
      case "annual":
        expirationDate.setFullYear(now.getFullYear() + 1)
        break
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "saasify")
    const usersCollection = db.collection("users")

    await usersCollection.updateOne(
      { _id: new ObjectId(currentUser.id) },
      {
        $set: {
          plan_id: planId,
          plan_expire_date: expirationDate,
          updatedAt: new Date(),
        },
      },
    )

    if (gateway === "stripe") {
      // In a real app, you would use actual price IDs from your Stripe account
      // For demo purposes, we'll redirect to the dashboard
      // This is where you would create a Stripe checkout session
      // const session = await stripe.checkout.sessions.create({
      //   customer: customerId,
      //   line_items: [
      //     {
      //       price: priceId,
      //       quantity: 1,
      //     },
      //   ],
      //   mode: 'subscription',
      //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription?canceled=true`,
      // })
      // return { sessionId: session.id, url: session.url }
    }

    // For demo purposes:
    redirect("/dashboard")
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw new Error("Failed to create checkout session")
  }
}

