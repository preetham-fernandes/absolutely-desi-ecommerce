// components/NewArrivals.tsx
import React from "react";

interface Product {
  name: string;
  price: string;
  image: string;
}

const newArrivals: Product[] = [
  { name: "Royal Blue Lehenga", price: "$599", image: "/arrival1.jpg" },
  { name: "Designer Silk Saree", price: "$299", image: "/saree.jpg" },
  { name: "Embroidered Kurta Set", price: "$199", image: "/kurta.jpg" },
  { name: "Wedding Gown", price: "$799", image: "/gown.webp" },
];

export const NewArrivals: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">New Arrivals</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-65 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-maroon-600 font-bold mb-4">
                  {product.price}
                </p>
                <button className="w-full bg-maroon-600 text-white py-2 rounded hover:bg-maroon-700">
                  Inquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};