export default function Loading() {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb skeleton */}
        <div className="h-6 w-64 bg-gray-200 rounded animate-pulse mb-8"></div>
        
        {/* Title skeleton */}
        <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
        
        {/* Description skeleton */}
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-8"></div>
        
        {/* Subcategory skeleton */}
        <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        
        {/* Products skeleton */}
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              {/* Image skeleton */}
              <div className="aspect-[3/4] bg-gray-200 animate-pulse"></div>
              
              {/* Content skeleton */}
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }