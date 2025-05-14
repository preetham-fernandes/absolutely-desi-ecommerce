// src/lib/services/fileUpload/validators/index.ts
import { ParsedRow } from '../parsers';
import prisma from '@/lib/db/prisma';

export interface ValidationError {
  row: number;
  field: string;
  message: string;
  value?: string;
}

export interface ValidationResult {
  totalRows: number;
  validRows: number;
  errorRows: number;
  warningRows: number;
  errors: ValidationError[];
  warnings: ValidationError[];
  validData: ParsedRow[];
}

/**
 * Validate rows from a parsed file
 */
export async function validateRows(
  rows: ParsedRow[],
  categoryId: number
): Promise<ValidationResult> {
  // Initialize validation result
  const result: ValidationResult = {
    totalRows: rows.length,
    validRows: 0,
    errorRows: 0,
    warningRows: 0,
    errors: [],
    warnings: [],
    validData: [],
  };
  
  if (rows.length === 0) {
    result.errors.push({
      row: 0,
      field: 'file',
      message: 'File contains no data',
    });
    return result;
  }
  
  // Get required data for validation
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  
  if (!category) {
    result.errors.push({
      row: 0,
      field: 'categoryId',
      message: 'Category not found',
    });
    return result;
  }
  
  // Get vendors for validation
  const vendors = await prisma.vendor.findMany({
    select: { 
      id: true,
      vendorCode: true,
    },
  });
  
  const vendorCodes = new Map<string, number>();
  vendors.forEach(vendor => {
    vendorCodes.set(vendor.vendorCode, vendor.id);
  });
  
  // Validate each row
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    const rowNumber = rowIndex + 1; // 1-based for user display
    
    const rowErrors: ValidationError[] = [];
    const rowWarnings: ValidationError[] = [];
    
    // Validate required fields
    validateRequiredFields(row, rowNumber, rowErrors);
    
    // Validate data types and formats
    validateDataTypes(row, rowNumber, rowErrors, rowWarnings);
    
    // Validate business rules
    await validateBusinessRules(row, rowNumber, rowErrors, rowWarnings, vendorCodes);
    
    // Check if row has errors
    if (rowErrors.length > 0) {
      result.errorRows++;
      result.errors.push(...rowErrors);
    } else {
      result.validRows++;
      result.validData.push(row);
    }
    
    // Add any warnings
    if (rowWarnings.length > 0) {
      result.warningRows++;
      result.warnings.push(...rowWarnings);
    }
  }
  
  return result;
}

/**
 * Validate required fields in a row
 */
function validateRequiredFields(
  row: ParsedRow,
  rowNumber: number,
  errors: ValidationError[]
): void {
  // Check required fields
  const requiredFields = [
    'name',
    'base_price',
    'variant_quantity',
    'image_urls',
  ];
  
  for (const field of requiredFields) {
    if (!row[field] || String(row[field]).trim() === '') {
      errors.push({
        row: rowNumber,
        field,
        message: `${field} is required`,
        value: row[field],
      });
    }
  }
}

/**
 * Validate data types and formats in a row
 */
