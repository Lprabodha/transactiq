"use server"

import { redirect } from "next/navigation"
import { getCurrentUser } from "./auth"
import { getUserById } from "@/lib/models/user"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
})

export async function createStripePortal() {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        redirect("/login")
    }

    const userData = await getUserById(currentUser.id)
    if (!userData?.stripe_customer_id) {
        throw new Error("No Stripe customer ID found")
    }

    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: userData.stripe_customer_id,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
        })

        return portalSession.url
    } catch (error) {
        console.error("Error creating Stripe portal session:", error)
        throw new Error("Failed to create billing portal session")
    }
}