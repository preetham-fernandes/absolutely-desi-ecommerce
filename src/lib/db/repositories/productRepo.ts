import prisma from '../prisma';
import { Product, ProductVariant } from '@prisma/client';

export type ProductWithVariants = Product & {
  variants: ProductVariant[];
};

export const productRepo = {
  /**
   * Get products by category ID
   */
  getProductsByCategory: async (categoryId: number): Promise<ProductWithVariants[]> => {
    return prisma.product.findMany({
      where: {
        categoryId,
        isActive: true,
      },
      include: {
        variants: {
          where: { isActive: true },
        },
      },
    });
  },

  /**
   * Get products for multiple category IDs (useful for showing products from subcategories)
   */
  getProductsByCategories: async (categoryIds: number[]): Promise<ProductWithVariants[]> => {
    return prisma.product.findMany({
      where: {
        categoryId: { in: categoryIds },
        isActive: true,
      },
      include: {
        variants: {
          where: { isActive: true },
        },
      },
    });
  },

  /**
   * Get a single product by slug with its variants
   */
  getProductBySlug: async (slug: string): Promise<ProductWithVariants | null> => {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        variants: {
          where: { isActive: true },
        },
      },
    });
  },
};

export default productRepo;