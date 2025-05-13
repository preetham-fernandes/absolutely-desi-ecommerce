// src/app/(user)/cart/page.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch cart items
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        // In a real app, fetch from API
        // const response = await fetch('/api/cart');
        // const data = await response.json();
        // setCartItems(data.items);
        
        // For now, using dummy data
        setTimeout(() => {
          setCartItems([]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return <div className="container mx-auto py-20 px-4 text-center">Loading cart...</div>;
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-block p-4 rounded-full bg-muted mb-4">
            <ShoppingBag size={40} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <a href="/products">Explore Products</a>
          </Button>
        </div>
      ) : (
        <div>
          {/* Cart items would go here */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline">Continue Shopping</Button>
            <Button>Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}