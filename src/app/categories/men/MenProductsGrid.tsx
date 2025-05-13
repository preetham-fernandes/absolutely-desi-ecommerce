import ProductCard from '@/components/ProductCard';
import prisma from '@/lib/db/prisma';

// Function to check if user is an affiliate - always returns true for now
async function getIsAffiliate() {
  return true;
}

export default async function MenProductsGrid() {
  // Get men's category ID - In a real implementation you'd have a proper lookup
  const menCategory = await prisma.category.findFirst({
    where: {
      slug: "men", // or the appropriate slug for men's category
    },
  });

  // Get all active products with their categories that are in the men's category or its subcategories
  const productsFromDb = await prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        { categoryId: menCategory?.id }, // Direct category match
        { 
          category: {
            parentId: menCategory?.id // Subcategory match
          }
        }
      ]
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      variants: {
        where: {
          isActive: true,
        },
        take: 1, // Get the first active variant
      },
    },
    orderBy: {
      createdAt: 'desc', // Show newest first
    },
    take: 8, // Limit to 8 products for the featured section
  });

  // Convert Prisma Decimal objects to JavaScript numbers
  const products = productsFromDb.map(product => ({
    ...product,
    sku: product.variants[0]?.sku || '',
    images: product.variants[0]?.imageUrls ? JSON.parse(product.variants[0].imageUrls as string) : [],
    stock: product.variants[0]?.quantity || 0,
    price: Number(product.variants[0]?.basePrice || 0),
    affiliatePrice: Number(product.variants[0]?.basePrice || 0) * 0.75 // 25% off for affiliates
  }));

  // Check if user is an affiliate
  const isAffiliate = await getIsAffiliate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isAffiliate={isAffiliate}
        />
      ))}
    </div>
  );
}