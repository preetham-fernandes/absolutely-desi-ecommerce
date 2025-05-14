// src/lib/services/fileUpload/processor/generators.ts
import prisma from '@/lib/db/prisma';

/**
 * Generate a unique slug from a product name
 */
export async function generateSlug(name: string): Promise<string> {
  // Convert name to lowercase and replace spaces with hyphens
  let slug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-')  // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
  
  // Check if slug already exists
  const existingProduct = await prisma.product.findUnique({
    where: { slug },
  });
  
  if (!existingProduct) {
    return slug;
  }
  
  // If slug exists, add a counter
  let counter = 1;
  let newSlug = `${slug}-${counter}`;
  
  while (true) {
    const existingWithCounter = await prisma.product.findUnique({
      where: { slug: newSlug },
    });
    
    if (!existingWithCounter) {
      return newSlug;
    }
    
    counter++;
    newSlug = `${slug}-${counter}`;
  }
}

/**
 * Generate a unique SKU for a product variant
 */
export async function generateSKU(categoryCode: string, index: number): Promise<string> {
  // Define category prefix map
  const prefixMap: Record<string, string> = {
    // Women's categories
    '10': 'WSR', // Women's Saree
    '11': 'WKT', // Women's Kurta
    '12': 'WLH', // Women's Lehenga
    
    // Men's categories
    '13': 'MKT', // Men's Kurta
    '14': 'MSH', // Men's Sherwani
    '15': 'MJK', // Men's Jacket
    
    // Kids categories
    '16': 'BKT', // Boys' Kurta
    '17': 'BSH', // Boys' Sherwani
    '19': 'GLH', // Girls' Lehenga
    '20': 'GKT', // Girls' Kurta
    '21': 'GJS', // Girls' Jumpsuit
  };
  
  // Get prefix from map or use generic
  const prefix = prefixMap[categoryCode] || 'PRD';
  
  // Generate random number (4 digits)
  const generateRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };
  
  // Initial attempt
  let randomNum = generateRandomNumber();
  let sku = `${prefix}-${randomNum}`;
  
  // Check if SKU already exists
  const exists = await prisma.productVariant.findUnique({
    where: { sku },
  });
  
  if (!exists) {
    return sku;
  }
  
  // Try again with a different random number
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    randomNum = generateRandomNumber();
    sku = `${prefix}-${randomNum}`;
    
    const exists = await prisma.productVariant.findUnique({
      where: { sku },
    });
    
    if (!exists) {
      return sku;
    }
    
    attempts++;
  }
  
  // If we've tried too many times, use a timestamp-based approach
  const timestamp = Date.now().toString().substring(8, 13); // Use last 5 digits of timestamp
  return `${prefix}-${timestamp}`;
}