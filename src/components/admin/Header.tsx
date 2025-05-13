// src/components/admin/Header.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Menu, Settings, UserCircle } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="h-16 border-b border-zinc-800 bg-black flex items-center justify-between px-3 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleSidebar} 
          className="md:hidden text-tan hover:text-teal transition-colors p-1"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <Link href="/obm-admin/dashboard" className="font-serif font-bold text-lg md:text-xl text-tan flex items-center gap-2">
          <span>ABSOLUTELY DESI</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full border border-zinc-800 hover:bg-zinc-900 hover:text-tan transition-colors"
            >
              <User className="h-5 w-5 text-teal" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="bg-zinc-950 border border-zinc-800 text-white"
          >
            <DropdownMenuLabel className="text-tan font-serif">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="hover:bg-zinc-900 focus:bg-zinc-900 hover:text-teal focus:text-teal">
              <UserCircle className="mr-2 h-4 w-4" />
              <Link href="/dashboard/profile" className="flex w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="hover:bg-zinc-900 focus:bg-zinc-900 hover:text-teal focus:text-teal">
              <Settings className="mr-2 h-4 w-4" />
              <Link href="/dashboard/settings" className="flex w-full">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="text-tan hover:bg-zinc-900 focus:bg-zinc-900">
              <LogOut className="mr-2 h-4 w-4" />
              <Link href="/" className="flex w-full">Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}