// src/app/(user)/account/page.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Heart, ShoppingBag, User, Settings } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-4">My Account</h1>
      <p className="text-muted-foreground mb-8">
        Welcome back, {user?.name}!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/orders">
          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Orders</CardTitle>
              <Package size={20} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View your order history</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/wishlist">
          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Wishlist</CardTitle>
              <Heart size={20} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Products you've saved</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/cart">
          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Cart</CardTitle>
              <ShoppingBag size={20} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Items ready for checkout</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/account/profile">
          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Profile</CardTitle>
              <User size={20} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage your personal information</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/account/settings">
          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Settings</CardTitle>
              <Settings size={20} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Account preferences and settings</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <div className="mt-10">
        <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
      </div>
    </div>
  );
}