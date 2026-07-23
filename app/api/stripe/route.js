import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecretKey);
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { items, totalAmount, address, coupon } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        const session = await getServerSession(authOptions);
        
        let userId = 'user_123'; // fallback for testing
        if (session && session.user) {
            userId = session.user.id;
        }

        const addressId = address?.id || `addr_${Date.now()}`; 

        await prisma.address.upsert({
            where: { id: addressId },
            update: {},
            create: {
                id: addressId,
                userId: userId,
                name: address?.name || 'John Doe',
                email: address?.email || 'john@example.com',
                street: address?.street || '123 Tech Park',
                city: address?.city || 'San Francisco',
                state: address?.state || 'CA',
                zip: address?.zip || '12345',
                country: address?.country || 'USA',
                phone: address?.phone || '+1-555-0123'
            }
        });

        // Find storeId from the first item
        const firstItem = await prisma.product.findUnique({
            where: { id: items[0].id },
            select: { storeId: true }
        });
        
        const storeId = firstItem?.storeId || "cmrfu67bb0000r07okdkkyexv";

        // Create Order in DB (with isPaid: false)
        const order = await prisma.order.create({
            data: {
                userId: userId,
                storeId: storeId,
                addressId: addressId,
                total: totalAmount || 0,
                paymentMethod: 'STRIPE',
                isPaid: false,
                ...(coupon && { coupon: coupon })
            }
        });

        for (const item of items) {
            await prisma.orderItem.create({
                data: {
                    orderId: order.id,
                    productId: item.id,
                    quantity: item.quantity || 1,
                    price: item.price
                }
            });
        }

        // Format items for Stripe Checkout
        const discountMultiplier = coupon ? (1 - (coupon.discount / 100)) : 1;

        const lineItems = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    // Stripe requires absolute URLs. Since assets might be local Next.js imports or objects, we omit images to prevent crashes.
                },
                unit_amount: Math.round(item.price * discountMultiplier * 100), // Stripe expects amounts in cents, apply discount
            },
            quantity: item.quantity || 1,
        }));

        // Create Checkout Session
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/orders?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cart?canceled=true`,
            metadata: {
                orderId: order.id
            }
        });

        return NextResponse.json({ id: stripeSession.id, url: stripeSession.url });

    } catch (error) {
        console.error('Stripe error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
