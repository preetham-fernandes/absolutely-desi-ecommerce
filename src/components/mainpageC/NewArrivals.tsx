// components/NewArrivals.tsx
import React from "react";

interface Product {
  name: string;
  price: string;
  image: string;
}

const newArrivals: Product[] = [
  { name: "Lehenga ", price: "Starting from ₹1499", image: "/arrival1.jpg" },
  { name: "Saree ", price: "Starting from ₹1899", image: "/saree.jpg" },
  { name: "Sherwani ", price: "Starting from ₹1999", image: "/kurta.jpg" },
  { name: "Gown", price: "Starting from ₹1299", image: "/gown.webp" },
  { name: "Kurta", price: "Starting from ₹1799", image: "/arrival1.jpg" },
  { name: "Jacket", price: "Starting from ₹1499", image: "/saree.jpg" },
  { name: "Dress", price: "Starting from ₹1499", image: "/kurta.jpg" },
  { name: "Shirts", price: "Starting from ₹1499", image: "/gown.webp" },
  { name: "Clutches", price: "Starting from ₹999", image: "/arrival1.jpg" },
  { name: "Sling bags", price: "Starting from ₹999", image: "/saree.jpg" },
  { name: "Drinkwear", price: "Starting from ₹499", image: "/kurta.jpg" },
  { name: "Home-linen", price: "Starting from ₹499", image: "/gown.webp" },
];

export const NewArrivals: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-start mb-12">SHOP BY CATEGORY</h2>
        <div className="grid md:grid-cols-6 gap-8">
          {newArrivals.map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-serif mb-2">{product.name}</h3>
                <p className="text-maroon-600 font-normal mb-4">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};