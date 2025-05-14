// src/components/admin/products/steps/CategorySelectionStep.tsx
"use client";

import { useState, useEffect } from "react";
import { useBulkUpload } from "../BulkUploadForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CategoryTree from "../ui/CategoryTree";

type Category = {
  id: number;
  name: string;
  parentId: number | null;
  subcategories?: Category[];
  isActive: boolean;
};

export default function CategorySelectionStep() {
  const { selectedCategoryId, setSelectedCategoryId, nextStep } = useBulkUpload();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryPath, setCategoryPath] = useState<string[]>([]);

  useEffect(() => {
    // Fetch categories
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/admin/categories");
        const data = await response.json();
        
        if (data.success) {
          // Transform flat list into hierarchical structure
          const transformed = transformCategories(data.data.categories);
          setCategories(transformed);
        } else {
          console.error("Failed to fetch categories:", data.error);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // Transform flat categories into a hierarchical structure
  function transformCategories(flatCategories: Category[]): Category[] {
    // Filter active categories only
    const activeCategories = flatCategories.filter(cat => cat.isActive);
    
    // Create a map for quick lookup
    const categoryMap = new Map<number, Category>();
    activeCategories.forEach(category => {
      categoryMap.set(category.id, { ...category, subcategories: [] });
    });

    // Build the tree
    const rootCategories: Category[] = [];
    categoryMap.forEach(category => {
      if (category.parentId === null) {
        rootCategories.push(category);
      } else {
        const parentCategory = categoryMap.get(category.parentId);
        if (parentCategory) {
          parentCategory.subcategories = parentCategory.subcategories || [];
          parentCategory.subcategories.push(category);
        }
      }
    });

    return rootCategories;
  }

  // Handle category selection
  const handleCategorySelect = (category: Category) => {
    setSelectedCategoryId(category.id);
    
    // Update category path
    const path: string[] = [];
    let currentId = category.id;
    
    // Find the path from the selected category to the root
    const findPath = (categories: Category[], targetId: number, currentPath: string[] = []): string[] | null => {
      for (const cat of categories) {
        if (cat.id === targetId) {
          return [...currentPath, cat.name];
        }
        
        if (cat.subcategories && cat.subcategories.length > 0) {
          const foundPath = findPath(cat.subcategories, targetId, [...currentPath, cat.name]);
          if (foundPath) return foundPath;
        }
      }
      
      return null;
    };
    
    const foundPath = findPath(categories, category.id, []);
    if (foundPath) {
      setCategoryPath(foundPath);
    }
  };

  // Filter categories based on search term
  const filterCategories = (categories: Category[], term: string): Category[] => {
    if (!term) return categories;
    
    return categories
      .map(category => {
        // Check if current category matches
        const matchesName = category.name.toLowerCase().includes(term.toLowerCase());
        
        // Check subcategories
        let filteredSubcategories: Category[] = [];
        if (category.subcategories && category.subcategories.length > 0) {
          filteredSubcategories = filterCategories(category.subcategories, term);
        }
        
        // Return category if it matches or has matching subcategories
        if (matchesName || filteredSubcategories.length > 0) {
          return {
            ...category,
            subcategories: filteredSubcategories
          };
        }
        
        return null;
      })
      .filter(Boolean) as Category[];
  };

  const filteredCategories = searchTerm 
    ? filterCategories(categories, searchTerm) 
    : categories;

  const handleNext = () => {
    if (selectedCategoryId) {
      nextStep();
    }
  };

  if (isLoading) {
    return <div className="py-4 text-center">Loading categories...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-tan">Select Product Category</h3>
        <p className="text-sm text-zinc-400">
          Choose the category where the products should be uploaded. This will determine the template format and validation rules.
        </p>
      </div>
      
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input
          type="search"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-zinc-900 border-zinc-800 text-white"
        />
      </div>
      
      {/* Selected category path (breadcrumb) */}
      {categoryPath.length > 0 && (
        <div className="py-2 px-3 bg-zinc-900 rounded-md border border-zinc-800">
          <p className="text-sm font-medium text-zinc-400">Selected category:</p>
          <p className="text-sm text-tan">
            {categoryPath.map((name, index) => (
              <span key={index}>
                {name}
                {index < categoryPath.length - 1 && (
                  <span className="mx-1 text-zinc-600">›</span>
                )}
              </span>
            ))}
          </p>
        </div>
      )}
      
      {/* Category tree */}
      <div className="border border-zinc-800 rounded-md bg-zinc-900 h-[400px] overflow-y-auto p-4">
        {filteredCategories.length > 0 ? (
          <CategoryTree 
            categories={filteredCategories} 
            onSelect={handleCategorySelect} 
            selectedCategoryId={selectedCategoryId}
          />
        ) : (
          <p className="text-zinc-500 text-center py-8">
            {searchTerm ? "No categories match your search" : "No categories found"}
          </p>
        )}
      </div>
      
      {/* Actions */}
      <div className="flex justify-end">
        <Button 
          onClick={handleNext} 
          disabled={!selectedCategoryId}
          className="bg-tan text-zinc-950 hover:bg-tan/90"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}