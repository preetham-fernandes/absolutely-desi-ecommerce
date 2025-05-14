// src/app/api/admin/products/process-status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/lib/types';
import { getProcessingStatus } from '@/lib/services/fileUpload/processor';

/**
 * GET /api/admin/products/process-status
 * Purpose: Check the status of a processing job
 * Query params:
 *   - sessionId: ID of the processing session
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('sessionId');
    
    if (!sessionId) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Session ID is required',
      }, { status: 400 });
    }
    
    // Get processing status
    const status = await getProcessingStatus(sessionId);
    
    if (!status) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Processing session not found',
      }, { status: 404 });
    }
    
    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: status,
    });
    
  } catch (error) {
    console.error('Error checking processing status:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to check processing status',
    }, { status: 500 });
  }
}