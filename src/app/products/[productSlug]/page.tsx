import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Download, ShoppingBag, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductImageGallery from "@/components/ProductImageGallery"
import CatalogDownloadButton from "@/components/CatalogDownloadButton"
import productService from "@/lib/services/productService"
import type { ProductWithVariants } from "@/lib/db/repositories/productRepo"

interface ProductPageProps {
  params: {
    productSlug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productSlug } = params
  const product = await productService.getProductDetails(productSlug)

  if (!product || !product.isActive) notFound()

  const relatedProducts = await productService.getRelatedProducts(product.id, product.categoryId, 4)

  const defaultVariant = product.variants[0]
  if (!defaultVariant) notFound()

  let imageUrls: string[] = []
  try {
    imageUrls = defaultVariant.imageUrls as unknown as string[]
  } catch (e) {
    console.error("Error parsing image URLs:", e)
  }

  const regularPrice = Number(defaultVariant.basePrice)
  const affiliatePrice = regularPrice * 0.75

  const sizeOptions = defaultVariant.size ? defaultVariant.size.split(",").map((size) => size.trim()) : []

  return (
    <div className="min-h-screen bg-black text-zinc-300">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex flex-wrap items-center text-sm">
            <li className="flex items-center">
              <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-zinc-600" />
            </li>
            {product.category?.parent && (
              <li className="flex items-center">
                <Link
                  href={`/categories/${product.category.parent.slug}`}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  {product.category.parent.name}
                </Link>
                <ChevronRight className="h-4 w-4 mx-2 text-zinc-600" />
              </li>
            )}
            <li className="flex items-center">
              <Link
                href={`/categories/${product.category?.slug}`}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                {product.category?.name}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-zinc-600" />
            </li>
            <li>
              <span className="font-medium text-white">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="bg-zinc-900 rounded-xl overflow-hidden">
            <ProductImageGallery images={imageUrls} productName={product.name} />
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs px-2 py-1 border-zinc-700 text-zinc-400">
                  {product.brand}
                </Badge>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-800">
                  <Heart className="h-5 w-5 text-zinc-400" />
                </Button>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-3">{product.name}</h1>
              <p className="text-sm text-zinc-400 mt-2">SKU: {defaultVariant.sku}</p>
            </div>

            {/* Pricing */}
            <div className="border-t border-b border-zinc-800 py-6 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-white">₹{affiliatePrice.toFixed(2)}</span>
                <span className="text-lg line-through text-zinc-500">₹{regularPrice.toFixed(2)}</span>
                <Badge className="bg-emerald-900 text-emerald-100 hover:bg-emerald-900">25% OFF</Badge>
              </div>
              <p className="text-xs text-zinc-400">*Affiliate price is available only for registered affiliates</p>
            </div>

            {/* Product Options */}
            <div className="space-y-6">
              {/* Size */}
              {sizeOptions.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-3 text-white">Size</h2>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((size) => (
                      <Button
                        key={size}
                        variant="outline"
                        className="border-zinc-700 hover:border-white hover:bg-zinc-800"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color */}
              {defaultVariant.color && (
                <div>
                  <h2 className="text-lg font-semibold mb-3 text-white">Color</h2>
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block w-8 h-8 rounded-full border border-zinc-700"
                      style={{
                        backgroundColor: getColorCode(defaultVariant.color),
                        borderColor: defaultVariant.color.toLowerCase() === "white" ? "#525252" : "transparent",
                      }}
                    />
                    <span className="text-white">{defaultVariant.color}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs for Description and Details */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4 text-zinc-300">
                <p>{product.description}</p>
              </TabsContent>
              <TabsContent value="details" className="mt-4">
                {product.attributes && product.attributes.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {product.attributes.map((attr) => (
                      <div key={attr.id} className="flex py-2 border-b border-zinc-800">
                        <span className="font-medium w-32 text-white">{formatAttributeName(attr.attributeName)}:</span>
                        <span className="text-zinc-300">{attr.attributeValue}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-500">No additional details available</p>
                )}
              </TabsContent>
            </Tabs>

            {/* Buttons */}
            <div className="pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <CatalogDownloadButton
                  categoryId={product.categoryId}
                  productId={product.id}
                  buttonText="Download Catalog"
                  className="w-full px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Catalog</span>
                </CatalogDownloadButton>
                <Button className="w-full bg-white text-black hover:bg-zinc-200 flex items-center justify-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Place Order</span>
                </Button>
              </div>
              <p className="text-center text-sm text-zinc-400">
                *Only registered affiliates can place orders.{" "}
                <Link href="/register" className="text-white hover:underline">
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t pt-12 mt-12 border-zinc-800">
            <h2 className="text-2xl font-bold mb-8 text-white">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <RelatedProductCard key={product.id} product={product as ProductWithVariants} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function RelatedProductCard({ product }: { product: ProductWithVariants }) {
  const firstVariant = product.variants[0]
  if (!firstVariant) return null

  let imageUrls: string[] = []
  try {
    imageUrls = firstVariant.imageUrls as unknown as string[]
  } catch (e) {
    console.error("Error parsing image URLs:", e)
  }

  const imageUrl = imageUrls.length > 0 ? imageUrls[0] : "/placeholder-product.jpg"
  const regularPrice = Number(firstVariant.basePrice)

  return (
    <Link href={`/product/${product.slug}`} className="block group">
      <Card className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-300">
        <div className="aspect-[3/4] relative bg-zinc-800 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-white truncate group-hover:text-zinc-300 transition-colors">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-white font-semibold">₹{regularPrice.toFixed(2)}</p>
            <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-400">
              {product.brand}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function formatAttributeName(name: string): string {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function getColorCode(colorName: string): string {
  const colorMap: Record<string, string> = {
    Black: "#000000",
    White: "#FFFFFF",
    Red: "#FF0000",
    Green: "#008000",
    Blue: "#0000FF",
    Yellow: "#FFFF00",
    Orange: "#FFA500",
    Purple: "#800080",
    Pink: "#FFC0CB",
    Gray: "#808080",
    Brown: "#A52A2A",
    Navy: "#000080",
    Teal: "#008080",
    Gold: "#FFD700",
    Silver: "#C0C0C0",
    "Light Pink": "#FFB6C1",
    Peach: "#FFDAB9",
    "Orange/Blue": "linear-gradient(to right, #FFA500 50%, #0000FF 50%)",
  }
  return colorMap[colorName] || "#CCCCCC"
}
