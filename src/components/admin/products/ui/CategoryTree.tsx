// src/components/admin/products/ui/CategoryTree.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, FolderIcon } from "lucide-react";

type Category = {
  id: number;
  name: string;
  parentId: number | null;
  subcategories?: Category[];
  isActive: boolean;
};

interface CategoryTreeProps {
  categories: Category[];
  onSelect: (category: Category) => void;
  selectedCategoryId: number | null;
  level?: number;
}

export default function CategoryTree({ 
  categories, 
  onSelect, 
  selectedCategoryId,
  level = 0 
}: CategoryTreeProps) {
  // Track expanded state of each category
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});
  
  const toggleExpanded = (categoryId: number) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  // Check if a category is expanded
  const isExpanded = (categoryId: number): boolean => {
    return !!expandedCategories[categoryId];
  };
  
  return (
    <ul className={`space-y-1 ${level > 0 ? 'ml-4' : ''}`}>
      {categories.map(category => {
        const hasSubcategories = category.subcategories && category.subcategories.length > 0;
        const isSelected = category.id === selectedCategoryId;
        
        return (
          <li key={category.id} className="py-1">
            <div 
              className={`flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-zinc-800 ${
                isSelected ? 'bg-zinc-800' : ''
              }`}
            >
              {/* Expand/collapse button */}
              {hasSubcategories ? (
                <button
                  onClick={() => toggleExpanded(category.id)}
                  className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-zinc-200"
                >
                  {isExpanded(category.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              ) : (
                <span className="w-6 h-6 flex items-center justify-center">
                  <FolderIcon className="h-4 w-4 text-zinc-500" />
                </span>
              )}
              
              {/* Category name */}
              <span 
                className={`ml-1 cursor-pointer ${
                  isSelected ? 'text-tan font-medium' : 'text-zinc-300'
                }`}
                onClick={() => onSelect(category)}
              >
                {category.name}
              </span>
            </div>
            
            {/* Render subcategories if expanded */}
            {hasSubcategories && isExpanded(category.id) && (
              <CategoryTree
                categories={category.subcategories!}
                onSelect={onSelect}
                selectedCategoryId={selectedCategoryId}
                level={level + 1}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}