"use client";

import React from "react";
import { Header } from "@/components/mainpageC/Header";
import { Hero } from "@/components/mainpageC/Hero";
import { FeaturedCategories } from "@/components/mainpageC/FeaturedCategories";
import { HowItWorks } from "@/components/mainpageC/HowItWorks";
import { NewArrivals } from "@/components/mainpageC/NewArrivals";
import { Testimonials } from "@/components/mainpageC/Testimonials";
import { CTABanner } from "@/components/mainpageC/CTABanner";
import { Footer } from "@/components/mainpageC/Footer";

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Hero />
      <FeaturedCategories />
      <HowItWorks />
      <NewArrivals />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
};

export default Home;