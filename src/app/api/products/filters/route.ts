import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { ApiResponse } from '@/lib/types';

/**
 * GET /api/products/filters
 * Purpose: Get available filters (sizes, colors, prices) for a category
 * Query params:
 *   - categoryId: ID of category to get filters for
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryIdParam = searchParams.get('categoryId');
    
    if (!categoryIdParam) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Category ID is required',
      }, { status: 400 });
    }
    
    const categoryId = parseInt(categoryIdParam, 10);
    
    if (isNaN(categoryId)) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Invalid category ID',
      }, { status: 400 });
    }
    
    // Get all subcategory IDs recursively (for broader filter options)
    const allCategoryIds = await getAllCategoryIds(categoryId);
    
    // Get all products in these categories
    const products = await prisma.product.findMany({
      where: {
        categoryId: { in: allCategoryIds },
        isActive: true,
      },
      include: {
        variants: {
          where: { isActive: true },
          select: {
            basePrice: true,
            size: true,
            color: true,
          },
        },
      },
    });
    
    // Extract unique filter values
    const sizes = new Set<string>();
    const colors = new Set<string>();
    let minPrice = Number.MAX_SAFE_INTEGER;
    let maxPrice = 0;
    
    products.forEach(product => {
      product.variants.forEach(variant => {
        // Add sizes (might be comma-separated)
        if (variant.size) {
          const sizeOptions = variant.size.split(',').map(s => s.trim());
          sizeOptions.forEach(size => sizes.add(size));
        }
        
        // Add colors
        if (variant.color) {
          colors.add(variant.color);
        }
        
        // Update price range
        const price = Number(variant.basePrice);
        if (price < minPrice) minPrice = price;
        if (price > maxPrice) maxPrice = price;
      });
    });
    
    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: {
        filters: {
          sizes: Array.from(sizes),
          colors: Array.from(colors),
          priceRange: {
            min: minPrice === Number.MAX_SAFE_INTEGER ? 0 : minPrice,
            max: maxPrice,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching product filters:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch product filters',
    }, { status: 500 });
  }
}

/**
 * Helper function to get all subcategory IDs recursively
 */
async function getAllCategoryIds(categoryId: number): Promise<number[]> {
  const result: number[] = [categoryId];
  
  // Get immediate subcategories
  const subcategories = await prisma.category.findMany({
    where: { 
      parentId: categoryId,
      isActive: true,
    },
    select: { id: true },
  });
  
  // For each subcategory, recursively get its subcategories
  for (const subcategory of subcategories) {
    const subIds = await getAllCategoryIds(subcategory.id);
    result.push(...subIds);
  }
  
  return result;
}