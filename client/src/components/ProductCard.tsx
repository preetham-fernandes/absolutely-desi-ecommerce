'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DownloadCatalogButton from '@/components/DownloadCatalogButton';

// Define the Product type based on your Prisma schema
interface Product {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  price: number;
  affiliatePrice: number;
  images: string[];
  stock: number;
  categoryId: number;
  category?: {
    name: string;
  };
}

interface ProductCardProps {
  product: Product;
  isAffiliate: boolean;
}

export default function ProductCard({ product, isAffiliate }: ProductCardProps) {
  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Use a single local image for all products
  const imageUrl = '/images/image.png';

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="relative w-full pt-[100%]">
        <div className="absolute inset-0 p-4">
          <div className="relative h-full w-full">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          {product.category && (
            <Badge variant="outline">{product.category.name}</Badge>
          )}
        </div>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        {isAffiliate ? (
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
              <span className="text-xl font-bold">
                {formatPrice(product.affiliatePrice)}
              </span>
              <Badge className="bg-green-600">25% OFF</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Stock: {product.stock} available
            </p>
          </div>
        ) : (
          <div className="text-xl font-bold">
            {formatPrice(product.price)}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        {isAffiliate ? (
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="default">Buy Now</Button>
            <Button variant="outline">View Details</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="default">Inquire Now</Button>
            <DownloadCatalogButton />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}