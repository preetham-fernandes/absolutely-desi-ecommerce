"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-black/95 text-white z-50 shadow-md">
      <nav className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Featured Button */}
          <Link
            href="/featured"
            className="text-white font-medium hover:text-gray-300 pl-4 absolute left-0"
          >
            Featured
          </Link>
          <div className="hidden sm:flex items-center space-x-6 pl-24">
            <Link
              href="/men"
              className="text-gray-300 hover:text-white px-3 py-2 transition-all"
            >
              Men
            </Link>
            <Link
              href="/products/lehenga"
              className="text-gray-300 hover:text-white px-3 py-2 transition-all"
            >
              Women
            </Link>
          </div>

          {/* Center Logo */}
          <Link
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2"
          >
            <Image
              src="/logo_ad.png"
              alt="Absolutely Desi Logo"
              width={200}
              height={50}
              priority
            />
          </Link>

          {/* Right Navigation */}
          <div className="hidden sm:flex items-center space-x-6 pl-24">
            <Link
              href="/men"
              className="text-gray-300 hover:text-white px-3 py-2 transition-all"
            >
              Kids
            </Link>
            <Link
              href="/men"
              className="text-gray-300 hover:text-white px-3 py-2 transition-all"
            >
              Accessories
            </Link>
            <Link
              href="/register"
              className="text-gray-300 hover:text-white px-3 py-2 transition-all"
            >
              <button className="bg-white text-black font-medium px-6 py-2 rounded-full shadow-md border border-maroon-600 hover:bg-gray-100 hover:border-maroon-700 transition-all">
              Become an Affiliate
            </button>
            </Link>
            <Link
              href="/obm-admin/dashboard"
              className="text-gray-300 hover:text-white px-3 py-2 transition-all"
            >
              <button className="bg-white text-black font-medium px-6 py-2 rounded-full shadow-md border border-maroon-600 hover:bg-gray-100 hover:border-maroon-700 transition-all">
              Admin
            </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
