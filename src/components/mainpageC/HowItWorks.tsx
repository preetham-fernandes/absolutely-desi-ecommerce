import React from "react";
import Link from "next/link";
import { UserPlus, Download, DollarSign, DivideIcon as LucideIcon, CheckCircle, ArrowRight, Rocket } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
}

const steps: Step[] = [
  {
    title: "Register as an Affiliate",
    description:
      "Join our thriving community of successful affiliates in minutes. Our streamlined onboarding process ensures you're ready to start earning quickly.",
    icon: UserPlus,
    benefits: [
      "Exclusive discounts",
      "Access to promotional materials",
      "Access to affiliate perks"
    ]
  },
  {
    title: "Browse & Download Catalog",
    description:
      "Get immediate access to our vast collection of premium ethnic wear, complete with marketing materials and ready-to-use content.",
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
      "Leverage your network to earn substantial commissions. Our industry-leading commission structure and quick payment system ensure maximum earnings.",
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
    <section className="py-20 bg-gradient-to-b from-[#000000] to-[#000000] text-[#F7F7F7]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F7F7F7]/10 rounded-full px-4 py-2 mb-6">
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-medium">Start Earning Today</span>
          </div>
          <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r text-[#F7F7F7] ">
            Your Journey to Success
          </h2>
          <p className="text-[#B2B2B2] text-base max-w-2xl mx-auto">
            Join thousands of successful affiliates who are already earning with our program. 
            Follow these three simple steps to start your profitable journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#000000] via-[#B2B2B2] to-[#F7F7F7] -translate-y-1/2" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
            >
              <div className="bg-[#F7F7F7]/5 backdrop-blur-xl rounded-2xl p-8 h-full border border-[#F7F7F7]/10 hover:border-[#F7F7F7]/20 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#B2B2B2] to-[#F7F7F7] rounded-full flex items-center justify-center font-bold text-lg shadow-lg text-[#000000]">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-[#F7F7F7]/10 to-[#F7F7F7]/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon size={32} className="text-[#F7F7F7]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-[#F7F7F7] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#B2B2B2] group-hover:to-[#F7F7F7] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-[#B2B2B2] leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-3">
                    {step.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-[#B2B2B2]">
                        <CheckCircle className="w-5 h-5 text-[#F7F7F7]" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/register"
            className="text-[#B2B2B2] hover:text-[#F7F7F7] px-3 py-2 transition-all"
          >
            <button className="inline-flex items-center gap-3 bg-gradient-to-r from-[#000000] to-[#B2B2B2] text-[#F7F7F7] px-8 py-4 rounded-full font-medium hover:from-[#B2B2B2] hover:to-[#000000] transition-all duration-300 transform hover:-translate-y-1">
              Start Your Journey Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
