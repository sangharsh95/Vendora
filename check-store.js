const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
    const stores = await prisma.store.findMany();
    console.log("Stores:", stores);
    
    // Check if store_123 exists
    const store123 = await prisma.store.findUnique({ where: { id: 'store_123' } });
    console.log("store_123 exists:", !!store123);
}
run();
