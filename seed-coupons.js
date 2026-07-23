const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1); // Valid for 1 year

    const coupons = [
        { code: "NEW45", description: "45% Off for New Users", discount: 45, forNewUser: true, isPublic: true, expiresAt },
        { code: "SAVE10", description: "10% Off Everything", discount: 10, forNewUser: false, isPublic: true, expiresAt },
        { code: "DISCOUNT10", description: "10% Off Flash Sale", discount: 10, forNewUser: false, isPublic: true, expiresAt },
        { code: "DISCOUNT15", description: "15% Off Flash Sale", discount: 15, forNewUser: false, isPublic: true, expiresAt },
        { code: "DISCOUNT20", description: "20% Off Flash Sale", discount: 20, forNewUser: false, isPublic: true, expiresAt },
        { code: "DISCOUNT25", description: "25% Off Flash Sale", discount: 25, forNewUser: false, isPublic: true, expiresAt },
        { code: "DISCOUNT30", description: "30% Off Flash Sale", discount: 30, forNewUser: false, isPublic: true, expiresAt },
        { code: "DISCOUNT35", description: "35% Off Flash Sale", discount: 35, forNewUser: false, isPublic: true, expiresAt },
        { code: "DISCOUNT40", description: "40% Off Flash Sale", discount: 40, forNewUser: false, isPublic: true, expiresAt },
        { code: "DISCOUNT45", description: "45% Off Flash Sale", discount: 45, forNewUser: false, isPublic: true, expiresAt },
        { code: "DISCOUNT50", description: "50% Off Flash Sale", discount: 50, forNewUser: false, isPublic: true, expiresAt },
        { code: "MEGA50", description: "Huge 50% Off Everything", discount: 50, forNewUser: false, isPublic: true, expiresAt },
    ];

    console.log("Seeding coupons...");
    
    for (const c of coupons) {
        await prisma.coupon.upsert({
            where: { code: c.code },
            update: c,
            create: c
        });
    }

    console.log("Successfully seeded coupons!");
}

run()
  .catch(e => {
      console.error(e);
      process.exit(1);
  })
  .finally(async () => {
      await prisma.$disconnect();
  });
