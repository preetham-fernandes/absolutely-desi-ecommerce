import ProductCard from '@/components/ProductCard';
import prisma from '@/lib/prisma';

// This would be replaced by your actual authentication check
// For now, we'll use a dummy function that always returns false
async function getIsAffiliate() {
  // This would check session/auth in a real implementation
  // For now, isAffiliate is always false as per requirements
  return false;
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
    },
    orderBy: {
      name: 'asc',
    },
  });

  // Convert Prisma Decimal objects to JavaScript numbers
  const products = productsFromDb.map(product => ({
    ...product,
    price: Number(product.price),
    affiliatePrice: Number(product.affiliatePrice)
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