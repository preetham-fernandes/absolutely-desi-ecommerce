'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState } from 'react';

export default function DownloadCatalogButton() {
  // This would be replaced by your auth check
  // For now, isAffiliate is always false as per requirements
  const isAffiliate = false;
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleDownload = useCallback(async () => {
    if (!isAffiliate) return;
    
    setIsLoading(true);
    try {
      // Log the catalog download
      await fetch('/api/catalog/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ catalogType: 'full' }),
      });
      
      // Redirect to the catalog PDF
      // In a real implementation, this would be a secure, authenticated endpoint
      window.open('/catalog/full-catalog.pdf', '_blank');
    } catch (error) {
      console.error('Failed to download catalog:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAffiliate]);
  
  if (!isAffiliate) {
    return (
      <Link href="/register">
        <Button variant="outline" className="flex items-center gap-2">
          <Download size={16} />
          Catalog
        </Button>
      </Link>
    );
  }
  
  return (
    <Button 
      onClick={handleDownload} 
      disabled={isLoading} 
      className="flex items-center gap-2"
    >
      <Download size={16} />
      {isLoading ? 'Preparing Catalog...' : 'Download Full Catalog'}
    </Button>
  );
}