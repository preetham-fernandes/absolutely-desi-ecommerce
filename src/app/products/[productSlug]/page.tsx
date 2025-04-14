import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductImageGallery from '@/components/ProductImageGallery';
import CatalogDownloadButton from '@/components/CatalogDownloadButton';
import productService from '@/lib/services/productService';
import { ProductWithVariants } from '@/lib/db/repositories/productRepo';

interface ProductPageProps {
  params: {
    productSlug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productSlug } = params;
  
  // Get detailed product information
  const product = await productService.getProductDetails(productSlug);
  
  if (!product || !product.isActive) {
    notFound();
  }
  
  // Get related products
  const relatedProducts = await productService.getRelatedProducts(
    product.id,
    product.categoryId,
    4 // Limit to 4 related products
  );
  
  // Use the first variant as the default selected variant
  const defaultVariant = product.variants[0];
  
  if (!defaultVariant) {
    notFound(); // Product has no variants, should not happen
  }
  
  // Parse image URLs from JSON
  let imageUrls: string[] = [];
  try {
    imageUrls = defaultVariant.imageUrls as unknown as string[];
  } catch (e) {
    console.error('Error parsing image URLs:', e);
  }
  
  // Calculate regular and affiliate prices
  const regularPrice = Number(defaultVariant.basePrice);
  const affiliatePrice = regularPrice * 0.75; // 25% discount for affiliates
  
  // Parse size options
  const sizeOptions = defaultVariant.size 
    ? defaultVariant.size.split(',').map(size => size.trim()) 
    : [];
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-8">
        <ol className="flex text-sm">
          <li className="flex items-center">
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
          </li>
          {product.category?.parent && (
            <li className="flex items-center">
              <Link 
                href={`/categories/${product.category.parent.slug}`} 
                className="text-blue-600 hover:underline"
              >
                {product.category.parent.name}
              </Link>
              <span className="mx-2">/</span>
            </li>
          )}
          <li className="flex items-center">
            <Link 
              href={`/categories/${product.category?.slug}`} 
              className="text-blue-600 hover:underline"
            >
              {product.category?.name}
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li>
            <span className="font-medium">{product.name}</span>
          </li>
        </ol>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product images */}
        <div>
          <ProductImageGallery 
            images={imageUrls} 
            productName={product.name} 
          />
        </div>
        
        {/* Product details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.brand}</p>
          </div>
          
          {/* Pricing */}
          <div className="border-t border-b py-4">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">₹{regularPrice.toFixed(2)}</span>
              <span className="ml-4 text-gray-500 line-through">₹{(regularPrice * 1.2).toFixed(2)}</span>
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">20% OFF</span>
            </div>
            <p className="text-indigo-600 font-semibold mt-2">
              Affiliate Price: ₹{affiliatePrice.toFixed(2)} (25% OFF)
            </p>
            <p className="text-xs text-gray-500 mt-1">
              *Affiliate price is available only for registered affiliates
            </p>
          </div>
          
          {/* SKU */}
          <div>
            <p className="text-gray-600">SKU: {defaultVariant.sku}</p>
          </div>
          
          {/* Product description */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {/* Size selection */}
          {sizeOptions.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Size</h2>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border rounded-md hover:border-indigo-600 hover:text-indigo-600"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Color */}
          {defaultVariant.color && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Color</h2>
              <div className="flex items-center">
                <span className="inline-block w-6 h-6 rounded-full border mr-2" 
                  style={{ 
                    backgroundColor: getColorCode(defaultVariant.color),
                    borderColor: defaultVariant.color.toLowerCase() === 'white' ? '#ddd' : 'transparent'
                  }}
                ></span>
                <span>{defaultVariant.color}</span>
              </div>
            </div>
          )}
          
          {/* Product attributes */}
          {product.attributes && product.attributes.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Details</h2>
              <ul className="space-y-1">
                {product.attributes.map((attr) => (
                  <li key={attr.id} className="flex">
                    <span className="font-medium w-32">{formatAttributeName(attr.attributeName)}:</span>
                    <span>{attr.attributeValue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <CatalogDownloadButton 
                categoryId={product.categoryId} 
                productId={product.id}
                buttonText="Download Catalog"
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              />
              
              <button
                className="w-full px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
              >
                Place Order
              </button>
            </div>
            <p className="text-center text-sm text-gray-500">
              *Only registered affiliates can place orders. <a href="/register" className="text-indigo-600 hover:underline">Register now</a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-10 mt-10">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <RelatedProductCard 
                key={relatedProduct.id} 
                product={relatedProduct as ProductWithVariants} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RelatedProductCard({ product }: { product: ProductWithVariants }) {
  // Use the first variant for display
  const firstVariant = product.variants[0];
  
  // Skip products with no variants
  if (!firstVariant) {
    return null;
  }
  
  // Parse image URLs from JSON string
  let imageUrls: string[] = [];
  try {
    imageUrls = firstVariant.imageUrls as unknown as string[];
  } catch (e) {
    console.error('Error parsing image URLs:', e);
  }
  
  // Get the first image or use a placeholder
  const imageUrl = imageUrls && imageUrls.length > 0 
    ? imageUrls[0] 
    : '/placeholder-product.jpg';
  
  // Calculate affiliate price (25% off)
  const regularPrice = Number(firstVariant.basePrice);
  const affiliatePrice = regularPrice * 0.75;

  return (
    <Link href={`/product/${product.slug}`} className="block group">
      <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-[3/4] relative bg-gray-100">
          {/* Use a div with background image */}
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-sm group-hover:text-blue-600 truncate">
            {product.name}
          </h3>
          
          <div className="mt-2">
            <p className="text-gray-900 font-semibold">₹{regularPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Helper function to format attribute names
function formatAttributeName(name: string): string {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to convert color names to approximate CSS color codes
function getColorCode(colorName: string): string {
  const colorMap: Record<string, string> = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Red': '#FF0000',
    'Green': '#008000',
    'Blue': '#0000FF',
    'Yellow': '#FFFF00',
    'Orange': '#FFA500',
    'Purple': '#800080',
    'Pink': '#FFC0CB',
    'Gray': '#808080',
    'Brown': '#A52A2A',
    'Navy': '#000080',
    'Teal': '#008080',
    'Gold': '#FFD700',
    'Silver': '#C0C0C0',
    'Light Pink': '#FFB6C1',
    'Peach': '#FFDAB9',
    'Orange/Blue': 'linear-gradient(to right, #FFA500 50%, #0000FF 50%)',
  };
  
  return colorMap[colorName] || '#CCCCCC'; // Default to gray if color not found
}