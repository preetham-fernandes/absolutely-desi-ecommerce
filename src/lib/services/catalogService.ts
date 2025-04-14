import { ProductWithVariants } from '../db/repositories/productRepo';
import catalogDownloadRepo from '../db/repositories/catalogDownloadRepo';
import productService from './productService';
import prisma from '../db/prisma';

export const catalogService = {
  /**
   * Track a catalog download (userId is required by schema)
   * If no userId is provided, we simply don't track the download
   */
  trackDownload: async (
    catalogType: string,
    ipAddress?: string,
    userId?: number
  ) => {
    // Only track downloads if we have a userId (required by schema)
    if (userId) {
      return catalogDownloadRepo.createDownloadRecord({
        userId,
        catalogType,
        ipAddress,
      });
    }
    
    // Return a resolved promise if no tracking is done
    return Promise.resolve();
  },

  /**
   * Get products for a catalog by category
   */
  getProductsForCatalog: async (categoryId: number): Promise<ProductWithVariants[]> => {
    // Get all products from this category and its subcategories
    return productService.getProductsForCategory(categoryId, true);
  },

  /**
   * Generate catalog name based on category
   */
  generateCatalogName: async (categoryId: number): Promise<string> => {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    
    if (!category) {
      return 'AbsolutelyDesi-Catalog';
    }
    
    return `AbsolutelyDesi-${category.name.replace(/\s+/g, '-')}-Catalog`;
  }
};

export default catalogService;