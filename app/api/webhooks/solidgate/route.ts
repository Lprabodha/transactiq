import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
    try {
        const payload = await req.text();
        if (!payload) return NextResponse.json({ error: 'Empty payload' }, { status: 400 });

        const data = JSON.parse(payload);
        if (!data || typeof data !== 'object') {
            return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
        }

        if ('callback_type' in data) {
            await handleCallbackType(data);
        } else {
            await handleNonCallbackType(data);
        }

        return NextResponse.json({ message: 'OK' });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

async function handleNonCallbackType(data: any) {
    const { order, order_metadata } = data;

    if (order_metadata?.plan_id === 5 && ['auth_ok', 'approved'].includes(order?.status)) {
        await createOneTimePayment(data);
    }
}

async function handleCallbackType(data: any) {
    const { callback_type } = data;

    switch (callback_type) {
        case 'active':
            await subscriptionActive(data);
            break;
        case 'renew':
            await subscriptionRenew(data);
            break;
        default:
            console.warn('⚠️ Unknown callback_type:', callback_type);
            break;
    }
}

async function createOneTimePayment(data: any) {
    console.log('One-time payment event received:', data);
}

async function subscriptionActive(data: any) {

    const email = data?.customer?.customer_email;
    const productId = data?.product?.product_id;

    if (!email || !productId) {
        console.warn('Missing email or product_id in webhook data');
        return;
    }

    const client = await clientPromise;
    const db = client.db('transactIQ');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email });

    if (!user) {
        console.warn(`No user found for email: ${email}`);
        return;
    }

    let plan_id: number | null = null;
    const expirationDate = new Date();

    switch (productId) {
        case process.env.SOLIDGATE_PRICE_1_ID:
            plan_id = 1;
            expirationDate.setMonth(expirationDate.getMonth() + 1);
            break;
        case process.env.SOLIDGATE_PRICE_3_ID:
            plan_id = 2;
            expirationDate.setMonth(expirationDate.getMonth() + 3);
            break;
        case process.env.SOLIDGATE_PRICE_12_ID:
            plan_id = 3;
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
            break;
        default:
            console.warn(`Unknown productId: ${productId}`);
            return;
    }

    await usersCollection.updateOne(
        { _id: new ObjectId(user._id) },
        {
            $set: {
                plan_id,
                plan_expire_date: expirationDate,
                payment_processor: 'solidgate',
                updatedAt: new Date(),
            },
        }
    );

    console.log(`User ${user._id} updated to plan_id ${plan_id}`);
}

async function subscriptionRenew(data: any) {
    const email = data?.customer?.customer_email;
    const productId = data?.product?.product_id;

    if (!email || !productId) {
        console.warn('Missing email or product_id in webhook data');
        return;
    }

    const client = await clientPromise;
    const db = client.db('transactIQ');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email });

    if (!user) {
        console.warn(`No user found for email: ${email}`);
        return;
    }

    let plan_id: number | null = null;
    const expirationDate = new Date();

    switch (productId) {
        case process.env.SOLIDGATE_PRICE_1_ID:
            plan_id = 1;
            expirationDate.setMonth(expirationDate.getMonth() + 1);
            break;
        case process.env.SOLIDGATE_PRICE_3_ID:
            plan_id = 2;
            expirationDate.setMonth(expirationDate.getMonth() + 3);
            break;
        case process.env.SOLIDGATE_PRICE_12_ID:
            plan_id = 3;
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
            break;
        default:
            console.warn(`Unknown productId: ${productId}`);
            return;
    }

    await usersCollection.updateOne(
        { _id: new ObjectId(user._id) },
        {
            $set: {
                plan_id,
                plan_expire_date: expirationDate,
                payment_processor: 'solidgate',
                updatedAt: new Date(),
            },
        }
    );

    console.log(`User ${user._id} updated to plan_id ${plan_id}`);
}

