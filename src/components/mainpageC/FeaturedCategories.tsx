// components/FeaturedCategories.tsx
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
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-serif mb-2">Discover yourself</h2>
            <p className="text-gray-600">Our curated collection for every style</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link key={category.name} href={category.link} passHref>
              <div className="group cursor-pointer">
                <div className="relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-2xl font-serif text-white mb-2">{category.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white flex items-center gap-1 text-sm">
                        Shop Now
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
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
