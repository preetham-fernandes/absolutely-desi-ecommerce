// src/app/(user)/wishlist/page.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch wishlist items
    const fetchWishlistItems = async () => {
      try {
        setLoading(true);
        // In a real app, fetch from API
        // const response = await fetch('/api/wishlist');
        // const data = await response.json();
        // setWishlistItems(data.items);
        
        // For now, using dummy data
        setTimeout(() => {
          setWishlistItems([]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, []);

  if (loading) {
    return <div className="container mx-auto py-20 px-4 text-center">Loading wishlist...</div>;
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-block p-4 rounded-full bg-muted mb-4">
            <Heart size={40} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-4">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Save items you love to your wishlist. Review them anytime and easily move them to the cart.
          </p>
          <Button asChild>
            <a href="/products">Explore Products</a>
          </Button>
        </div>
      ) : (
        <div>
          {/* Wishlist items would go here */}
        </div>
      )}
    </div>
  );
}