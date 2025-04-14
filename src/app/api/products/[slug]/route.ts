import { NextRequest, NextResponse } from 'next/server';
import productService from '@/lib/services/productService';
import { ApiResponse } from '@/lib/types';

/**
 * GET /api/products/[slug]
 * Purpose: Get detailed information about a specific product
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Product slug is required',
      }, { status: 400 });
    }
    
    // Get product details
    const product = await productService.getProductBySlug(slug);
    
    if (!product) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Product not found',
      }, { status: 404 });
    }
    
    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: {
        product,
      },
    });
  } catch (error) {
    console.error('Error fetching product details:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch product details',
    }, { status: 500 });
  }
}