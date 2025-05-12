import ProductCard from '@/components/ProductCard';
import prisma from '@/lib/db/prisma';
import { ThemeToggle } from '@/components/providers/theme-toggle';

// This would be replaced by your actual authentication check
// For now, we'll use a dummy function that always returns false
async function getIsAffiliate() {
  // This would check session/auth in a real implementation
  // For now, isAffiliate is always false as per requirements
  return true;
}

export default async function ProductsGrid() {
  // Get all active products with their categories
  const productsFromDb = await prisma.product.findMany({
    where: {
      isActive: true,
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
      name: 'asc',
    },
  });

  // Convert Prisma Decimal objects to JavaScript numbers
  const products = productsFromDb.map(product => ({
    ...product,
    sku: product.variants[0]?.sku || '',
    images: product.variants[0]?.imageUrls ? JSON.parse(product.variants[0].imageUrls as string) : [],
    stock: product.variants[0]?.quantity || 0,
    price: Number(product.variants[0]?.basePrice || 0),
    affiliatePrice: Number(product.variants[0]?.basePrice || 0) // For now, using same price
  }));

  // Check if user is an affiliate
  const isAffiliate = await getIsAffiliate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       <div className="flex justify-end mb-6">
                <ThemeToggle />
              </div>
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