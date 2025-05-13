'use client';

import { useState } from 'react';

interface CatalogDownloadButtonProps {
  categoryId: number;
  productId?: number;
  buttonText?: string;
  className?: string;
}

export default function CatalogDownloadButton({
  categoryId,
  productId,
  buttonText = 'Download Catalog',
  className = 'px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'
}: CatalogDownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleDownload = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Request catalog generation
      const response = await fetch('/api/catalog/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId,
          productId
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate catalog');
      }
      
      // Start the download
      window.location.href = data.data.downloadUrl;
      
    } catch (err) {
      console.error('Error downloading catalog:', err);
      setError(err instanceof Error ? err.message : 'Failed to download catalog');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={loading}
        className={`${className} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Generating...' : buttonText}
      </button>
      
      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}