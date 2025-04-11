// components/FeaturedCategories.tsx
import React from "react";

interface Category {
  name: string;
  image: string;
}

const categories: Category[] = [
  { name: "Lehengas", image: "/lehenga1.webp" },
  { name: "Sarees", image: "/saree.jpg" },
  { name: "Kurtas", image: "/kurta.jpg" },
  { name: "Gowns", image: "/gown.webp" },
];

export const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.name} className="text-center group">
              <div className="relative w-49 h-55 mx-auto mb-4 rounded-2xl overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};