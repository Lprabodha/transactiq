"use server";

import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { getCurrentUser } from "@/app/actions/auth";
import clientPromise from "@/lib/mongodb";
import Stripe from "stripe";
import { Api as SolidgateApi } from "@solidgate/node-sdk";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

const solidgateApi = new SolidgateApi(
  process.env.SOLIDGATE_PUBLIC_KEY!,
  process.env.SOLIDGATE_SECRET_KEY!
);

function getDatabaseName(uri: string): string {
  const parts = uri.split("/");
  return parts[parts.length - 1] || "transactIQ";
}

export async function getOrCreateStripeCustomer() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "User not authenticated" };
    }

    const client = await clientPromise;
    const uri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/transactIQ";
    const dbName = getDatabaseName(uri);
    const db = client.db(dbName);
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      _id: new ObjectId(currentUser.id),
    });

    if (!user) {
      return { error: "User not found" };
    }

    if (user.stripe_customer_id) {
      return { customerId: user.stripe_customer_id };
    }

    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      metadata: {
        userId: currentUser.id,
        user_email: user.email,
      },
    });

    await usersCollection.updateOne(
      { _id: new ObjectId(currentUser.id) },
      {
        $set: {
          stripe_customer_id: customer.id,
          updatedAt: new Date(),
        },
      }
    );

    return { customerId: customer.id };
  } catch (error) {
    console.error("Error creating Stripe customer:", error);
    return { error: "Failed to create Stripe customer" };
  }
}

export async function createCheckoutSession(formData: FormData) {
  const plan = formData.get("plan") as string;
  const billingCycle = formData.get("billingCycle") as string;
  const gateway = formData.get("gateway") as string;

  if (!plan || !billingCycle || !gateway) {
    throw new Error("Missing required parameters");
  }

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      redirect("/login");
    }

    const { customerId, error } = await getOrCreateStripeCustomer();

    if (error || !customerId) {
      throw new Error(error || "Failed to get or create Stripe customer");
    }

    let priceId = process.env.STRIPE_PRICE_1_ID;
    let solidgatePriceId = process.env.SOLIDGATE_PRICE_1_ID;
    let amount = 1000;

    switch (plan) {
      case "monthly":
        priceId = process.env.STRIPE_PRICE_1_ID;
        solidgatePriceId = process.env.SOLIDGATE_PRICE_1_ID!;
        amount = 1000;
        break;
      case "quarterly":
        priceId = process.env.STRIPE_PRICE_3_ID;
        solidgatePriceId = process.env.SOLIDGATE_PRICE_3_ID!;
        amount = 2500;
        break;
      case "annual":
        priceId = process.env.STRIPE_PRICE_12_ID;
        solidgatePriceId = process.env.SOLIDGATE_PRICE_12_ID!;
        amount = 2500;
        break;
      default:
        priceId = process.env.STRIPE_PRICE_1_ID;
    }

    if (gateway === "stripe") {
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        billing_address_collection: "required",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription?canceled=true`,
      });

      if (session.url) {
        return { url: session.url };
      }
    } else if (gateway == "solidgate") {
      const merchantData = solidgateApi.formMerchantData({
        currency: "USD",
        customer_email: currentUser.email,
        customer_account_id: `${Date.now()}`,
        order_description: `${plan} subscription`,
        order_id: `${Date.now()}`,
        platform: "WEB",
        geo_country: "ESP",
        type: "auth",
        amount: amount,
        form_design_name: "form-design",
        product_price_id: solidgatePriceId,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
        fail_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription?canceled=true`,
      });

      return {
        gateway: "solidgate",
        merchantData: merchantData.toObject(),
      };
    }

    return { url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard` };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error("Failed to create checkout session");
  }
}
