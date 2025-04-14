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
  const product = await productService.getProductDetails(productSlug);

  if (!product || !product.isActive) notFound();

  const relatedProducts = await productService.getRelatedProducts(
    product.id,
    product.categoryId,
    4
  );

  const defaultVariant = product.variants[0];
  if (!defaultVariant) notFound();

  let imageUrls: string[] = [];
  try {
    imageUrls = defaultVariant.imageUrls as unknown as string[];
  } catch (e) {
    console.error('Error parsing image URLs:', e);
  }

  const regularPrice = Number(defaultVariant.basePrice);
  const affiliatePrice = regularPrice * 0.75;

  const sizeOptions = defaultVariant.size
    ? defaultVariant.size.split(',').map(size => size.trim())
    : [];

  return (
    <div className="container mx-auto px-4 py-8 bg-[#000000] text-[#B2B2B2]">
      {/* Breadcrumbs */}
      <nav className="mb-8">
        <ol className="flex text-sm">
          <li className="flex items-center">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
          </li>
          {product.category?.parent && (
            <li className="flex items-center">
              <Link href={`/categories/${product.category.parent.slug}`} className="hover:underline">
                {product.category.parent.name}
              </Link>
              <span className="mx-2">/</span>
            </li>
          )}
          <li className="flex items-center">
            <Link href={`/categories/${product.category?.slug}`} className="hover:underline">
              {product.category?.name}
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li>
            <span className="font-medium text-[#F7F7F7]">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <ProductImageGallery images={imageUrls} productName={product.name} />

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#F7F7F7]">{product.name}</h1>
            <p className="mt-2">{product.brand}</p>
          </div>

          {/* Pricing */}
          <div className="border-t border-b border-[#B2B2B2] py-4">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-[#F7F7F7]">₹{affiliatePrice.toFixed(2)}</span>
            </div>
            <p className="font-semibold mt-2">
              Regular Price: ₹{regularPrice.toFixed(2)} (25% OFF)
            </p>
            <p className="text-xs mt-1">
              *Affiliate price is available only for registered affiliates
            </p>
          </div>

          {/* SKU */}
          <p>SKU: {defaultVariant.sku}</p>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-[#F7F7F7]">Description</h2>
            <p>{product.description}</p>
          </div>

          {/* Size */}
          {sizeOptions.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-[#F7F7F7]">Size</h2>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map(size => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-[#B2B2B2] rounded-md hover:border-[#F7F7F7] hover:text-[#F7F7F7]"
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
              <h2 className="text-lg font-semibold mb-2 text-[#F7F7F7]">Color</h2>
              <div className="flex items-center">
                <span
                  className="inline-block w-6 h-6 rounded-full border mr-2"
                  style={{
                    backgroundColor: getColorCode(defaultVariant.color),
                    borderColor: defaultVariant.color.toLowerCase() === 'white' ? '#B2B2B2' : 'transparent'
                  }}
                />
                <span>{defaultVariant.color}</span>
              </div>
            </div>
          )}

          {/* Attributes */}
          {product.attributes && product.attributes.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-[#F7F7F7]">Details</h2>
              <ul className="space-y-1">
                {product.attributes.map(attr => (
                  <li key={attr.id} className="flex">
                    <span className="font-medium w-32 text-[#F7F7F7]">{formatAttributeName(attr.attributeName)}:</span>
                    <span>{attr.attributeValue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Buttons */}
          <div className="pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <CatalogDownloadButton
                categoryId={product.categoryId}
                productId={product.id}
                buttonText="Download Catalog"
                className="w-full px-6 py-3 bg-[#000000] text-[#F7F7F7] rounded-lg hover:bg-[#B2B2B2]"
              />
              <button className="w-full px-6 py-3 border border-[#B2B2B2] text-[#B2B2B2] rounded-lg hover:bg-[#F7F7F7] hover:text-[#000000]">
                Place Order
              </button>
            </div>
            <p className="text-center text-sm">
              *Only registered affiliates can place orders.{' '}
              <a href="/register" className="text-[#F7F7F7] hover:underline">Register now</a>
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-10 mt-10 border-[#B2B2B2]">
          <h2 className="text-2xl font-bold mb-6 text-[#F7F7F7]">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <RelatedProductCard key={product.id} product={product as ProductWithVariants} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RelatedProductCard({ product }: { product: ProductWithVariants }) {
  const firstVariant = product.variants[0];
  if (!firstVariant) return null;

  let imageUrls: string[] = [];
  try {
    imageUrls = firstVariant.imageUrls as unknown as string[];
  } catch (e) {
    console.error('Error parsing image URLs:', e);
  }

  const imageUrl = imageUrls.length > 0 ? imageUrls[0] : '/placeholder-product.jpg';
  const regularPrice = Number(firstVariant.basePrice);

  return (
    <Link href={`/product/${product.slug}`} className="block group">
      <div className="border border-[#B2B2B2] rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-[#000000]">
        <div className="aspect-[3/4] relative bg-[#F7F7F7]">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }} />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-sm group-hover:text-[#F7F7F7] truncate">{product.name}</h3>
          <div className="mt-2">
            <p className="text-[#F7F7F7] font-semibold">₹{regularPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function formatAttributeName(name: string): string {
  return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function getColorCode(colorName: string): string {
  const colorMap: Record<string, string> = {
    Black: '#000000',
    White: '#FFFFFF',
    Red: '#FF0000',
    Green: '#008000',
    Blue: '#0000FF',
    Yellow: '#FFFF00',
    Orange: '#FFA500',
    Purple: '#800080',
    Pink: '#FFC0CB',
    Gray: '#808080',
    Brown: '#A52A2A',
    Navy: '#000080',
    Teal: '#008080',
    Gold: '#FFD700',
    Silver: '#C0C0C0',
    'Light Pink': '#FFB6C1',
    Peach: '#FFDAB9',
    'Orange/Blue': 'linear-gradient(to right, #FFA500 50%, #0000FF 50%)'
  };
  return colorMap[colorName] || '#CCCCCC';
}
