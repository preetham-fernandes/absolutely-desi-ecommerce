// src/app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { ApiResponse } from '@/lib/types';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Get the session cookie
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Not authenticated',
      }, { status: 401 });
    }
    
    // Decode the session token
    const sessionToken = sessionCookie.value;
    const decodedToken = Buffer.from(sessionToken, 'base64').toString('utf-8');
    const [userId] = decodedToken.split(':');
    
    if (!userId) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Invalid session',
      }, { status: 401 });
    }
    
    // Find user by id
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId, 10) }
    });
    
    if (!user) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'User not found',
      }, { status: 404 });
    }
    
    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isAffiliate: user.isAffiliate
        }
      }
    });
    
  } catch (error) {
    console.error('Error getting current user:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to get current user',
    }, { status: 500 });
  }
}