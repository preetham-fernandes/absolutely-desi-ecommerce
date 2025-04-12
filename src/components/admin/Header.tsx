// src/components/admin/Header.tsx
"use client";

import Link from 'next/link';
import { ThemeToggle } from '@/components/providers/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Menu } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-3 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-2">
      <button onClick={toggleSidebar} className="md:hidden">
        {/* Hamburger Icon or any sidebar toggle icon */}
        ☰
      </button>
        
        <Link href="/obm-admin/dashboard" className="font-bold text-lg md:text-xl text-primary flex items-center gap-2">
          <span>Absolutely Desi</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        
        <ThemeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/dashboard/profile" className="flex w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/dashboard/settings" className="flex w-full">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <Link href="/" className="flex w-full">Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}