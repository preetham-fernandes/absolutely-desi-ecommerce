// App.tsx
"use client";

import React from "react";
import { Header } from "@/components/mainpageC/Header";
import {Carousel} from "@/components/mainpageC/Carousel"
import { Hero } from "@/components/mainpageC/Hero";
import { FeaturedCategories } from "@/components/mainpageC/FeaturedCategories";
import { HowItWorks } from "@/components/mainpageC/HowItWorks";
import { NewArrivals } from "@/components/mainpageC/NewArrivals";
import { Testimonials } from "@/components/mainpageC/Testimonials";
import { CTABanner } from "@/components/mainpageC/CTABanner";
import { Footer } from "@/components/mainpageC/Footer";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero/>
      <FeaturedCategories />
      <Carousel/>
      <HowItWorks />
      <NewArrivals />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default App;