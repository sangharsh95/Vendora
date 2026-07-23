const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    const coupons = [
        { code: "SAVE10ON100", description: "10% Off on purchases over $100 (or equivalent)", discount: 10, forNewUser: false, isPublic: true, minPurchase: 100, expiresAt },
        { code: "SAVE15ON150", description: "15% Off on purchases over $150 (or equivalent)", discount: 15, forNewUser: false, isPublic: true, minPurchase: 150, expiresAt },
    ];

    console.log("Seeding minimum purchase coupons...");
    
    for (const c of coupons) {
        await prisma.coupon.upsert({
            where: { code: c.code },
            update: c,
            create: c
        });
    }

    console.log("Successfully seeded minimum purchase coupons!");
}

run()
  .catch(e => {
      console.error(e);
      process.exit(1);
  })
  .finally(async () => {
      await prisma.$disconnect();
  });
