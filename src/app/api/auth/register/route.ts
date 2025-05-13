// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { ApiResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, password } = body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    });
    
    if (existingUser) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'User with this email or phone already exists',
      }, { status: 400 });
    }
    
    // In a real app, you would hash the password
    // For this simple implementation, we'll store it as is
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash: password, // In production, hash this password
        isAffiliate: true, // For development, set everyone as affiliate
      }
    });
    
    // Generate a dummy OTP for verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP expires in 10 minutes
    
    await prisma.otpVerification.create({
      data: {
        userId: user.id,
        otp,
        expiresAt
      }
    });
    
    // Return the user (without password) and OTP (only for development)
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
        otp // Only for development purposes
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error registering user:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to register user',
    }, { status: 500 });
  }
}