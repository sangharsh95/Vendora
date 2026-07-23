import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const wishlist = await prisma.wishlist.findMany({
            where: { userId: session.user.id },
            include: { product: true }
        });

        return NextResponse.json(wishlist);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { productId } = body;

        if (!productId) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        // Check if already in wishlist
        const existing = await prisma.wishlist.findUnique({
            where: {
                userId_productId: {
                    userId: session.user.id,
                    productId: productId
                }
            }
        });

        if (existing) {
            // Remove from wishlist
            await prisma.wishlist.delete({
                where: { id: existing.id }
            });
            return NextResponse.json({ message: 'Removed from wishlist', action: 'removed' });
        } else {
            // Add to wishlist
            const newWishlistItem = await prisma.wishlist.create({
                data: {
                    userId: session.user.id,
                    productId: productId
                }
            });
            return NextResponse.json({ message: 'Added to wishlist', action: 'added', item: newWishlistItem });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update wishlist' }, { status: 500 });
    }
}
