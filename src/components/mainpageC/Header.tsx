// src/components/mainpageC/Header.tsx
"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { NavItem } from "@/components/navigation/NavItem"
import { MegaMenu } from "@/components/navigation/MegaMenu"
import {
  womenMenuData, menMenuData, boysMenuData, girlsMenuData, 
  accessoriesMenuData, homeWearMenuData,
} from "@/components/navigation/megaMenuData"
import { Search, ShoppingCartIcon, Heart, User, ChevronDown, Menu, X } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

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

  const handleLogout = async () => {
    try {
      await logout();
      // No need to redirect since we're already on the root page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
          <div className="hidden md:flex items-center space-x-4">
            
            {isAuthenticated ? (
              /* Authenticated user actions */
              <div className="flex items-center gap-4">
                {/* User profile dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-2 flex items-center gap-2 text-white hover:text-tan transition-colors">
                      <User size={20} />
                      <span className="text-sm hidden md:inline-block">{user?.name?.split(' ')[0]}</span>
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[200px]">
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="cursor-pointer">Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="cursor-pointer">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Wishlist */}
                <Link href="/wishlist" className="p-2 text-white hover:text-tan transition-colors">
                  <Heart size={20} />
                </Link>
                
                {/* Bag/Cart */}
                <Link href="/cart" className="p-2 text-white hover:text-tan transition-colors">
                  <ShoppingCartIcon size={20} />
                </Link>
              </div>
            ) : (
              /* Non-authenticated user actions */
              <div className="flex items-center gap-3">
                <Link 
                  href="/login" 
                  className="border border-tan text-tan px-4 py-1.5 rounded-none hover:bg-tan hover:text-black transition-all"
                >
                  Login
                </Link>
                
                <Link 
                  href="/register" 
                  className="bg-bangladesh-green text-white px-4 py-1.5 rounded-none hover:bg-tan hover:text-black transition-all"
                >
                  Become an Affiliate
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm py-6 px-4 mt-2 shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link href="/women" className="text-white hover:text-tan py-2">Women</Link>
              <Link href="/men" className="text-white hover:text-tan py-2">Men</Link>
              <Link href="/boys" className="text-white hover:text-tan py-2">Boys</Link>
              <Link href="/girls" className="text-white hover:text-tan py-2">Girls</Link>
              <Link href="/accessories" className="text-white hover:text-tan py-2">Accessories</Link>
              <Link href="/home-wear" className="text-white hover:text-tan py-2">Home-wear</Link>
            </div>
            
            <div className="flex flex-col space-y-4 mt-6 pt-6 border-t border-gray-800">
              
              {isAuthenticated ? (
                /* Mobile authenticated user actions */
                <>
                  <Link href="/account" className="text-white hover:text-tan py-2 flex items-center">
                    <User size={20} className="mr-2" />
                    {user?.name?.split(' ')[0]}
                  </Link>
                  <Link href="/orders" className="text-white hover:text-tan py-2">Orders</Link>
                  <Link href="/wishlist" className="text-white hover:text-tan py-2 flex items-center">
                    <Heart size={20} className="mr-2" />
                    Wishlist
                  </Link>
                  <Link href="/cart" className="text-white hover:text-tan py-2 flex items-center">
                    <ShoppingCartIcon size={20} className="mr-2" />
                    Cart
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-white hover:text-tan py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                /* Mobile non-authenticated user actions */
                <>
                  <Link href="/login" className="border border-tan text-tan py-2 px-4 text-center hover:bg-tan hover:text-black">
                    Login
                  </Link>
                  
                  <Link href="/register" className="bg-bangladesh-green text-white py-2 px-4 text-center hover:bg-tan hover:text-black">
                    Become an Affiliate
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}