import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
        return new NextResponse("Missing Stripe Signature", { status: 400 });
    }

    let event;

    try {
        const rawBody = await req.text();
        event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET || ""
        );
    } catch (err) {
        console.error("Webhook error:", err);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === "invoice.paid") {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const client = await clientPromise;
        const db = client.db("transactIQ");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ stripe_customer_id: customerId });

        if (user) {
            let expirationDate = new Date();
            let planId = 0;
            const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
            const priceId = subscription.items.data[0].plan.id;

            switch (priceId) {
                case process.env.STRIPE_PRICE_1_ID:
                    planId = 1;
                    expirationDate.setMonth(expirationDate.getMonth() + 1);
                    break;
                case process.env.STRIPE_PRICE_3_ID:
                    planId = 2;
                    expirationDate.setMonth(expirationDate.getMonth() + 3);
                    break;
                case process.env.STRIPE_PRICE_12_ID:
                    planId = 3;
                    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
                    break;
            }

            await usersCollection.updateOne(
                { _id: new ObjectId(user._id) },
                {
                    $set: {
                        plan_id: planId,
                        plan_expire_date: expirationDate,
                        updatedAt: new Date(),
                    },
                }
            );

            console.log(`Updated user ${user._id} with new plan details`);
        }
    }

    return new NextResponse("Success", { status: 200 });
}
