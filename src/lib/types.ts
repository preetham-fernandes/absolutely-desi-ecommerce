import { Category, Product, ProductVariant } from '@prisma/client';

// Extended types with relationships
export type CategoryWithSubcategories = Category & {
  subcategories: Category[];
};

export type ProductWithCategory = Product & {
  category: Category;
};

export type ProductWithVariants = Product & {
  variants: ProductVariant[];
};

export type CompleteProduct = Product & {
  category: Category;
  variants: ProductVariant[];
};

// Helper type for API responses
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};