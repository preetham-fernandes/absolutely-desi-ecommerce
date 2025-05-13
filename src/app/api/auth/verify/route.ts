// src/app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { ApiResponse } from '@/lib/types';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = body;
    
    // Find user by email with minimal fields
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isAffiliate: true,
        otpVerification: {
          select: {
            otp: true,
            expiresAt: true
          }
        }
      }
    });
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found',
      }, { status: 404 });
    }
    
    // Check if OTP exists and is valid
    if (!user.otpVerification || user.otpVerification.otp !== otp) {
      return NextResponse.json({
        success: false,
        error: 'Invalid OTP',
      }, { status: 400 });
    }
    
    // Check if OTP is expired
    if (new Date() > user.otpVerification.expiresAt) {
      return NextResponse.json({
        success: false,
        error: 'OTP expired',
      }, { status: 400 });
    }
    
    // Delete the OTP verification record
    await prisma.otpVerification.delete({
      where: { userId: user.id }
    });
    
    // Create a simpler session token
    const sessionToken = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
    
    // Set a cookie with the session token
    const cookieStore = cookies();
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    // Return minimal user data
    return NextResponse.json({
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
    console.error('Error verifying OTP:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to verify OTP',
    }, { status: 500 });
  }
}