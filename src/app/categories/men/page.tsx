'use client'
import React, { useState } from 'react';
import { ChevronRight, Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';

const MensLandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="text-2xl font-bold text-rose-600">Absolutely Desi</div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-rose-600">Women</a>
                <a href="#" className="text-rose-600 font-medium">Men</a>
                <a href="#" className="text-gray-500 hover:text-rose-600">Kids</a>
                <a href="#" className="text-gray-500 hover:text-rose-600">Accessories</a>
                <a href="#" className="text-gray-500 hover:text-rose-600">Home-wear</a>
              </nav>
            </div>

            {/* Search and Icons */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center w-64 h-10 bg-gray-100 rounded-full px-4">
                <Search className="h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search for products" 
                  className="bg-transparent ml-2 outline-none w-full text-sm"
                />
              </div>
              <div className="flex items-center space-x-4">
                <a href="#" className="hidden md:block text-gray-700 hover:text-rose-600">
                  <User className="h-6 w-6" />
                </a>
                <a href="#" className="hidden md:block text-gray-700 hover:text-rose-600">
                  <Heart className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-700 hover:text-rose-600">
                  <ShoppingBag className="h-6 w-6" />
                </a>
                <button 
                  className="md:hidden text-gray-700"
                  onClick={toggleMobileMenu}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center w-full bg-gray-100 rounded-full px-4 mb-4">
                <Search className="h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search for products" 
                  className="bg-transparent ml-2 outline-none w-full text-sm p-2"
                />
              </div>
              <nav className="flex flex-col space-y-3 pb-4">
                <a href="#" className="text-gray-500 hover:text-rose-600 py-2">Women</a>
                <a href="#" className="text-rose-600 font-medium py-2">Men</a>
                <a href="#" className="text-gray-500 hover:text-rose-600 py-2">Kids</a>
                <a href="#" className="text-gray-500 hover:text-rose-600 py-2">Accessories</a>
                <a href="#" className="text-gray-500 hover:text-rose-600 py-2">Home-wear</a>
                <a href="#" className="text-gray-500 hover:text-rose-600 py-2 flex items-center">
                  <User className="h-5 w-5 mr-2" /> Profile
                </a>
                <a href="#" className="text-gray-500 hover:text-rose-600 py-2 flex items-center">
                  <Heart className="h-5 w-5 mr-2" /> Wishlist
                </a>
              </nav>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50">
            <div className="container mx-auto px-4 py-12 md:py-20">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                    Traditional Elegance for the Modern Man
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Discover authentic Indian wear, handcrafted with love and tradition
                  </p>
                  <button className="bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700 transition">
                    Shop Now
                  </button>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="Men's Traditional Wear" 
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center space-x-4 space-y-2 md:space-y-0">
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-rose-600">All Men</a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-rose-600">Kurta</a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-rose-600">Sherwani</a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-rose-600">Jacket</a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-rose-600">Festive Wear</a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-rose-600">Wedding Collection</a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-rose-600">Accessories</a>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Kurta */}
              <div className="group relative overflow-hidden rounded-lg shadow-md bg-white">
                <img 
                  src="/api/placeholder/400/500" 
                  alt="Men's Kurta Collection" 
                  className="w-full h-80 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Kurta Collection</h3>
                    <p className="text-white/80 mb-4">Elegant comfort for every occasion</p>
                    <a href="#" className="inline-flex items-center text-white hover:text-rose-300 transition">
                      Explore <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Sherwani */}
              <div className="group relative overflow-hidden rounded-lg shadow-md bg-white">
                <img 
                  src="/api/placeholder/400/500" 
                  alt="Men's Sherwani Collection" 
                  className="w-full h-80 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Sherwani Collection</h3>
                    <p className="text-white/80 mb-4">Regal styles for special moments</p>
                    <a href="#" className="inline-flex items-center text-white hover:text-rose-300 transition">
                      Explore <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Jacket */}
              <div className="group relative overflow-hidden rounded-lg shadow-md bg-white">
                <img 
                  src="/api/placeholder/400/500" 
                  alt="Men's Jacket Collection" 
                  className="w-full h-80 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Jacket Collection</h3>
                    <p className="text-white/80 mb-4">Traditional craftsmanship meets modern style</p>
                    <a href="#" className="inline-flex items-center text-white hover:text-rose-300 transition">
                      Explore <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Banner */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src="/api/placeholder/1200/300" 
                alt="Special Offer" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center">
                <div className="px-8 md:px-16">
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Wedding Season Sale</h2>
                  <p className="text-white/90 mb-6 max-w-md">25% off for affiliates on our exclusive wedding collection</p>
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition">
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Now */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Trending Now</h2>
              <a href="#" className="text-rose-600 hover:text-rose-700 inline-flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {/* Product Cards */}
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group">
                  <div className="relative rounded-lg overflow-hidden">
                    <img 
                      src="/api/placeholder/300/400" 
                      alt={`Trending Product ${item}`} 
                      className="w-full h-80 object-cover group-hover:scale-105 transition duration-300"
                    />
                    <button className="absolute top-3 right-3 text-gray-700 hover:text-rose-600 bg-white/80 p-2 rounded-full">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-sm text-gray-400">Traditional</h3>
                    <h4 className="font-medium text-gray-800 mb-1">Premium Embroidered Kurta</h4>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-gray-900">₹1,799</span>
                        <span className="text-sm text-gray-500 line-through ml-2">₹2,399</span>
                      </div>
                      <span className="text-green-600 text-sm">25% Off</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shop by Occasion */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Shop by Occasion</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Occasion Cards */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src="/api/placeholder/300/200" 
                  alt="Wedding" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-medium text-gray-800">Wedding</h3>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src="/api/placeholder/300/200" 
                  alt="Festival" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-medium text-gray-800">Festival</h3>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src="/api/placeholder/300/200" 
                  alt="Formal" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-medium text-gray-800">Formal</h3>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src="/api/placeholder/300/200" 
                  alt="Casual" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-medium text-gray-800">Casual</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Brands */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Featured Brands</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Brand Logos */}
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition">
                  <div className="text-xl font-medium text-gray-500">Brand {item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Affiliate Banner */}
        <section className="py-12 bg-rose-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Become an Affiliate Partner
                </h2>
                <p className="text-gray-600 mb-6 max-w-md">
                  Join our affiliate program and earn 25% commission on every sale. Download product catalogs and promote authentic Indian fashion.
                </p>
                <button className="bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700 transition">
                  Register Now
                </button>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/api/placeholder/500/300" 
                  alt="Affiliate Program" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Absolutely Desi</h3>
              <p className="text-gray-400">
                Authentic Indian ethnic wear for the modern wardrobe.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Women</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Men</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Kids</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Accessories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Home-wear</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Shipping Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Returns & Exchanges</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Affiliate Program</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                </a>
              </div>
              <h4 className="font-medium mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your Email"
                  className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-white w-full"
                />
                <button className="bg-rose-600 text-white px-4 py-2 rounded-r-md hover:bg-rose-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Absolutely Desi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MensLandingPage;