'use client';

import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Handle case where no images are provided
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square w-full border rounded-lg overflow-hidden bg-white">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${images[selectedImageIndex]})` }}
          aria-label={`${productName} - Image ${selectedImageIndex + 1}`}
        />
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 border rounded-md overflow-hidden ${
                index === selectedImageIndex 
                  ? 'border-indigo-600 ring-2 ring-indigo-200' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              aria-label={`View image ${index + 1}`}
              aria-current={index === selectedImageIndex ? 'true' : 'false'}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}