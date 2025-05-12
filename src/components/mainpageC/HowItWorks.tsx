import React from "react";
import Link from "next/link";
import { UserPlus, Download, DollarSign, CheckCircle, ArrowRight } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: React.ElementType;
  benefits: string[];
}

const steps: Step[] = [
  {
    title: "Register as an Affiliate",
    description:
      "Join our thriving community of successful affiliates in minutes with our streamlined onboarding process.",
    icon: UserPlus,
    benefits: [
      "Exclusive discounts",
      "Access to promotional materials",
      "Premium affiliate perks"
    ]
  },
  {
    title: "Browse & Download Catalog",
    description:
      "Get immediate access to our vast collection of premium ethnic wear, with marketing materials and ready-to-use content.",
    icon: Download,
    benefits: [
      "High-resolution product images",
      "Ready-made social media content",
      "Regular catalog updates"
    ]
  },
  {
    title: "Sell & Earn",
    description:
      "Leverage your network to earn substantial commissions with our industry-leading commission structure.",
    icon: DollarSign,
    benefits: [
      "Up to 25% commission per sale",
      "Performance bonuses",
      "Multiple payout options"
    ]
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-bangladesh-green text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block mb-4 px-4 py-1 border border-tan rounded-full text-sm font-medium text-tan">
            Three Simple Steps
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white">
            Your Journey to Success
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Join thousands of successful affiliates who are already earning with our program. 
            Follow these three simple steps to start your profitable journey.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-24 left-0 w-full h-0.5 bg-tan/30 -z-10" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-tan text-bangladesh-green flex items-center justify-center font-bold text-lg">
                {index + 1}
              </div>

              <div className="group bg-black/10 backdrop-blur-sm border border-tan/20 p-8 h-full transition-all duration-300 hover:border-tan/50">
                {/* Icon */}
                <div className="mb-6">
                  <step.icon size={40} className="text-tan" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-serif mb-4 text-tan">
                  {step.title}
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {step.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-tan mt-0.5 flex-shrink-0" />
                      <span className="text-white/90">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link href="/register">
            <button className="inline-flex items-center bg-tan text-black px-8 py-4 font-medium hover:bg-white group transition-all duration-300">
              Start Your Journey Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};