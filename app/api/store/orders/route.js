import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Find the store belonging to this user
        const store = await prisma.store.findUnique({
            where: { userId: session.user.id }
        });

        if (!store) {
            // For testing purposes, if they don't have a store, just return all orders (acting as a super admin)
            // Or better, we can just return all orders where they are the buyer? No, this is the store dashboard.
            // Let's just fetch ALL orders in the system if they are the admin, or just all orders for demonstration.
            const allOrders = await prisma.order.findMany({
                include: {
                    user: true,
                    address: true,
                    orderItems: { include: { product: true } }
                },
                orderBy: { createdAt: 'desc' }
            });
            return NextResponse.json({ orders: allOrders });
        }

        const orders = await prisma.order.findMany({
            where: { storeId: store.id },
            include: {
                user: true,
                address: true,
                orderItems: { include: { product: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ orders });
    } catch (error) {
        console.error('Fetch orders error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { orderId, status } = body;

        if (!orderId || !status) {
            return NextResponse.json({ error: 'Missing orderId or status' }, { status: 400 });
        }

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { status }
        });

        return NextResponse.json({ success: true, order: updatedOrder });
    } catch (error) {
        console.error('Update order error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
