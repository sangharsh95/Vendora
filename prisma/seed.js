const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fetching 100 real products from API...');
  
  // Fetch 100 products from a free dummy data API
  const res = await fetch('https://dummyjson.com/products?limit=100');
  const data = await res.json();
  const apiProducts = data.products;

  console.log('Seeding database...');

  // 1. Create a dummy User (Buyer)
  const user = await prisma.user.upsert({
    where: { id: 'user_123' },
    update: {},
    create: {
      id: 'user_123',
      name: 'Sangarch',
      email: 'sangarch@example.com',
      image: 'https://i.pravatar.cc/150?u=sangarch',
      cart: JSON.stringify({}),
    },
  });

  // 2. Create a dummy Store (Seller)
  const storeUser = await prisma.user.upsert({
    where: { id: 'seller_user_123' },
    update: {},
    create: {
      id: 'seller_user_123',
      name: 'Jane Store',
      email: 'jane@example.com',
      image: 'https://i.pravatar.cc/150?u=jane',
    }
  });

  const store = await prisma.store.upsert({
    where: { userId: 'seller_user_123' },
    update: {},
    create: {
      id: 'store_123',
      userId: 'seller_user_123',
      name: 'GoCart Premium Store',
      description: 'The best premium tech gadgets on the market.',
      username: 'gocartpremium',
      address: '123 Tech Lane, Silicon Valley',
      status: 'approved',
      isActive: true,
      logo: 'https://ui-avatars.com/api/?name=Premium+Store',
      email: 'store@gocart.com',
      contact: '+1-555-0000',
    }
  });

  // Clear existing products to prevent duplicates
  await prisma.product.deleteMany({});

  // 3. Map API products to our database schema
  const productsToInsert = apiProducts.map(p => ({
    name: p.title,
    description: p.description,
    mrp: Math.round(p.price * 1.3), // Fake 30% markup for MRP
    price: p.price,
    images: p.images, // DummyJSON provides an array of image URLs
    category: p.category,
    storeId: store.id,
  }));

  // Batch insert all 100 products
  await prisma.product.createMany({
    data: productsToInsert
  });

  console.log(`Successfully seeded ${productsToInsert.length} products!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
