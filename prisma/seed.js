const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  // Read the JSON seed file
  const seedFilePath = path.join(__dirname, './seed-data/category.json');
  const seedData = JSON.parse(fs.readFileSync(seedFilePath, 'utf8'));
  
  // Insert categories
  console.log('Seeding categories...');
  for (const category of seedData.categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        parentId: category.parent_id,
        isActive: true
      },
      create: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        parentId: category.parent_id,
        isActive: true
      }
    });
  }
  
  // Insert products
  console.log('Seeding products...');
  for (const product of seedData.products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        brand: product.brand,
        isActive: product.isActive,
        material: product.material,
        categoryId: product.categoryId
      },
      create: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        brand: product.brand,
        isActive: product.isActive,
        material: product.material,
        categoryId: product.categoryId
      }
    });
  }
  
  // Insert product variants
  console.log('Seeding product variants...');
  for (const variant of seedData.productVariants) {
    await prisma.productVariant.upsert({
      where: { id: variant.id },
      update: {
        productId: variant.productId,
        sku: variant.sku,
        quantity: variant.quantity,
        basePrice: variant.basePrice,
        imageUrls: variant.imageUrls,
        isActive: variant.isActive,
        size: variant.size,
        color: variant.color
      },
      create: {
        id: variant.id,
        productId: variant.productId,
        sku: variant.sku,
        quantity: variant.quantity,
        basePrice: variant.basePrice,
        imageUrls: variant.imageUrls,
        isActive: variant.isActive,
        size: variant.size,
        color: variant.color
      }
    });
  }
  
  console.log('Seeding completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });