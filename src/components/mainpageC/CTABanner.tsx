import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const CTABanner: React.FC = () => {
  return (
    <section className="py-24 bg-tan/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-tan/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-tan/10 rounded-full translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-bangladesh-green text-white p-12 md:p-16 border border-tan/20">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-tan">
              Become an Affiliate Today
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Join our network of successful fashion entrepreneurs and start earning with authentic Indian ethnic wear. 
              Receive exclusive discounts and premium marketing materials.
            </p>
            <Link href="/register">
              <button className="inline-flex items-center bg-tan text-black px-8 py-4 font-medium hover:bg-white transition-all duration-300 group">
                Register Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};