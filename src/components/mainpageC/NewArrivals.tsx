import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Product {
  name: string;
  price: string;
  image: string;
  category: string;
  link: string;
}

const featuredProducts: Product[] = [
  { 
    name: "Silk Banarasi Saree", 
    price: "₹1,899", 
    image: "/saree.jpg",
    category: "Women",
    link: "/product/silk-banarasi-saree"
  },
  { 
    name: "Embroidered Lehenga", 
    price: "₹2,499", 
    image: "/lehenga1.webp",
    category: "Women",
    link: "/product/embroidered-lehenga"
  },
  { 
    name: "Mens Wedding Sherwani", 
    price: "₹2,999", 
    image: "/kurta.jpg",
    category: "Men",
    link: "/product/mens-wedding-sherwani"
  },
  { 
    name: "Designer Anarkali Gown", 
    price: "₹1,799", 
    image: "/gown.webp",
    category: "Women",
    link: "/product/designer-anarkali-gown"
  },
];

export const NewArrivals: React.FC = () => {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute w-64 h-64 top-0 right-0 bg-tan/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute w-96 h-96 bottom-0 left-0 bg-bangladesh-green/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <span className="inline-block text-tan mb-4 text-sm font-medium uppercase tracking-wider">
              New Arrivals
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-tan">
              Latest Collections
            </h2>
            <p className="text-gray-300 max-w-xl">
              Discover our newest arrivals - exquisite pieces that blend traditional craftsmanship with contemporary design
            </p>
          </div>
          
          <Link 
            href="/new-arrivals" 
            className="mt-6 md:mt-0 flex items-center text-white hover:text-tan transition-colors"
          >
            View All Products <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Link key={product.name} href={product.link}>
              <div className="group bg-black border border-gray-800 overflow-hidden cursor-pointer">
                {/* Image container */}
                <div className="relative overflow-hidden h-80">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Category tag */}
                  <div className="absolute top-4 left-4 bg-tan text-black text-xs px-3 py-1">
                    {product.category}
                  </div>
                </div>
                
                {/* Product info */}
                <div className="p-6 border-t border-gray-800">
                  <h3 className="font-serif text-xl text-white mb-2 group-hover:text-tan transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-300">
                      {product.price}
                    </span>
                    <span className="text-tan group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Category grid */}
        <div className="mt-20">
          <h3 className="text-2xl font-serif mb-8 text-tan">
            Shop By Category
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "Sarees", "Lehengas", "Kurtas", "Sherwanis", 
              "Jackets", "Gowns", "Kids Wear", "Accessories"
            ].map((category) => (
              <Link key={category} href={`/category/${category.toLowerCase()}`}>
                <div className="bg-black border border-gray-800 p-4 text-center hover:border-tan transition-colors group">
                  <span className="text-gray-200 font-medium group-hover:text-tan transition-colors">
                    {category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};