import { NextRequest, NextResponse } from 'next/server';
import productService from '@/lib/services/productService';
import { ApiResponse } from '@/lib/types';

/**
 * GET /api/products/category
 * Purpose: Get filtered and paginated products for a category
 * Query params:
 *   - categoryId: ID of category
 *   - page: Page number (1-based)
 *   - limit: Number of products per page
 *   - sort: Sort field (e.g., 'price', 'name')
 *   - order: Sort direction ('asc' or 'desc')
 *   - includeSubcategories: Whether to include products from subcategories
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
    
    // Get pagination parameters
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    
    // Get sorting parameters
    const sort = searchParams.get('sort') || 'basePrice';
    const order = searchParams.get('order') || 'asc';
    
    // Check if we should include subcategory products
    const includeSubcategories = searchParams.get('includeSubcategories') !== 'false';
    
    // Get products for this category
    const products = await productService.getProductsForCategory(
      categoryId, 
      includeSubcategories
    );
    
    // Apply manual sorting
    // This is a simple implementation - in a real app, you'd want to do this at the database level
    const sortedProducts = [...products].sort((a, b) => {
      if (sort === 'name') {
        return order === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      
      // Sort by price (using first variant)
      if (sort === 'price') {
        const priceA = a.variants[0]?.basePrice || 0;
        const priceB = b.variants[0]?.basePrice || 0;
        
        return order === 'asc'
          ? Number(priceA) - Number(priceB)
          : Number(priceB) - Number(priceA);
      }
      
      return 0;
    });
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
    
    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: {
        products: paginatedProducts,
        pagination: {
          total: products.length,
          page,
          limit,
          totalPages: Math.ceil(products.length / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch products',
    }, { status: 500 });
  }
}