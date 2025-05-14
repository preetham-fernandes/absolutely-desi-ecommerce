// src/app/products/[productSlug]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Download, ShoppingBag, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductImageGallery from "@/components/product/ProductImageGallery"
import CatalogDownloadButton from "@/components/product/CatalogDownloadButton"
import { Header } from "@/components/mainpageC/Header"
import { Footer } from "@/components/mainpageC/Footer"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"

interface ProductPageProps {
  params: {
    productSlug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { productSlug } = params
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`/api/products/${productSlug}`)
        const data = await response.json()
        
        if (!data.success || !data.data.product) {
          router.push('/not-found')
          return
        }
        
        setProduct(data.data.product)
        
        // Fetch related products
        const relatedResponse = await fetch(`/api/products/related?productId=${data.data.product.id}&categoryId=${data.data.product.categoryId}&limit=4`)
        const relatedData = await relatedResponse.json()
        
        if (relatedData.success) {
          setRelatedProducts(relatedData.data.products || [])
        }
        
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
        router.push('/not-found')
      }
    }
    
    fetchProductDetails()
  }, [productSlug, router])

  // Toggle wishlist
  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to your wishlist")
      return
    }
    
    setIsWishlisted(!isWishlisted)
    if (!isWishlisted) {
      toast.success("Product added to wishlist")
    } else {
      toast.success("Product removed from wishlist")
    }
    
    // Here you would make an API call to update the user's wishlist
    // e.g., fetch('/api/wishlist/toggle', { method: 'POST', body: JSON.stringify({ productId: product.id }) })
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="container mx-auto px-4 pt-28 pb-6 flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-pulse">Loading product details...</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  
  if (!product) return null
  
  const defaultVariant = product.variants[0]
  if (!defaultVariant) return null
  
  let imageUrls: string[] = []
  try {
    imageUrls = defaultVariant.imageUrls as unknown as string[]
  } catch (e) {
    console.error("Error parsing image URLs:", e)
  }

  const regularPrice = Number(defaultVariant.basePrice)
  const affiliatePrice = regularPrice * 0.75

  const sizeOptions = defaultVariant.size ? defaultVariant.size.split(",").map((size: string) => size.trim()) : []

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="container mx-auto px-4 pt-20 pb-6">
        {/* Breadcrumbs */}
        <nav className="mb-4 mt-2">
          <ol className="flex flex-wrap items-center text-sm">
            <li className="flex items-center">
              <Link href="/" className="text-muted-foreground hover:text-bangladesh-green transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/60" />
            </li>
            {product.category?.parent && (
              <li className="flex items-center">
                <Link
                  href={`/${product.category.parent.slug}`}
                  className="text-muted-foreground hover:text-bangladesh-green transition-colors"
                >
                  {product.category.parent.name}
                </Link>
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/60" />
              </li>
            )}
            <li className="flex items-center">
              <Link
                href={`/${product.category?.slug}`}
                className="text-muted-foreground hover:text-bangladesh-green transition-colors"
              >
                {product.category?.name}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/60" />
            </li>
            <li>
              <span className="font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="bg-luxury-black rounded-xl overflow-hidden border border-gray-700">
            <ProductImageGallery images={imageUrls} productName={product.name} />
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs px-2 py-1 border-tan">
                  {product.brand}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mt-3 text-tan">{product.name}</h1>
              <p className="text-sm text-muted-foreground mt-2">SKU: {defaultVariant.sku}</p>
            </div>

            {/* Pricing */}
            <div className="border-t border-b border-gray-200 py-6 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-bangladesh-green">₹{affiliatePrice.toFixed(2)}</span>
                <span className="text-lg line-through text-muted-foreground">₹{regularPrice.toFixed(2)}</span>
                <Badge className="bg-tan text-luxury-black hover:bg-tan">25% OFF</Badge>
              </div>
              {!isAuthenticated && (
                <p className="text-xs text-muted-foreground">*Affiliate price is available only for registered affiliates</p>
              )}
            </div>

            {/* Product Options */}
            <div className="space-y-6">
              {/* Size */}
              {sizeOptions.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-3 font-serif">Size</h2>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((size) => (
                      <Button
                        key={size}
                        variant="outline"
                        className="hover:border-bangladesh-green hover:bg-bangladesh-green hover:text-white"
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
                  <h2 className="text-lg font-semibold mb-3 font-serif">Color</h2>
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block w-8 h-8 rounded-full border border-border"
                      style={{
                        backgroundColor: getColorCode(defaultVariant.color),
                        borderColor: defaultVariant.color.toLowerCase() === "white" ? "var(--border)" : "transparent",
                      }}
                    />
                    <span>{defaultVariant.color}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <Button 
              variant="outline" 
              className="w-full py-3 flex items-center justify-center gap-2 border-red-400 hover:border-red-600 transition-all"
              onClick={handleWishlistToggle}
            >
              <Heart 
                className={`h-5 w-5 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-red-400"}`} 
              />
              <span>{isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}</span>
            </Button>

            {/* Tabs for Description and Details */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p>{product.description}</p>
              </TabsContent>
              <TabsContent value="details" className="mt-4">
                {product.attributes && product.attributes.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {product.attributes.map((attr: any) => (
                      <div key={attr.id} className="flex py-2 border-b border-gray-200">
                        <span className="font-medium w-32">{formatAttributeName(attr.attributeName)}:</span>
                        <span>{attr.attributeValue}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No additional details available</p>
                )}
              </TabsContent>
            </Tabs>

            {/* Buttons */}
            <div className="pt-4 space-y-4">
              {isAuthenticated ? (
                // Authenticated user actions
                <div className="grid grid-cols-2 gap-4">
                  <CatalogDownloadButton
                    categoryId={product.categoryId}
                    productId={product.id}
                    buttonText="Download Catalog"
                    className="w-full px-6 py-3 bg-white text-luxury-black border border-bangladesh-green rounded-none hover:bg-bangladesh-green hover:text-white flex items-center justify-center gap-2 transition-all"
                  />
                  <Button className="w-full h-full flex items-center justify-center gap-2 bg-bangladesh-green text-white rounded-none hover:bg-tan hover:text-luxury-black transition-all">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Place Order</span>
                  </Button>
                </div>
              ) : (
                // Non-authenticated user actions
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button disabled className="w-full px-6 py-3 bg-white text-luxury-black border border-gray-300 rounded-none opacity-60 flex items-center justify-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Download Catalog</span>
                    </Button>
                    <Button disabled className="w-full h-full flex items-center justify-center gap-2 bg-gray-500 text-white rounded-none opacity-60">
                      <ShoppingBag className="h-4 w-4" />
                      <span>Place Order</span>
                    </Button>
                  </div>
                  <Button asChild className="w-full bg-tan text-black font-medium py-3 rounded-none hover:bg-bangladesh-green hover:text-white transition-all duration-300">
                    <Link href="/register">Register as Affiliate</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t pt-12 mt-12 border-gray-200">
            <h2 className="text-2xl font-bold mb-8 font-serif text-tan">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <RelatedProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  )
}

function RelatedProductCard({ product }: { product: any }) {
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
    <Link href={`/products/${product.slug}`} className="block group">
      <Card className="overflow-hidden hover:border-bangladesh-green transition-all duration-300 border border-gray-200">
        <div className="aspect-[3/4] relative bg-muted overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium truncate group-hover:text-bangladesh-green transition-colors">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-semibold">₹{regularPrice.toFixed(2)}</p>
            <Badge variant="outline" className="text-xs border-tan text-tan">
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