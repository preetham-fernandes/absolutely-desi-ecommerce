import { notFound } from "next/navigation"
import Link from "next/link"
import type { ProductWithVariants } from "@/lib/db/repositories/productRepo"
import categoryService from "@/lib/services/categoryService"
import productService from "@/lib/services/productService"
import ProductFilters from "@/components/ProductFilters"
import { Strikethrough } from "lucide-react"
import { ThemeToggle } from "@/components/providers/theme-toggle"

interface CategoryPageProps {
  params: {
    slug: string[]
  }
  searchParams?: {
    sizes?: string
    colors?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
    page?: string
  }
}

export default async function CategoryPage({ params, searchParams = {} }: CategoryPageProps) {
  // If no slugs are provided, return 404
  if (!params.slug || params.slug.length === 0) {
    notFound()
  }

  // Get the category from the slug path
  const categoryData = await categoryService.getCategoryFromPath(params.slug)

  if (!categoryData) {
    notFound()
  }

  const { category, path } = categoryData

  // Get subcategories to display
  const subcategories = await categoryService.getSubcategories(category.id)

  // Get products for this category (including subcategory products)
  let products = await productService.getProductsForCategory(category.id, true)

  // Apply filters from search params (server-side filtering)
  if (searchParams) {
    // Filter by sizes
    if (searchParams.sizes) {
      const sizeFilters = searchParams.sizes.split(",")
      products = products.filter((product) => {
        return product.variants.some((variant) => {
          if (!variant.size) return false
          const variantSizes = variant.size.split(",").map((s) => s.trim())
          return sizeFilters.some((size) => variantSizes.includes(size))
        })
      })
    }

    // Filter by colors
    if (searchParams.colors) {
      const colorFilters = searchParams.colors.split(",")
      products = products.filter((product) => {
        return product.variants.some((variant) => variant.color && colorFilters.includes(variant.color))
      })
    }

    // Filter by price range
    if (searchParams.minPrice && searchParams.maxPrice) {
      const minPrice = Number.parseFloat(searchParams.minPrice)
      const maxPrice = Number.parseFloat(searchParams.maxPrice)

      products = products.filter((product) => {
        return product.variants.some((variant) => {
          const price = Number.parseFloat(variant.basePrice.toString())
          return price >= minPrice && price <= maxPrice
        })
      })
    }

    // Apply sorting
    if (searchParams.sort) {
      const [field, direction] = searchParams.sort.split("-")

      products = [...products].sort((a, b) => {
        if (field === "name") {
          return direction === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        }

        if (field === "price") {
          const priceA = Number.parseFloat(a.variants[0]?.basePrice.toString() || "0")
          const priceB = Number.parseFloat(b.variants[0]?.basePrice.toString() || "0")

          return direction === "asc" ? priceA - priceB : priceB - priceA
        }

        return 0
      })
    }
  }

  // Handle pagination
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1
  const limit = 12 // Products per page
  const totalPages = Math.ceil(products.length / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = products.slice(startIndex, endIndex)

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>
      {/* Breadcrumbs */}
      <nav className="mb-8">
        <ol className="flex text-sm">
          <li className="flex items-center">
            <Link href="/" className="text-B2B2B2 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
          </li>
          {path.map((cat, index) => (
            <li key={cat.id} className="flex items-center">
              {index < path.length - 1 ? (
                <>
                  <Link href={`/categories/${cat.slug}`} className="text-B2B2B2 hover:underline">
                    {cat.name}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              ) : (
                <span className="font-medium">{cat.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>

      {category.description && <p className="mb-8 text-B2B2B2">{category.description}</p>}

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Subcategories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {subcategories.map((subcat) => (
              <Link
                key={subcat.id}
                href={`/categories/${subcat.slug}`}
                className="p-2 border rounded-md hover:bg-F7F7F7 text-center text-sm transition-colors"
              >
                {subcat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products section with filter sidebar */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Filters sidebar - client component */}
        <div className="w-full md:w-56 flex-shrink-0">
          <ProductFilters categoryId={category.id} />
        </div>

        {/* Product grid */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Products</h2>
            <p className="text-B2B2B2 text-sm">
              Showing {paginatedProducts.length} of {products.length} products
            </p>
          </div>

          {products.length === 0 ? (
            <p>No products found in this category.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <div className="flex border rounded-md overflow-hidden shadow-sm">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      // Create a new URLSearchParams object to preserve other filters
                      const newParams = new URLSearchParams(
                        Object.entries(searchParams).filter(([key]) => key !== "page"),
                      )
                      newParams.set("page", pageNum.toString())

                      return (
                        <Link
                          key={pageNum}
                          href={`?${newParams.toString()}`}
                          className={`px-3 py-1.5 text-sm ${
                            page === pageNum ? "bg-000000 text-white" : "hover:bg-F7F7F7"
                          }`}
                        >
                          {pageNum}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: ProductWithVariants }) {
  // Use the first variant for display
  const firstVariant = product.variants[0]

  // Skip products with no variants
  if (!firstVariant) {
    return null
  }

  // Parse image URLs from JSON string
  let imageUrls: string[] = []
  try {
    // The imageUrls is stored as a JSON array in the database
    imageUrls = firstVariant.imageUrls as unknown as string[]
  } catch (e) {
    console.error("Error parsing image URLs:", e)
  }

  // Get the first image or use a placeholder
  const imageUrl = imageUrls && imageUrls.length > 0 ? imageUrls[0] : "/placeholder-product.jpg"

  // Calculate affiliate price (25% off)
  const regularPrice = Number(firstVariant.basePrice)
  const affiliatePrice = regularPrice * 0.75

  return (
    <Link href={`/products/${product.slug}`} className="block group">
      <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 h-full">
        <div className="aspect-square relative bg-F7F7F7">
          {/* Use a div with background image instead of Next.js Image for simplicity */}
          <div
            className="w-full h-full bg-cover bg-top transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>

        <div className="p-3">
          <h3 className="font-medium text-sm group-hover:text-B2B2B2 truncate">{product.name}</h3>

          <div className="mt-1 flex flex-col">
            <div className="flex items-baseline gap-2">
              <p className="text-base font-semibold">
                ₹{affiliatePrice.toFixed(2)}
              </p>
              <span className="text-sm text-B2B2B2 line-through">
                ₹{regularPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}