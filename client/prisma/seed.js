const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  try {
    // Read products data from JSON file
    const rawData = fs.readFileSync(
      path.join(__dirname, './seed-data/products.json'),
      'utf8'
    );
    const data = JSON.parse(rawData);

    console.log('Seeding database...');

    // Create categories
    console.log('Creating categories...');
    for (const category of data.categories) {
      await prisma.category.upsert({
        where: { name: category.name },
        update: { description: category.description },
        create: {
          name: category.name,
          description: category.description,
          isActive: true,
        },
      });
      console.log(`Created category: ${category.name}`);
    }

    // Create products
    console.log('Creating products...');
    for (const product of data.products) {
      // Find the category
      const category = await prisma.category.findUnique({
        where: { name: product.categoryName },
      });

      if (!category) {
        console.warn(`Category ${product.categoryName} not found, skipping product ${product.name}`);
        continue;
      }

      // Calculate affiliate price (25% discount)
      const affiliatePrice = product.price * 0.75;

      await prisma.product.upsert({
        where: { sku: product.sku },
        update: {
          name: product.name,
          description: product.description,
          price: product.price,
          affiliatePrice: affiliatePrice,
          images: product.images,
          stock: product.stock,
          categoryId: category.id,
        },
        create: {
          sku: product.sku,
          name: product.name,
          description: product.description,
          price: product.price,
          affiliatePrice: affiliatePrice,
          images: product.images,
          stock: product.stock,
          categoryId: category.id,
          isActive: true,
        },
      });
      console.log(`Created product: ${product.name}`);
    }

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });