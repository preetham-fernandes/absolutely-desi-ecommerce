// components/CTABanner.tsx
import React from "react";
import Link from "next/link";

export const CTABanner: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 text-black dark:text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Become an Affiliate Today</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          Join our network of successful fashion entrepreneurs and start
          earning with authentic Indian ethnic wear.
        </p>
        <Link
              href="/register"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 transition-all"
            >
        <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200">
          Register Now
        </button>
        </Link>
      </div>
    </section>
  );
};