// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ApiResponse } from '@/lib/types';

export async function POST() {
  try {
    // Delete the session cookie
    const cookieStore = cookies();
    cookieStore.delete('session');
    
    return NextResponse.json<ApiResponse<null>>({
      success: true,
      data: null
    });
    
  } catch (error) {
    console.error('Error logging out:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to log out',
    }, { status: 500 });
  }
}