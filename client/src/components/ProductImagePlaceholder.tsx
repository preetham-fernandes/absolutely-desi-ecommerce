'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ProductImage({
  src,
  alt,
  width = 400,
  height = 400,
  className = '',
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const placeholderSrc = '/images/product-placeholder.jpg';

  // Reset imgSrc when src prop changes
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: '1/1' }}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-cover rounded-md"
        onError={() => setImgSrc(placeholderSrc)}
      />
    </div>
  );
}