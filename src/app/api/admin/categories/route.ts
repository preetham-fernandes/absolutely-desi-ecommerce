// src/app/api/admin/categories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { ApiResponse } from '@/lib/types';

/**
 * GET /api/admin/categories
 * Purpose: Get all categories for admin purposes (including inactive)
 */
export async function GET(request: NextRequest) {
  try {
    // Fetch all categories
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        parentId: true,
        isActive: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    
    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: {
        categories,
      },
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to fetch categories',
    }, { status: 500 });
  }
}