function validateDataTypes(
  row: ParsedRow,
  rowNumber: number,
  errors: ValidationError[],
  warnings: ValidationError[]
): void {
  // Validate name
  if (row.name && typeof row.name === 'string') {
    if (row.name.length > 255) {
      errors.push({
        row: rowNumber,
        field: 'name',
        message: 'name must be 255 characters or less',
        value: row.name,
      });
    }
  }
  
  // Validate base_price
  if (row.base_price !== undefined && row.base_price !== '') {
    const basePrice = Number(row.base_price);
    if (isNaN(basePrice) || basePrice <= 0) {
      errors.push({
        row: rowNumber,
        field: 'base_price',
        message: 'base_price must be a positive number',
        value: String(row.base_price),
      });
    } else if (basePrice > 999999.99) {
      errors.push({
        row: rowNumber,
        field: 'base_price',
        message: 'base_price must be less than 1,000,000',
        value: String(row.base_price),
      });
    }
  }
  
  // Validate original_url
  if (row.original_url && typeof row.original_url === 'string') {
    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    if (!urlPattern.test(row.original_url)) {
      warnings.push({
        row: rowNumber,
        field: 'original_url',
        message: 'original_url is not a valid URL format',
        value: row.original_url,
      });
    }
  }
  
  // Validate is_featured
  if (row.is_featured !== undefined && row.is_featured !== '') {
    const validValues = ['TRUE', 'FALSE', 'true', 'false', '1', '0', true, false, 1, 0];
    if (!validValues.includes(row.is_featured)) {
      errors.push({
        row: rowNumber,
        field: 'is_featured',
        message: 'is_featured must be TRUE or FALSE',
        value: String(row.is_featured),
      });
    }
  }
  
  // Validate variant_price_adjustment
  if (row.variant_price_adjustment !== undefined && row.variant_price_adjustment !== '') {
    const priceAdjustment = Number(row.variant_price_adjustment);
    if (isNaN(priceAdjustment)) {
      errors.push({
        row: rowNumber,
        field: 'variant_price_adjustment',
        message: 'variant_price_adjustment must be a number',
        value: String(row.variant_price_adjustment),
      });
    }
  }
  
  // Validate variant_quantity
  if (row.variant_quantity !== undefined && row.variant_quantity !== '') {
    const quantity = Number(row.variant_quantity);
    if (isNaN(quantity) || !Number.isInteger(quantity) || quantity < 0) {
      errors.push({
        row: rowNumber,
        field: 'variant_quantity',
        message: 'variant_quantity must be a non-negative integer',
        value: String(row.variant_quantity),
      });
    }
  }
  
  // Validate variant_in_stock
  if (row.variant_in_stock !== undefined && row.variant_in_stock !== '') {
    const validValues = ['TRUE', 'FALSE', 'true', 'false', '1', '0', true, false, 1, 0];
    if (!validValues.includes(row.variant_in_stock)) {
      errors.push({
        row: rowNumber,
        field: 'variant_in_stock',
        message: 'variant_in_stock must be TRUE or FALSE',
        value: String(row.variant_in_stock),
      });
    }
  }
  
  // Validate image_urls
  if (row.image_urls && typeof row.image_urls === 'string') {
    const urls = row.image_urls.split(',').map((url: string) => url.trim()).filter(Boolean);
    
    if (urls.length === 0) {
      errors.push({
        row: rowNumber,
        field: 'image_urls',
        message: 'At least one image URL is required',
        value: row.image_urls,
      });
    } else {
      const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
      
      for (const url of urls) {
        if (!urlPattern.test(url)) {
          warnings.push({
            row: rowNumber,
            field: 'image_urls',
            message: `Invalid URL format: ${url}`,
            value: url,
          });
        }
      }
    }
  }
  
  // Validate variant_color_code
  if (row.variant_color_code && typeof row.variant_color_code === 'string') {
    const hexCodePattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!hexCodePattern.test(row.variant_color_code)) {
      warnings.push({
        row: rowNumber,
        field: 'variant_color_code',
        message: 'variant_color_code should be a valid hex color code (e.g., #FF5733)',
        value: row.variant_color_code,
      });
    }
  }
}

/**
 * Validate business rules in a row
 */
async function validateBusinessRules(
  row: ParsedRow,
  rowNumber: number,
  errors: ValidationError[],
  warnings: ValidationError[],
  vendorCodes: Map<string, number>
): Promise<void> {
  // Check if vendor exists
  if (row.vendor_code && typeof row.vendor_code === 'string') {
    if (!vendorCodes.has(row.vendor_code)) {
      errors.push({
        row: rowNumber,
        field: 'vendor_code',
        message: 'Vendor code does not exist in the system',
        value: row.vendor_code,
      });
    }
  }
  
  // Check variant_sku uniqueness
  if (row.variant_sku && typeof row.variant_sku === 'string') {
    const existingSku = await prisma.productVariant.findUnique({
      where: { sku: row.variant_sku },
    });
    
    if (existingSku) {
      errors.push({
        row: rowNumber,
        field: 'variant_sku',
        message: 'SKU already exists in the system',
        value: row.variant_sku,
      });
    }
  }
  
  // Check that sizes are provided
  if ((!row.variant_size || String(row.variant_size).trim() === '') && 
      (row.variant_color_code || row.variant_price_adjustment)) {
    warnings.push({
      row: rowNumber,
      field: 'variant_size',
      message: 'Size should be provided when other variant details are specified',
      value: row.variant_size,
    });
  }
}