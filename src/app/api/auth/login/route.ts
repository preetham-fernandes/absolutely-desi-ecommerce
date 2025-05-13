// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { ApiResponse } from '@/lib/types';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Invalid email or password',
      }, { status: 401 });
    }
    
    // In a real app, you would compare hashed passwords
    // For this simple implementation, we'll compare directly
    if (user.passwordHash !== password) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Invalid email or password',
      }, { status: 401 });
    }
    
    // Create a session token (very basic, just for development)
    const sessionToken = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
    
    // Set a cookie with the session token
    const cookieStore = cookies();
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isAffiliate: user.isAffiliate
        },
        sessionToken // Only for development
      }
    });
    
  } catch (error) {
    console.error('Error logging in:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to log in',
    }, { status: 500 });
  }
}