// components/CTABanner.tsx
import React from "react";
import Link from "next/link";

export const CTABanner: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-800 text-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Become an Affiliate Today</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our network of successful fashion entrepreneurs and start
          earning with authentic Indian ethnic wear.
        </p>
        <Link
              href="/register"
              className="text-gray-300 hover:text-white px-3 py-2 transition-all"
            >
        <button className="bg-black text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-800">
          Register Now
        </button>
        </Link>
      </div>
    </section>
  );
};