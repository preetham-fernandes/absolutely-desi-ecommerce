/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['absolutelydesi.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'absolutelydesi.com',
        pathname: '/wp-content/uploads/**',
        },
        {
          protocol: 'http',
          hostname: '**',
        },
      ],
    },
  };
  
  export default nextConfig;