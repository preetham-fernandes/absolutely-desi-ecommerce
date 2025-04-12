// components/HowItWorks.tsx
import React from "react";
import { UserPlus, Download, DollarSign, LucideIcon } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    title: "Register as an Affiliate",
    description:
      "Create your account in minutes and get instant access to our affiliate program with comprehensive onboarding support.",
    icon: UserPlus,
  },
  {
    title: "Browse & Download Catalog",
    description:
      "Access our extensive collection of premium ethnic wear with high-resolution images and detailed specifications.",
    icon: Download,
  },
  {
    title: "Sell & Earn",
    description:
      "Share products with your network and earn competitive commissions on every successful sale, with instant payouts.",
    icon: DollarSign,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-900">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg">
            Join our affiliate program in three simple steps and start earning
            today
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-y-1/2" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-black text-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-shadow duration-300"
            >
              <div className="relative z-10">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-400 rounded-xl flex items-center justify-center mb-6 transform -rotate-6">
                  <step.icon
                    size={32}
                    className="text-black transform rotate-6"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};