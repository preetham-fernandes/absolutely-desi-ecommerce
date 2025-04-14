export default function Loading() {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb skeleton */}
        <div className="h-6 w-64 bg-gray-200 rounded animate-pulse mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image skeleton */}
          <div>
            <div className="aspect-square w-full bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex space-x-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          
          {/* Details skeleton */}
          <div className="space-y-6">
            <div>
              <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse mt-2"></div>
            </div>
            
            <div className="border-t border-b py-4">
              <div className="h-7 w-1/3 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse mt-2"></div>
            </div>
            
            <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse"></div>
            
            <div>
              <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mt-1"></div>
            </div>
            
            <div>
              <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
            
            <div className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related products skeleton */}
        <div className="border-t pt-10 mt-10">
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <div className="aspect-[3/4] bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }