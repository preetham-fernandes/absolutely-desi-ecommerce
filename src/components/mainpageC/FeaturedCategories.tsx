import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Category {
  name: string;
  image: string;
  itemCount: number;
  link: string;
}

const categories: Category[] = [
  {
    name: "Women",
    image: "/lehenga1.webp",
    itemCount: 245,
    link: "/women"
  },
  {
    name: "Men",
    image: "/kurta.jpg",
    itemCount: 186,
    link: "/men"
  },
  {
    name: "Girls",
    image: "/saree.jpg",
    itemCount: 167,
    link: "/girls"
  },
  {
    name: "Boys",
    image: "/kurta.jpg",
    itemCount: 142,
    link: "/boys"
  },
];

export const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16">
          <div className="mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-tan">
              Discover Our Collections
            </h2>
            <p className="text-gray-300 max-w-xl">
              Explore authentic Indian ethnic wear curated for every occasion and style
            </p>
          </div>
          
          <Link 
            href="/categories" 
            className="flex items-center text-white hover:text-tan"
          >
            View All Categories <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link key={category.name} href={category.link}>
              <div className="group cursor-pointer overflow-hidden relative h-[450px] border border-gray-800">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90" />
                
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                  <div className="flex flex-col items-start">
                    <h3 className="text-3xl font-serif text-tan mb-3">{category.name}</h3>
                    <span className="text-white/80 text-sm mb-4">{category.itemCount} items</span>
                    <span className="flex items-center text-white border-b border-tan pb-1 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2 group-hover:text-tan">
                      Discover <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};