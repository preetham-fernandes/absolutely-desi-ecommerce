// components/CTABanner.tsx
import React from "react";

export const CTABanner: React.FC = () => {
  return (
    <section className="py-16 bg-maroon-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Become an Affiliate Today</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our network of successful fashion entrepreneurs and start
          earning with authentic Indian ethnic wear.
        </p>
        <button className="bg-white text-maroon-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100">
          Register Now
        </button>
      </div>
    </section>
  );
};