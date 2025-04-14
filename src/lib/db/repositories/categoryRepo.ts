import prisma from '../prisma';
import { Category } from '@prisma/client';

export const categoryRepo = {
  /**
   * Get a category by its slug
   */
  getCategoryBySlug: async (slug: string): Promise<Category | null> => {
    return prisma.category.findUnique({
      where: { slug },
    });
  },

  /**
   * Get a category with its subcategories
   */
  getCategoryWithSubcategories: async (categoryId: number): Promise<Category | null> => {
    return prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        subcategories: {
          where: { isActive: true },
        },
      },
    });
  },

  /**
   * Get all subcategories for a parent category
   */
  getSubcategories: async (parentId: number): Promise<Category[]> => {
    return prisma.category.findMany({
      where: { 
        parentId,
        isActive: true,
      },
    });
  },

  /**
   * Get full category path (breadcrumb)
   */
  getCategoryPath: async (categoryId: number): Promise<Category[]> => {
    const path: Category[] = [];
    let currentCategoryId = categoryId;
    
    // Get the current category and all its parents recursively
    while (currentCategoryId) {
      const category = await prisma.category.findUnique({
        where: { id: currentCategoryId },
      });
      
      if (!category) break;
      
      path.unshift(category); // Add to beginning of array
      
      if (!category.parentId) break;
      currentCategoryId = category.parentId;
    }
    
    return path;
  },
};

export default categoryRepo;