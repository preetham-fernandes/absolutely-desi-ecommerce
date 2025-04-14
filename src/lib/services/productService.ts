import { Category } from '@prisma/client';
import { productRepo, ProductWithVariants } from '../db/repositories/productRepo';
import categoryRepo from '../db/repositories/categoryRepo';
import prisma from '../db/prisma';

export const productService = {
  /**
   * Get all products for a category and optionally its subcategories
   */
  getProductsForCategory: async (
    categoryId: number, 
    includeSubcategories = true
  ): Promise<ProductWithVariants[]> => {
    if (!includeSubcategories) {
      // If we don't need subcategory products, just fetch for this category
      return productRepo.getProductsByCategory(categoryId);
    }
    
    // Get all subcategories recursively
    const categoryIds = await getAllCategoryIds(categoryId);
    
    // Get products for all categories
    return productRepo.getProductsByCategories(categoryIds);
  },
  
  /**
   * Get a product by its slug
   */
  getProductBySlug: async (slug: string): Promise<ProductWithVariants | null> => {
    return productRepo.getProductBySlug(slug);
  },
  
  /**
   * Get a product by its ID with variants
   */
  getProductById: async (id: number): Promise<ProductWithVariants | null> => {
    return prisma.product.findUnique({
      where: { id },
      include: {
        variants: {
          where: { isActive: true },
        },
      },
    });
  },
  
  /**
   * Get related products from the same category
   */
  getRelatedProducts: async (
    productId: number, 
    categoryId: number, 
    limit = 4
  ): Promise<ProductWithVariants[]> => {
    return prisma.product.findMany({
      where: {
        categoryId,
        id: { not: productId },
        isActive: true,
      },
      include: {
        variants: {
          where: { isActive: true },
        },
        category: true,
      },
      take: limit,
    });
  },
  
  /**
   * Get a product with full details, including category information
   */
  getProductDetails: async (slug: string) => {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        variants: {
          where: { isActive: true },
        },
        category: {
          include: {
            parent: true,
          },
        },
        attributes: true,
      },
    });
  },
};

/**
 * Helper function to get all subcategory IDs recursively
 */
async function getAllCategoryIds(categoryId: number): Promise<number[]> {
  const result: number[] = [categoryId];
  
  // Get immediate subcategories
  const subcategories = await categoryRepo.getSubcategories(categoryId);
  
  // For each subcategory, recursively get its subcategories
  for (const subcategory of subcategories) {
    const subIds = await getAllCategoryIds(subcategory.id);
    result.push(...subIds);
  }
  
  return result;
}

export default productService;