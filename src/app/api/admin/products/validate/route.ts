// src/app/api/admin/products/validate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/lib/types';
import { parseFile } from '@/lib/services/fileUpload/parsers';
import { validateRows } from '@/lib/services/fileUpload/validators';

/**
 * POST /api/admin/products/validate
 * Purpose: Validate a product upload file
 * Body (form data):
 *   - file: The file to validate
 *   - categoryId: ID of category for the products
 */
export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const categoryIdParam = formData.get('categoryId');
    
    if (!file) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'No file provided',
      }, { status: 400 });
    }
    
    if (!categoryIdParam) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Category ID is required',
      }, { status: 400 });
    }
    
    const categoryId = parseInt(categoryIdParam.toString(), 10);
    
    if (isNaN(categoryId)) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Invalid category ID',
      }, { status: 400 });
    }
    
    // Read file content
    const buffer = await file.arrayBuffer();
    
    // Parse the file based on its type
    const parsedData = await parseFile(file.name, buffer);
    
    if (!parsedData.success) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: parsedData.error || 'Failed to parse file',
      }, { status: 400 });
    }
    
    // Validate the rows
    if (!parsedData.data) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Parsed data is undefined',
      }, { status: 400 });
    }
    
    const validationResult = await validateRows(parsedData.data, categoryId);
    
    // Generate a session ID for tracking
    const sessionId = Date.now().toString() + Math.random().toString(36).substring(2, 10);
    
    // Store validation results in cache (in a real implementation, you would use Redis or a database)
    // For now, we'll just return the result
    
    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: {
        totalRows: validationResult.totalRows,
        validRows: validationResult.validRows,
        errorRows: validationResult.errorRows,
        warningRows: validationResult.warningRows,
        errors: validationResult.errors,
        warnings: validationResult.warnings,
        sessionId: sessionId,
      },
    });
    
  } catch (error) {
    console.error('Error validating file:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to validate file',
    }, { status: 500 });
  }
}