"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-black/95 text-white z-50 shadow-md">
      <nav className="relative max-w-full mx-auto px-6">
        <div className="flex items-center h-16">
          {/* Center Logo */}
          <Link
            href="/"
            className="absolute"
          >
            <Image
              src="/logo_ad.png"
              alt="Absolutely Desi Logo"
              width={200}
              height={50}
              priority
            />
          </Link>
          
          <div className="hidden sm:flex items-center justify-center space-x-6 pl-24 ml-56">
          <Link
            href="/women"
            className="text-gray-300 hover:text-white "
          >
            Women
          </Link>
            <Link
              href="/men"
              className="text-gray-300 hover:text-white px-3 py-2 transition-all"
            >
              Men
            </Link>
            <Link
              href="/boys"
              className="text-gray-300 hover:text-white px-3 py-2 transition-all"
            >
              Boys
            </Link>
            <Link
              href="/girls"
              className="text-gray-300 hover:text-white px-3 py-2 transition-all"
            >
              Girls
            </Link>
            <Link
              href="/accessories"
              className="text-gray-300 hover:text-white px-3 py-2 transition-all"
            >
              Accessories
            </Link>
            <Link
              href="/home-wear"
              className="text-gray-300 hover:text-white px-3 py-2 transition-all"
            >
              Home-wear
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="hidden sm:flex items-end justify-end space-x-6 pl-24 ml-auto">
            
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
