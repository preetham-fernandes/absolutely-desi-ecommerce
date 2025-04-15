"use client"

import Link from "next/link"
import { NavItem } from "@/components/navigation/NavItem"
import { MegaMenu } from "@/components/navigation/MegaMenu"
import {
  womenMenuData,
  menMenuData,
  boysMenuData,
  girlsMenuData,
  accessoriesMenuData,
  homeWearMenuData,
} from "@/components/navigation/megaMenuData"
import { ThemeToggle } from "@/components/providers/theme-toggle"

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80 text-black dark:text-white z-50 shadow-md">
      <nav className="relative max-w-full mx-auto px-6 py-1">
        <div className="flex items-center h-16 w-full">
          {/* Center Logo */}
          <Link href="/" className="absolute font-serif text-2xl text-black dark:text-white">
            ABSOLUTELY DESI
          </Link>

          {/* Navigation Links */}
          <div className="hidden sm:flex items-center justify-center space-x-6 pl-24 ml-56">
            <NavItem
              title="Women"
              href="/women"
              megaMenu={<MegaMenu sections={womenMenuData.sections} featuredItems={womenMenuData.featuredItems} />}
            />
            <NavItem
              title="Men"
              href="/men"
              megaMenu={<MegaMenu sections={menMenuData.sections} featuredItems={menMenuData.featuredItems} />}
            />
            <NavItem title="Boys" href="/boys" megaMenu={<MegaMenu sections={boysMenuData.sections} />} />
            <NavItem title="Girls" href="/categories/girls" megaMenu={<MegaMenu sections={girlsMenuData.sections} />} />
            <NavItem
              title="Accessories"
              href="/accessories"
              megaMenu={<MegaMenu sections={accessoriesMenuData.sections} />}
            />
            <NavItem
              title="Home-wear"
              href="/home-wear"
              megaMenu={<MegaMenu sections={homeWearMenuData.sections} />}
            />
          </div>

          {/* Right Navigation */}
          <div className="hidden sm:flex items-center justify-end space-x-4 ml-auto">
            <ThemeToggle />
            <Link href="/register" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 transition-all">
              <button className="bg-black dark:bg-white text-white dark:text-black font-medium px-6 py-2 rounded-full shadow-md border border-maroon-600 hover:bg-gray-800 dark:hover:bg-gray-100 hover:border-maroon-700 transition-all">
                Become an Affiliate
              </button>
            </Link>
            <Link href="/obm-admin/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 transition-all">
              <button className="bg-black dark:bg-white text-white dark:text-black font-medium px-6 py-2 rounded-full shadow-md border border-maroon-600 hover:bg-gray-800 dark:hover:bg-gray-100 hover:border-maroon-700 transition-all">
                Admin
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}