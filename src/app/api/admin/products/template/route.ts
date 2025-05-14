// src/app/api/admin/products/template/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { ApiResponse } from '@/lib/types';
import * as XLSX from 'xlsx';

/**
 * GET /api/admin/products/template
 * Purpose: Generate and download a template file for bulk product upload
 * Query params:
 *   - categoryId: ID of category to generate template for
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryIdParam = searchParams.get('categoryId');
    
    if (!categoryIdParam) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Category ID is required',
      }, { status: 400 });
    }
    
    const categoryId = parseInt(categoryIdParam, 10);
    
    if (isNaN(categoryId)) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Invalid category ID',
      }, { status: 400 });
    }
    
    // Get the category
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        parent: true,
      },
    });
    
    if (!category) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Category not found',
      }, { status: 404 });
    }
    
    // Get common product attributes for this category
    const commonAttributes = await prisma.productAttribute.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    
    // Generate the template
    const template = generateTemplate(category, commonAttributes);
    
    // Generate a filename based on the category
    const categoryPath = category.parent 
      ? `${category.parent.name}-${category.name}` 
      : category.name;
      
    const filename = `product_upload_template_${categoryPath.toLowerCase().replace(/\s+/g, '_')}.xlsx`;
    
    // Set headers for file download
    const headers = new Headers();
    headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Return the Excel file
    return new NextResponse(template, { 
      status: 200,
      headers,
    });
    
  } catch (error) {
    console.error('Error generating template:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to generate template',
    }, { status: 500 });
  }
}

/**
 * Generate an Excel template for bulk product upload
 */
function generateTemplate(category: any, attributes: any[]): Buffer {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  
  // Define template headers based on the database schema
  const headers = [
    'name',
    'description',
    'base_price',
    'vendor_code',
    'original_url',
    'is_featured',
    'meta_title',
    'meta_description',
    'variant_size',
    'variant_color_code',
    'variant_price_adjustment',
    'variant_sku',
    'variant_quantity',
    'variant_in_stock',
    'image_urls',
  ];
  
  // Add attribute headers
  for (const attribute of attributes) {
    headers.push(`attribute_${attribute.name}`);
  }
  
  // Create example data
  const exampleRow1 = [
    'Example Product 1',                   // name
    'This is a description of the product', // description
    1999.99,                               // base_price
    'ABC',                                 // vendor_code
    'https://example.com/original-product', // original_url
    'FALSE',                               // is_featured
    'Meta Title for SEO',                  // meta_title
    'Meta description for search engines', // meta_description
    'S,M,L',                               // variant_size
    '#FF5733',                             // variant_color_code
    0,                                     // variant_price_adjustment
    '',                                    // variant_sku (leave blank for auto-generation)
    50,                                    // variant_quantity
    'TRUE',                                // variant_in_stock
    'https://example.com/image1.jpg,https://example.com/image2.jpg', // image_urls
  ];
  
  // Add example attribute values
  for (const attribute of attributes) {
    exampleRow1.push(`Value for ${attribute.name}`);
  }
  
  const exampleRow2 = [
    'Example Product 2',
    'Another product description',
    2499.99,
    'XYZ',
    'https://example.com/original-product-2',
    'TRUE',
    'Another Meta Title',
    'Another meta description',
    'XL,XXL',
    '#3366FF',
    -100,
    '',
    25,
    'TRUE',
    'https://example.com/image3.jpg',
  ];
  
  // Add example attribute values for row 2
  for (const attribute of attributes) {
    exampleRow2.push(`Another value for ${attribute.name}`);
  }
  
  // Create the worksheet data (headers + example rows)
  const worksheetData = [
    headers,
    exampleRow1,
    exampleRow2,
  ];
  
  // Create the worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
  
  // Add a help sheet
  const helpData = [
    ['Field', 'Description', 'Format', 'Required'],
    ['name', 'Product name', 'Text (max 255 characters)', 'Yes'],
    ['description', 'Product description', 'Text', 'No'],
    ['base_price', 'Base price of the product', 'Number (e.g., 1999.99)', 'Yes'],
    ['vendor_code', 'Code of the vendor', 'Text (must match existing vendor code)', 'No'],
    ['original_url', 'Original URL of the product', 'Valid URL', 'No'],
    ['is_featured', 'Whether the product is featured', 'TRUE or FALSE', 'No'],
    ['meta_title', 'Meta title for SEO', 'Text', 'No'],
    ['meta_description', 'Meta description for SEO', 'Text', 'No'],
    ['variant_size', 'Sizes for the variant', 'Comma-separated values (e.g., S,M,L)', 'No'],
    ['variant_color_code', 'Color code for the variant', 'Hex color code (e.g., #FF5733)', 'No'],
    ['variant_price_adjustment', 'Price adjustment for the variant', 'Number (can be negative)', 'No'],
    ['variant_sku', 'SKU for the variant', 'Text (leave blank for auto-generation)', 'No'],
    ['variant_quantity', 'Quantity in stock', 'Number', 'Yes'],
    ['variant_in_stock', 'Whether the variant is in stock', 'TRUE or FALSE', 'No'],
    ['image_urls', 'URLs of product images', 'Comma-separated URLs', 'Yes'],
  ];
  
  // Add attribute help
  for (const attribute of attributes) {
    helpData.push([
      `attribute_${attribute.name}`,
      `Value for the ${attribute.name} attribute`,
      'Text',
      'No'
    ]);
  }
  
  // Create the help worksheet
  const helpWorksheet = XLSX.utils.aoa_to_sheet(helpData);
  
  // Add the help worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, helpWorksheet, 'Help');
  
  // Add category info sheet
  const categoryInfoData = [
    ['Category Information', ''],
    ['ID', category.id],
    ['Name', category.name],
    ['Slug', category.slug],
    ['Parent', category.parent ? category.parent.name : 'None'],
    ['', ''],
    ['Note', 'All products uploaded using this template will be assigned to this category.'],
  ];
  
  // Create the category info worksheet
  const categoryInfoWorksheet = XLSX.utils.aoa_to_sheet(categoryInfoData);
  
  // Add the category info worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, categoryInfoWorksheet, 'Category Info');
  
  // Write the workbook to a buffer
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  
  return buffer;
}