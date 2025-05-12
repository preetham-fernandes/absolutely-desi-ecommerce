import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bangladesh-green text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-2xl font-serif text-tan">ABSOLUTELY DESI</h2>
            </Link>
            <p className="text-white/80 mb-6 max-w-md">
              Your premier destination for authentic Indian ethnic wear affiliate marketing. We connect fashion entrepreneurs with premium quality products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-tan/70 hover:text-tan transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-tan/70 hover:text-tan transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-tan/70 hover:text-tan transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-tan/70 hover:text-tan transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-serif mb-6 text-tan">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/70 hover:text-tan transition-colors inline-flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/affiliate-program" className="text-white/70 hover:text-tan transition-colors inline-flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> Affiliate Program
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-tan transition-colors inline-flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-white/70 hover:text-tan transition-colors inline-flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-tan transition-colors inline-flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-serif mb-6 text-tan">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/women" className="text-white/70 hover:text-tan transition-colors inline-flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> Women
                </Link>
              </li>
              <li>
                <Link href="/men" className="text-white/70 hover:text-tan transition-colors inline-flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> Men
                </Link>
              </li>
              <li>
                <Link href="/boys" className="text-white/70 hover:text-tan transition-colors inline-flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> Boys
                </Link>
              </li>
              <li>
                <Link href="/girls" className="text-white/70 hover:text-tan transition-colors inline-flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> Girls
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="text-white/70 hover:text-tan transition-colors inline-flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> Accessories
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-serif mb-6 text-tan">Contact Us</h3>
            <ul className="space-y-3">
              <li className="text-white/70">
                1234 Fashion Street,<br />
                Mumbai, Maharashtra,<br />
                India - 400001
              </li>
              <li>
                <a href="mailto:info@absolutelydesi.com" className="text-white/70 hover:text-tan transition-colors">
                  info@absolutelydesi.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="text-white/70 hover:text-tan transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-serif mb-6 text-tan">Newsletter</h3>
            <p className="text-white/70 mb-4">
              Subscribe to receive updates on new arrivals and special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-2 focus:outline-none focus:border-tan w-full"
              />
              <button className="bg-tan text-black px-4 py-2 hover:bg-white transition-all">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-tan/10 py-6">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Absolutely Desi. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-tan text-sm transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-tan text-sm transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-white/70 hover:text-tan text-sm transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};