// src/app/api/admin/products/process-resume/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/lib/types';
import { resumeProcessing } from '@/lib/services/fileUpload/processor';

/**
 * POST /api/admin/products/process-resume
 * Purpose: Resume a timed out processing job
 * Body (JSON):
 *   - sessionId: ID of the processing session
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body;
    
    if (!sessionId) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Session ID is required',
      }, { status: 400 });
    }
    
    // Resume processing in background
    resumeProcessing(sessionId)
      .then(() => {
        console.log(`Processing resumed for session ${sessionId}`);
      })
      .catch((error) => {
        console.error(`Resuming processing failed for session ${sessionId}:`, error);
      });
    
    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: {
        message: 'Processing resumed',
        sessionId,
      },
    });
    
  } catch (error) {
    console.error('Error resuming processing:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to resume processing',
    }, { status: 500 });
  }
}