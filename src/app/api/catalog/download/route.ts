import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

/**
 * GET /api/catalog/download
 * Download a previously generated file
 * Query params:
 *   - fileName: Name of the file to download
 */
export async function GET(request: NextRequest) {
  try {
    // Get filename from query params
    const searchParams = request.nextUrl.searchParams;
    const fileName = searchParams.get('fileName');
    
    if (!fileName) {
      return new NextResponse('Filename is required', { status: 400 });
    }
    
    // Validate filename to prevent directory traversal
    const sanitizedFileName = path.basename(fileName);
    
    // Read the file from the temp directory
    const filePath = path.join(process.cwd(), 'tmp', sanitizedFileName);
    
    try {
      const fileBuffer = await readFile(filePath);
      
      // Set response headers for file download
      const headers = new Headers();
      
      // Determine content type based on file extension
      const fileExtension = path.extname(sanitizedFileName).toLowerCase();
      if (fileExtension === '.html') {
        headers.set('Content-Type', 'text/html');
      } else {
        headers.set('Content-Type', 'application/octet-stream');
      }
      
      headers.set('Content-Disposition', `attachment; filename="${sanitizedFileName}"`);
      
      // Return the file
      return new NextResponse(fileBuffer, {
        status: 200,
        headers,
      });
    } catch (error) {
      console.error('Error reading file:', error);
      return new NextResponse('File not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error downloading file:', error);
    return new NextResponse('Failed to download file', { status: 500 });
  }
}