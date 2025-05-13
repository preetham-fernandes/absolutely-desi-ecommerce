// src/app/(user)/orders/page.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // In a real app, fetch from API
        // const response = await fetch('/api/orders');
        // const data = await response.json();
        // setOrders(data.orders);
        
        // For now, using dummy data
        setTimeout(() => {
          setOrders([]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="container mx-auto py-20 px-4 text-center">Loading orders...</div>;
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-block p-4 rounded-full bg-muted mb-4">
            <Package size={40} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-4">No orders yet</h2>
          <p className="text-muted-foreground mb-6">
            When you place an order, it will appear here.
          </p>
          <Button asChild>
            <a href="/products">Start Shopping</a>
          </Button>
        </div>
      ) : (
        <div>
          {/* Orders would go here */}
        </div>
      )}
    </div>
  );
}