'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type FilterProps = {
  categoryId: number;
};

type ProductFilters = {
  sizes: string[];
  colors: string[];
  priceRange: {
    min: number;
    max: number;
  };
};

export default function ProductFilters({ categoryId }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<ProductFilters | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Active filter states
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortOption, setSortOption] = useState('price-asc');
  
  useEffect(() => {
    // Load any filters from URL
    const sizesParam = searchParams.get('sizes');
    const colorsParam = searchParams.get('colors');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const sortParam = searchParams.get('sort');
    
    if (sizesParam) {
      setSelectedSizes(sizesParam.split(','));
    }
    
    if (colorsParam) {
      setSelectedColors(colorsParam.split(','));
    }
    
    if (minPriceParam && maxPriceParam) {
      setPriceRange([parseInt(minPriceParam), parseInt(maxPriceParam)]);
    }
    
    if (sortParam) {
      setSortOption(sortParam);
    }
    
    // Fetch available filters from API
    async function fetchFilters() {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/filters?categoryId=${categoryId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch filters');
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch filters');
        }
        
        setFilters(data.data.filters);
        
        // If no price range is set in URL, use the one from API
        if (!minPriceParam && !maxPriceParam && data.data.filters.priceRange) {
          setPriceRange([
            data.data.filters.priceRange.min,
            data.data.filters.priceRange.max
          ]);
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching filters:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchFilters();
  }, [categoryId, searchParams]);
  
  // Apply filters and update URL
  const applyFilters = () => {
    // Build query parameters
    const params = new URLSearchParams();
    
    if (selectedSizes.length > 0) {
      params.set('sizes', selectedSizes.join(','));
    }
    
    if (selectedColors.length > 0) {
      params.set('colors', selectedColors.join(','));
    }
    
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    params.set('sort', sortOption);
    
    // Navigate to filtered URL
    router.push(`?${params.toString()}`);
  };
  
  const resetFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    if (filters?.priceRange) {
      setPriceRange([filters.priceRange.min, filters.priceRange.max]);
    }
    setSortOption('price-asc');
    
    // Navigate to clean URL
    router.push('');
  };
  
  // Toggle size selection
  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  
  // Toggle color selection
  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };
  
  if (loading) {
    return <div className="p-4 border rounded-lg">Loading filters...</div>;
  }
  
  if (error || !filters) {
    return <div className="p-4 border rounded-lg text-red-500">Failed to load filters</div>;
  }
  
  return (
    <div className="border rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-lg mb-4">Filter Products</h3>
      
      {/* Sort options */}
      <div className="mb-4">
        <label htmlFor="sort" className="block mb-2 font-medium">Sort By</label>
        <select 
          id="sort" 
          className="w-full border rounded p-2"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
      
      {/* Price range */}
      <div className="mb-4">
        <h4 className="font-medium mb-2">Price Range</h4>
        <div className="flex items-center space-x-2">
          <span>₹{priceRange[0]}</span>
          <input 
            type="range" 
            min={filters.priceRange.min} 
            max={filters.priceRange.max}
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
            className="flex-grow"
          />
          {/* <span>₹{priceRange[1]}</span>
          <input 
            type="range" 
            min={filters.priceRange.min} 
            max={filters.priceRange.max}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="flex-grow"
          /> */}
        </div>
      </div>
      
      {/* Size filters */}
      {filters.sizes.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium mb-2">Sizes</h4>
          <div className="flex flex-wrap gap-2">
            {filters.sizes.map((size) => (
              <button
                key={size}
                className={`px-3 py-1 border rounded text-sm ${
                  selectedSizes.includes(size) 
                    ? 'bg-red-600 text-white' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => toggleSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Color filters */}
      {filters.colors.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium mb-2">Colors</h4>
          <div className="flex flex-wrap gap-2">
            {filters.colors.map((color) => (
              <button
                key={color}
                className={`px-3 py-1 border rounded text-sm ${
                  selectedColors.includes(color) 
                    ? 'bg-red-600 text-white' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => toggleColor(color)}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Action buttons */}
      <div className="flex gap-2 mt-4">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
        <button
          className="px-4 py-2 border rounded hover:bg-gray-100"
          onClick={resetFilters}
        >
          Reset
        </button>
      </div>
    </div>
  );
}