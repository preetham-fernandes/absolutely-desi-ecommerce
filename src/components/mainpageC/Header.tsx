"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
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
import { Search, ShoppingBag, Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-black/95 backdrop-blur-sm shadow-md py-2" 
        : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-tan font-serif text-2xl md:text-3xl">
            ABSOLUTELY DESI
          </Link>

          {/* Mobile menu toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
            <NavItem title="Girls" href="/girls" megaMenu={<MegaMenu sections={girlsMenuData.sections} />} />
            <NavItem 
              title="Boys" 
              href="/boys" 
              megaMenu={<MegaMenu sections={boysMenuData.sections} />} 
            />
            <NavItem 
              title="Girls" 
              href="/categories/girls" 
              megaMenu={<MegaMenu sections={girlsMenuData.sections} />} 
            />
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

          {/* Right actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-white hover:text-tan transition-colors">
              <Search size={20} />
            </button>
            
            <Link 
              href="/register" 
              className="bg-bangladesh-green text-white px-6 py-2 rounded-none hover:bg-tan hover:text-black transition-all"
            >
              Become an Affiliate
            </Link>
            
            <Link 
              href="/obm-admin/dashboard" 
              className="border border-tan text-tan px-6 py-2 rounded-none hover:bg-tan hover:text-black transition-all"
            >
              Admin
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm py-6 px-4 mt-2 shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link href="/women" className="text-white hover:text-tan py-2">Women</Link>
              <Link href="/men" className="text-white hover:text-tan py-2">Men</Link>
              <Link href="/boys" className="text-white hover:text-tan py-2">Boys</Link>
              <Link href="/categories/girls" className="text-white hover:text-tan py-2">Girls</Link>
              <Link href="/accessories" className="text-white hover:text-tan py-2">Accessories</Link>
              <Link href="/home-wear" className="text-white hover:text-tan py-2">Home-wear</Link>
            </div>
            
            <div className="flex flex-col space-y-4 mt-6 pt-6 border-t border-gray-800">
              <button className="text-white hover:text-tan flex items-center py-2">
                <Search size={20} className="mr-2" />
                Search
              </button>
              
              <Link href="/register" className="bg-bangladesh-green text-white py-2 px-4 text-center hover:bg-tan hover:text-black">
                Become an Affiliate
              </Link>
              
              <Link href="/obm-admin/dashboard" className="border border-tan text-tan py-2 px-4 text-center hover:bg-tan hover:text-black">
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}