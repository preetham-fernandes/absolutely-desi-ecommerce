"use client"
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export function Hero() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Initialize theme based on user's system preference or local storage
  useEffect(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // If no saved preference, check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/cbg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "initial"
        }}
      >
        {/* Overlay that changes with theme */}
        <div className="absolute inset-0 bg-white/0 dark:bg-black/40 transition-colors duration-300" />
      </div>
      
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/50 dark:bg-white/20 text-white dark:text-gray-200 z-10 backdrop-blur-sm transition-colors duration-300"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun size={24} className="text-yellow-300" />
        ) : (
          <Moon size={24} className="text-blue-200" />
        )}
      </button>
      
      <div className="relative h-full flex flex-col items-center justify-center text-white dark:text-gray-100 px-4">
        <h1 className={cn(
          "text-5xl md:text-7xl font-serif text-center",
          "tracking-wider leading-tight mb-6"
        )}>
          <br />
        </h1>
        
        {/* Marquee section with theme transition */}
        <div className="absolute bottom-0 w-full bg-black dark:bg-black py-0 overflow-hidden transition-colors duration-300">
          <div className="animate-marquee whitespace-nowrap text-white text-lg tracking-wide">
            {Array(3).fill("").map((_, i) => (
              <span key={i} className="mx-3">
                END OF SEASON SALE IS LIVE 
                <span className="mx-4">
                  25% OFF FOR AFFILIATES 
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}