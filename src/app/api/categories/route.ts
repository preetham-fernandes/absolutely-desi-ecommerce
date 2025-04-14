import { NextRequest, NextResponse } from 'next/server';
import categoryService from '@/lib/services/categoryService';
import { ApiResponse } from '@/lib/types';

/**
 * GET /api/categories
 * Purpose: Get subcategories for a given category
 * Query params:
 *   - id: category ID to fetch subcategories for
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('id');
    
    if (!categoryId) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Category ID is required',
      }, { status: 400 });
    }
    
    const subcategories = await categoryService.getSubcategories(parseInt(categoryId, 10));
    
    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: {
        subcategories,
      },
    });
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch subcategories',
    }, { status: 500 });
  }
}