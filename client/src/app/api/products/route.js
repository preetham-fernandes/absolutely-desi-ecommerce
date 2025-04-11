// app/api/products/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST a new product
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Calculate affiliate price (25% discount)
    const price = parseFloat(body.price);
    const affiliatePrice = price * 0.75;
    
    const product = await prisma.product.create({
      data: {
        sku: body.sku,
        name: body.name,
        description: body.description,
        price: price,
        affiliatePrice: affiliatePrice,
        images: body.images,
        stock: body.stock || 0,
        categoryId: body.categoryId,
      }
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}