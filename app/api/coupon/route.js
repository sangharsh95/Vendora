import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { code, totalAmount } = body;

        if (!code) {
            return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
        }

        const coupon = await prisma.coupon.findUnique({
            where: { code: code.toUpperCase() }
        });

        if (!coupon) {
            return NextResponse.json({ error: 'Invalid coupon code' }, { status: 404 });
        }

        // Check if expired
        if (new Date(coupon.expiresAt) < new Date()) {
            return NextResponse.json({ error: 'Coupon has expired' }, { status: 400 });
        }

        // Check minimum purchase amount
        if (coupon.minPurchase && totalAmount < coupon.minPurchase) {
            const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
            return NextResponse.json({ error: `Minimum purchase of ${currency}${coupon.minPurchase} required` }, { status: 400 });
        }

        // Check if user is logged in for specific checks
        const session = await getServerSession(authOptions);
        
        // Example logic for "New User" coupon (assuming we can check if they have previous orders)
        if (coupon.forNewUser) {
            if (!session || !session.user) {
                return NextResponse.json({ error: 'You must be logged in to use this coupon' }, { status: 401 });
            }
            
            const previousOrders = await prisma.order.count({
                where: { userId: session.user.id }
            });
            
            if (previousOrders > 0) {
                return NextResponse.json({ error: 'This coupon is only for new users' }, { status: 400 });
            }
        }

        // Coupon is valid! Return it.
        return NextResponse.json({ coupon });
    } catch (error) {
        console.error('Coupon validation error:', error);
        return NextResponse.json({ error: 'Failed to validate coupon' }, { status: 500 });
    }
}
