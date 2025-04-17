"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Download, IndianRupeeIcon, CheckCircle, ArrowRight, Rocket, Mail, Lock, User, Phone, IndianRupee } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: React.ElementType;
  benefits: string[];
}

const steps: Step[] = [
  {
    title: "Register as an Affiliate",
    description: "Join our thriving community of successful affiliates in minutes.",
    icon: UserPlus,
    benefits: [
      "Instant account activation",
      "Access to affiliate perks"
    ]
  },
  {
    title: "Browse & Download Catalog",
    description: "Access our premium ethnic wear collection instantly.",
    icon: Download,
    benefits: [
      "High-resolution product images",
      "Detailed size guides",
    ]
  },
  {
    title: "Sell & Earn",
    description: "Start earning substantial commissions on every sale.",
    icon: IndianRupeeIcon,
    benefits: [
      "Up to 25% commission per sale",
      "Multiple payout options"
    ]
  },
];

const Register: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    try {
      // your registration logic here
  
      // On success, redirect to login
      router.push("/verification");
    } catch (error) {
      // handle error
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Affiliate Program Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white p-12 flex-col justify-between">
        <div>
          {/* <div className="inline-flex items-center gap-2 bg-red-950/30 rounded-full px-4 py-2 mb-6">
            <Rocket className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium">Start Earning Today</span>
          </div> */}
          <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
            Your Journey to Success
          </h2>
          <p className="text-gray-400 text-base mb-8">
            Join thousands of successful affiliates who are already earning with our program.
          </p>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.title} className="bg-red-950/10 backdrop-blur-xl rounded-xl p-6 border border-red-500/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center shrink-0">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{step.description}</p>
                    <div className="space-y-2">
                      {step.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-red-500" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4 text-sm text-gray-400">
          <span>Already earning with us?</span>
          <button className="text-red-500 hover:text-red-400 transition-colors">
            View success stories
          </button>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 bg-zinc-950 px-12 py-3 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Your Account</h2>
            <p className="text-gray-400">Start your journey as an affiliate partner</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white placeholder-gray-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white placeholder-gray-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="phone">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white placeholder-gray-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white placeholder-gray-500"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white placeholder-gray-500"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-900 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Create Account
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <button className="text-red-500 hover:text-red-400 font-medium">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;