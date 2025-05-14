// src/lib/services/fileUpload/processor/index.ts
import { ParsedRow } from '../parsers';
import prisma from '@/lib/db/prisma';
import { generateSlug, generateSKU } from './generators';

// Global storage for processing status (in a real app, use Redis or a database)
const processingStatus = new Map<string, ProcessingStatus>();

export interface ProcessingStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'timeout';
  progress: number;
  currentOperation?: string;
  currentBatch?: number;
  totalBatches?: number;
  error?: string;
  productsCreated?: number;
  variantsCreated?: number;
  attributesCreated?: number;
  imagesUploaded?: number;
  timeElapsed?: number;
  lastProcessedIndex?: number;
}

interface TransformedProduct {
  name: string;
  description: string | null;
  slug: string;
  basePrice: number;
  isFeatured: boolean;
  vendorId: number | null;
  originalUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  categoryId: number;
  variants: TransformedVariant[];
  attributes: TransformedAttribute[];
  images: TransformedImage[];
}

interface TransformedVariant {
  size: string | null;
  colorCode: string | null;
  priceAdjustment: number;
  sku: string;
  quantity: number;
  inStock: boolean;
  images?: TransformedImage[];
}

interface TransformedAttribute {
  attributeId: number;
  value: string;
}

interface TransformedImage {
  imgUrl: string;
  altText: string | null;
  variantIndex?: number; // Used to link images to variants
}

// Simulate validation results storage (in a real app, use Redis or a database)
const validationResults = new Map<string, { 
  categoryId: number;
  validData: ParsedRow[];
}>();

/**
 * Start processing validated data
 */
export async function startProcessing(
  sessionId: string,
  proceedWithValid: boolean
): Promise<void> {
  // Initialize processing status
  processingStatus.set(sessionId, {
    status: 'pending',
    progress: 0,
  });
  
  try {
    // In a real app, retrieve validation results from cache or database
    // For this example, we'll use mock data
    const mockValidationData = {
      categoryId: 1, // Assuming category ID 1 exists
      validData: [
        {
          name: 'Example Product 1',
          description: 'This is a description of the product',
          base_price: 1999.99,
          vendor_code: 'ABC',
          original_url: 'https://example.com/original-product',
          is_featured: 'FALSE',
          meta_title: 'Meta Title for SEO',
          meta_description: 'Meta description for search engines',
          variant_size: 'S,M,L',
          variant_color_code: '#FF5733',
          variant_price_adjustment: 0,
          variant_sku: '',
          variant_quantity: 50,
          variant_in_stock: 'TRUE',
          image_urls: 'https://example.com/image1.jpg,https://example.com/image2.jpg',
          attribute_fabric: 'Cotton',
          attribute_occasion: 'Casual',
        },
        // Add more mock data as needed
      ],
    };
    
    validationResults.set(sessionId, mockValidationData);
    
    // Update status to processing
    processingStatus.set(sessionId, {
      ...processingStatus.get(sessionId)!,
      status: 'processing',
      currentOperation: 'Preparing data...',
      progress: 5,
    });
    
    // Start processing
    const result = await processProducts(sessionId);
    
    // Update status to completed
    processingStatus.set(sessionId, {
      ...processingStatus.get(sessionId)!,
      status: 'completed',
      progress: 100,
      productsCreated: result.productsCreated,
      variantsCreated: result.variantsCreated,
      attributesCreated: result.attributesCreated,
      imagesUploaded: result.imagesUploaded,
      timeElapsed: result.timeElapsed,
    });
    
  } catch (error) {
    console.error('Processing error:', error);
    
    // Update status to failed
    processingStatus.set(sessionId, {
      ...processingStatus.get(sessionId)!,
      status: 'failed',
      error: error instanceof Error ? error.message : 'Processing failed',
    });
  }
}

/**
 * Resume a timed out processing job
 */
export async function resumeProcessing(sessionId: string): Promise<void> {
  // Get current status
  const currentStatus = processingStatus.get(sessionId);
  
  if (!currentStatus) {
    throw new Error('Processing session not found');
  }
  
  if (currentStatus.status !== 'timeout') {
    throw new Error('Processing is not in a timed out state');
  }
  
  // Update status to processing
  processingStatus.set(sessionId, {
    ...currentStatus,
    status: 'processing',
    currentOperation: 'Resuming processing...',
  });
  
  try {
    // Resume processing from the last processed index
    const result = await processProducts(sessionId, currentStatus.lastProcessedIndex);
    
    // Update status to completed
    processingStatus.set(sessionId, {
      ...processingStatus.get(sessionId)!,
      status: 'completed',
      progress: 100,
      productsCreated: result.productsCreated,
      variantsCreated: result.variantsCreated,
      attributesCreated: result.attributesCreated,
      imagesUploaded: result.imagesUploaded,
      timeElapsed: result.timeElapsed,
    });
    
  } catch (error) {
    console.error('Processing error:', error);
    
    // Update status to failed
    processingStatus.set(sessionId, {
      ...processingStatus.get(sessionId)!,
      status: 'failed',
      error: error instanceof Error ? error.message : 'Processing failed',
    });
  }
}

