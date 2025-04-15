// components/Footer.tsx
import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-white dark:from-black dark:to-black text-black dark:text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Absolutely Desi is your premier destination for authentic Indian
              ethnic wear affiliate marketing.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  Affiliate Program
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer" />
              <Twitter className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer" />
              <Instagram className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer" />
              <Youtube className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded-l-md w-full"
              />
              <button className="bg-maroon-600 px-4 py-2 rounded-r-md hover:bg-maroon-700">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 Absolutely Desi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};