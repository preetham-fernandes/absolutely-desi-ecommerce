import { Category } from '@prisma/client';
import categoryRepo from '../db/repositories/categoryRepo';

export type CategoryWithPath = {
  category: Category;
  path: Category[];
};

export const categoryService = {
  /**
   * Resolve a category from the URL slug array
   * Handles nested paths like /women/saree -> ['women', 'saree']
   */
  getCategoryFromPath: async (slugs: string[]): Promise<CategoryWithPath | null> => {
    // Get the last slug in the array which should be our target category
    const targetSlug = slugs[slugs.length - 1];
    
    // Find the category by slug
    const category = await categoryRepo.getCategoryBySlug(targetSlug);
    
    if (!category) {
      return null;
    }
    
    // Get the full category path for breadcrumbs
    const path = await categoryRepo.getCategoryPath(category.id);
    
    // Validate that the path matches our slugs
    // This ensures we're not accessing a category through an invalid path
    const pathSlugs = path.map(cat => cat.slug);
    
    // Check if the provided path is valid for this category
    // (we allow both direct access to the category and through its full path)
    const isValidPath = pathSlugs.length === slugs.length && 
      pathSlugs.every((slug, index) => slug === slugs[index]);
    
    const isDirectAccess = slugs.length === 1 && slugs[0] === category.slug;
    
    if (!isValidPath && !isDirectAccess) {
      return null;
    }
    
    return {
      category,
      path,
    };
  },

  /**
   * Get all subcategories for a category
   */
  getSubcategories: async (categoryId: number): Promise<Category[]> => {
    return categoryRepo.getSubcategories(categoryId);
  },

  /**
   * Gets a category with its subcategories
   */
  getCategoryWithSubcategories: async (categoryId: number) => {
    return categoryRepo.getCategoryWithSubcategories(categoryId);
  }
};

export default categoryService;