/**
 * Get the current processing status
 */
export async function getProcessingStatus(sessionId: string): Promise<ProcessingStatus | null> {
  return processingStatus.get(sessionId) || null;
}

/**
 * Process products from validated data
 */
async function processProducts(
  sessionId: string,
  startIndex: number = 0
): Promise<{
  productsCreated: number;
  variantsCreated: number;
  attributesCreated: number;
  imagesUploaded: number;
  timeElapsed: number;
}> {
  const startTime = Date.now();
  let productsCreated = 0;
  let variantsCreated = 0;
  let attributesCreated = 0;
  let imagesUploaded = 0;
  
  // Get validation data
  const validationData = validationResults.get(sessionId);
  
  if (!validationData) {
    throw new Error('Validation data not found');
  }
  
  const { categoryId, validData } = validationData;
  
  // Define batch size
  const BATCH_SIZE = 10;
  const totalBatches = Math.ceil((validData.length - startIndex) / BATCH_SIZE);
  
  // Update status with total batches
  processingStatus.set(sessionId, {
    ...processingStatus.get(sessionId)!,
    totalBatches,
  });
  
  // Transform parsed data to database format
  processingStatus.set(sessionId, {
    ...processingStatus.get(sessionId)!,
    currentOperation: 'Transforming data...',
    progress: 10,
  });
  
  const transformedProducts: TransformedProduct[] = [];
  
  for (let i = startIndex; i < validData.length; i++) {
    const row = validData[i];
    
    // Transform the row to a product
    const product = await transformRowToProduct(row, categoryId, i + 1);
    transformedProducts.push(product);
    
    // Update progress
    const transformProgress = 10 + Math.floor((i - startIndex) / validData.length * 20);
    processingStatus.set(sessionId, {
      ...processingStatus.get(sessionId)!,
      progress: transformProgress,
      lastProcessedIndex: i,
    });
  }
  
  // Process in batches
  for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
    const start = startIndex + batchIndex * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, transformedProducts.length);
    const batch = transformedProducts.slice(start, end);
    
    // Update status
    processingStatus.set(sessionId, {
      ...processingStatus.get(sessionId)!,
      currentOperation: `Processing batch ${batchIndex + 1} of ${totalBatches}...`,
      currentBatch: batchIndex + 1,
      progress: 30 + Math.floor(batchIndex / totalBatches * 70),
      lastProcessedIndex: start,
    });
    
    // Process batch
    try {
      const batchResult = await processProductBatch(batch);
      
      // Update counts
      productsCreated += batchResult.productsCreated;
      variantsCreated += batchResult.variantsCreated;
      attributesCreated += batchResult.attributesCreated;
      imagesUploaded += batchResult.imagesUploaded;
      
    } catch (error) {
      // In a real app, you would handle batch failures more gracefully
      console.error(`Error processing batch ${batchIndex + 1}:`, error);
      
      // Simulate a timeout
      if (batchIndex > 0 && batchIndex < totalBatches - 1 && Math.random() < 0.1) {
        processingStatus.set(sessionId, {
          ...processingStatus.get(sessionId)!,
          status: 'timeout',
          error: 'Processing timed out',
          lastProcessedIndex: start,
        });
        
        throw new Error('Processing timed out');
      }
      
      throw error;
    }
    
    // Small delay to simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Calculate elapsed time
  const timeElapsed = Date.now() - startTime;
  
  return {
    productsCreated,
    variantsCreated,
    attributesCreated,
    imagesUploaded,
    timeElapsed,
  };
}

/**
 * Transform a row to a product object
 */
