import { NextRequest, NextResponse } from 'next/server';
import catalogService from '@/lib/services/catalogService';
import productService from '@/lib/services/productService';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { ApiResponse } from '@/lib/types';

/**
 * POST /api/catalog/generate
 * Generate an HTML gallery of product images
 * Body params:
 *   - categoryId: ID of the category to generate images for
 *   - productId: (Optional) ID of specific product to generate images for
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { categoryId, productId } = body;
    
    if (!categoryId) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Category ID is required',
      }, { status: 400 });
    }
    
    let products = [];
    let catalogName = '';
    
    // If productId is provided, get only that specific product
    if (productId) {
      const product = await productService.getProductById(parseInt(productId, 10));
      
      if (!product) {
        return NextResponse.json<ApiResponse<null>>({
          success: false,
          error: 'Product not found',
        }, { status: 404 });
      }
      
      products = [product];
      catalogName = product.name.replace(/\s+/g, '-');
    } else {
      // Otherwise, get all products in the category
      products = await catalogService.getProductsForCatalog(parseInt(categoryId, 10));
      
      if (products.length === 0) {
        return NextResponse.json<ApiResponse<null>>({
          success: false,
          error: 'No products found in this category',
        }, { status: 404 });
      }
      
      // Get category name for the catalog
      catalogName = await catalogService.generateCatalogName(parseInt(categoryId, 10));
    }
    
    // Generate a unique filename
    const timestamp = Date.now();
    const fileName = `${catalogName}-${timestamp}.html`;
    
    // Create temp directory if it doesn't exist
    const tempDir = path.join(process.cwd(), 'tmp');
    await mkdir(tempDir, { recursive: true });
    
    // Generate HTML gallery
    const htmlContent = generateImageGalleryHtml(products, catalogName);
    
    // Save HTML to file
    const filePath = path.join(tempDir, fileName);
    await writeFile(filePath, htmlContent, 'utf8');
    
    // Track the download (but don't pass userId as it's not available and required)
    await catalogService.trackDownload(
      productId ? `product-${productId}` : `category-${categoryId}`,
      request.ip || undefined
      // Not passing userId since we don't have authentication
    );
    
    // Return the download URL
    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: {
        fileName,
        downloadUrl: `/api/catalog/download?fileName=${fileName}`,
      },
    });
  } catch (error) {
    console.error('Error generating catalog:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate catalog',
    }, { status: 500 });
  }
}

/**
 * Generate a simple HTML gallery with only images
 */
function generateImageGalleryHtml(products: any[], catalogName: string): string {
  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Absolutely Desi - ${catalogName} Images</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background: #f5f5f5;
        }
        .gallery {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .product {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          padding: 20px;
        }
        .product-images {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 15px;
        }
        .image-container {
          margin-bottom: 15px;
        }
        img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="gallery">
  `;
  
  // Add product images
  for (const product of products) {
    // Skip products with no variants
    if (!product.variants || product.variants.length === 0) continue;
    
    const variant = product.variants[0];
    const imageUrls = variant.imageUrls as unknown as string[];
    
    // Skip products with no images
    if (!imageUrls || imageUrls.length === 0) continue;
    
    html += `
      <div class="product">
        <div class="product-images">
    `;
    
    // Add each image for this product
    for (const imageUrl of imageUrls) {
      html += `
        <div class="image-container">
          <img src="${imageUrl}" alt="${product.name}">
        </div>
      `;
    }
    
    html += `
        </div>
      </div>
    `;
  }
  
  html += `
      </div>
    </body>
    </html>
  `;
  
  return html;
}