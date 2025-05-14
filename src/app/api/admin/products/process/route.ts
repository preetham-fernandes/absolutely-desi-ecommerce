// src/app/api/admin/products/process/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/lib/types';
import { startProcessing } from '@/lib/services/fileUpload/processor';

/**
 * POST /api/admin/products/process
 * Purpose: Start processing validated product data
 * Body (JSON):
 *   - sessionId: ID of the validation session
 *   - proceedWithValid: Whether to proceed with only valid entries
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, proceedWithValid } = body;
    
    if (!sessionId) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Session ID is required',
      }, { status: 400 });
    }
    
    // In a real app, you would retrieve the validation results from a cache or database
    // For now, we'll simulate starting a processing job
    
    // Start processing in background
    // This would typically be done in a separate process or queue
    startProcessing(sessionId, proceedWithValid)
      .then(() => {
        console.log(`Processing completed for session ${sessionId}`);
      })
      .catch((error) => {
        console.error(`Processing failed for session ${sessionId}:`, error);
      });
    
    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: {
        message: 'Processing started',
        sessionId,
      },
    });
    
  } catch (error) {
    console.error('Error starting processing:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to start processing',
    }, { status: 500 });
  }
}