import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { ApiResponse } from '@/lib/types';

/**
 * GET /api/products/related
 * Purpose: Get related products from the same category
 * Query params:
 *   - productId: ID of the current product
 *   - categoryId: ID of the category to find related products from
 *   - limit: Maximum number of related products to return
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('productId');
    const categoryId = searchParams.get('categoryId');
    const limitParam = searchParams.get('limit') || '4';
    
    if (!productId || !categoryId) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Product ID and Category ID are required',
      }, { status: 400 });
    }
    
    const limit = parseInt(limitParam, 10);
    
    // Get related products from the same category, excluding the current product
    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: parseInt(categoryId, 10),
        id: { not: parseInt(productId, 10) },
        isActive: true,
      },
      include: {
        variants: {
          where: { isActive: true },
        },
      },
      take: limit,
    });
    
    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: {
        products: relatedProducts,
      },
    });
  } catch (error) {
    console.error('Error fetching related products:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch related products',
    }, { status: 500 });
  }
}