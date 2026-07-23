import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { items, totalAmount, address, coupon } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const userId = session.user.id;
    const addressId = address?.id || `addr_${Date.now()}`;

    // First ensure the dummy address exists
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

    const storeId = items[0]?.storeId || 'store_123';

    const order = await prisma.order.create({
      data: {
        userId: userId,
        storeId: storeId,
        addressId: addressId,
        total: totalAmount || 0,
        paymentMethod: 'COD',
        isPaid: false,
        ...(coupon && { coupon: coupon })
      }
    });

    // Create OrderItems and reduce stock
    for (const item of items) {
      const quantity = item.quantity || 1;
      
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.id,
          quantity: quantity,
          price: item.price
        }
      });

      // Update inventory stock
      try {
          await prisma.product.update({
              where: { id: item.id },
              data: {
                  stockQuantity: {
                      decrement: quantity
                  }
              }
          });
      } catch (err) {
          console.warn("Failed to update stock quantity for product", item.id, err);
      }
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to process checkout' }, { status: 500 });
  }
}