async function transformRowToProduct(
  row: ParsedRow,
  categoryId: number,
  index: number
): Promise<TransformedProduct> {
  // Generate slug from name
  const slug = await generateSlug(row.name);
  
  // Process boolean values
  const isFeatured = row.is_featured === 'TRUE' || row.is_featured === 'true' || row.is_featured === true || row.is_featured === 1 || row.is_featured === '1';
  
  // Get vendor ID from vendor code
  let vendorId: number | null = null;
  if (row.vendor_code) {
    const vendor = await prisma.vendor.findFirst({
      where: { vendorCode: row.vendor_code },
      select: { id: true },
    });
    
    if (vendor) {
      vendorId = vendor.id;
    }
  }
  
  // Process variants
  const variants: TransformedVariant[] = [];
  const variantSizes = row.variant_size ? row.variant_size.split(',').map((s: string) => s.trim()).filter(Boolean) : ['Default'];
  
  for (let i = 0; i < variantSizes.length; i++) {
    const size = variantSizes[i];
    
    // Generate SKU if not provided
    const sku = row.variant_sku && i === 0 ? row.variant_sku : await generateSKU(categoryId.toString(), index);
    
    // Process boolean values
    const inStock = row.variant_in_stock === 'TRUE' || row.variant_in_stock === 'true' || row.variant_in_stock === true || row.variant_in_stock === 1 || row.variant_in_stock === '1' || row.variant_in_stock === undefined || row.variant_in_stock === '';
    
    variants.push({
      size,
      colorCode: row.variant_color_code || null,
      priceAdjustment: row.variant_price_adjustment ? Number(row.variant_price_adjustment) : 0,
      sku,
      quantity: row.variant_quantity ? Number(row.variant_quantity) : 0,
      inStock,
    });
  }
  
  // Process images
  const images: TransformedImage[] = [];
  if (row.image_urls) {
    const urls = row.image_urls.split(',').map((url: string) => url.trim()).filter(Boolean);
    
    for (let i = 0; i < urls.length; i++) {
      images.push({
        imgUrl: urls[i],
        altText: `${row.name} - Image ${i + 1}`,
        // Assign variant index to images (round-robin if more images than variants)
        variantIndex: variants.length > 0 ? i % variants.length : undefined,
      });
    }
  }
  
  // Process attributes
  const attributes: TransformedAttribute[] = [];
  for (const key in row) {
    if (key.startsWith('attribute_')) {
      const attributeName = key.substring(10); // Remove 'attribute_' prefix
      const attributeValue = row[key];
      
      if (attributeValue) {
        // Get or create attribute
        let attribute = await prisma.productAttribute.findFirst({
          where: { name: attributeName },
          select: { id: true },
        });
        
        if (!attribute) {
          attribute = await prisma.productAttribute.create({
            data: { name: attributeName },
            select: { id: true },
          });
        }
        
        attributes.push({
          attributeId: attribute.id,
          value: attributeValue.toString(),
        });
      }
    }
  }
  
  return {
    name: row.name,
    description: row.description || null,
    slug,
    basePrice: Number(row.base_price),
    isFeatured,
    vendorId,
    originalUrl: row.original_url || null,
    metaTitle: row.meta_title || null,
    metaDescription: row.meta_description || null,
    categoryId,
    variants,
    attributes,
    images,
  };
}

/**
 * Process a batch of products
 */
async function processProductBatch(
  products: TransformedProduct[]
): Promise<{
  productsCreated: number;
  variantsCreated: number;
  attributesCreated: number;
  imagesUploaded: number;
}> {
  let productsCreated = 0;
  let variantsCreated = 0;
  let attributesCreated = 0;
  let imagesUploaded = 0;
  
  try {
    // Use transaction for atomicity
    await prisma.$transaction(async (tx) => {
      for (const product of products) {
        // Create product
        const createdProduct = await tx.product.create({
          data: {
            name: product.name,
            description: product.description,
            slug: product.slug,
            basePrice: product.basePrice,
            isFeatured: product.isFeatured,
            vendorId: product.vendorId,
            originalUrl: product.originalUrl,
            metaTitle: product.metaTitle,
            metaDescription: product.metaDescription,
            categoryId: product.categoryId,
          },
        });
        
        productsCreated++;
        
        // Create variants
        for (const variant of product.variants) {
          const createdVariant = await tx.productVariant.create({
            data: {
              productId: createdProduct.id,
              size: variant.size,
              colorCode: variant.colorCode,
              priceAdjustment: variant.priceAdjustment,
              sku: variant.sku,
              quantity: variant.quantity,
              inStock: variant.inStock,
            },
          });
          
          variantsCreated++;
          
          // Create variant-specific images
          const variantImages = product.images.filter(img => img.variantIndex === product.variants.indexOf(variant));
          
          for (const image of variantImages) {
            await tx.productImage.create({
              data: {
                productId: createdProduct.id,
                variantId: createdVariant.id,
                imgUrl: image.imgUrl,
                altText: image.altText,
              },
            });
            
            imagesUploaded++;
          }
        }
        
        // Create general product images (not linked to specific variants)
        const generalImages = product.images.filter(img => img.variantIndex === undefined);
        
        for (const image of generalImages) {
          await tx.productImage.create({
            data: {
              productId: createdProduct.id,
              imgUrl: image.imgUrl,
              altText: image.altText,
            },
          });
          
          imagesUploaded++;
        }
        
        // Create attribute values
        for (const attribute of product.attributes) {
          await tx.productAttributeValue.create({
            data: {
              productId: createdProduct.id,
              attributeId: attribute.attributeId,
              value: attribute.value,
            },
          });
          
          attributesCreated++;
        }
      }
    });
    
    return {
      productsCreated,
      variantsCreated,
      attributesCreated,
      imagesUploaded,
    };
    
  } catch (error) {
    console.error('Error processing product batch:', error);
    throw error;
  }
}