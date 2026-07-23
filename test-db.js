const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const wishlists = await prisma.wishlist.findMany({ take: 1 });
    console.log("Database connection successful. Wishlist table exists.");
  } catch (error) {
    console.error("Database Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
