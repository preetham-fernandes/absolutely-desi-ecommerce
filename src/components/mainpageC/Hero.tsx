"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      image: "/cbg.png",
      title: "Elegance Redefined",
      subtitle: "Authentic Indian Ethnic Wear"
    },
    {
      image: "/cbg2.png",
      title: "Tradition Meets Style",
      subtitle: "Curated Collection For Every Occasion"
    },
    {
      image: "/cbg4.png",
      title: "Affiliate With Luxury",
      subtitle: "Join Our Exclusive Network Today"
    }
  ]
  
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="relative min-h-screen">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            {/* Overlay with black background for dark mode */}
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
            <div className="max-w-4xl mx-auto text-center pt-20">
              <h1 className="text-5xl md:text-7xl font-serif mb-4 opacity-0 animate-fade-in text-tan" style={{animationDelay: '0.5s'}}>
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-0 animate-fade-in" style={{animationDelay: '0.8s'}}>
                {slide.subtitle}
              </p>
              <div className="opacity-0 animate-fade-in" style={{animationDelay: '1.1s'}}>
                <Link 
                  href="/register" 
                  className="inline-flex items-center bg-tan text-black px-8 py-3 hover:bg-bangladesh-green hover:text-white transition-all duration-300"
                >
                  Become an Affiliate
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-tan w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            })
          }}
          aria-label="Scroll down"
          className="text-tan"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
      
      {/* Marquee */}
      <div className="absolute bottom-0 w-full bg-bangladesh-green py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-white text-base md:text-lg tracking-wide">
          {Array(3).fill("").map((_, i) => (
            <span key={i} className="mx-3">
              END OF SEASON SALE IS LIVE 
              <span className="mx-4 text-tan font-medium">
                25% OFF FOR AFFILIATES 
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}