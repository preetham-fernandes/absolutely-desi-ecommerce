// src/app/obm-admin/layout.tsx
"use client";

import { ReactNode, useState, useEffect } from 'react';
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      <div className="flex flex-1 h-[calc(100vh-64px)] ">
        {/* Sidebar */}
        <div>
          <Sidebar />
        </div>
        
        {/* Main content */}
        <main className={`flex-1 `}>
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
          <div className='p-4 md:p-6 overflow-y-auto'>
          {children}
        </div>
        </main>
      </div>
    </div>
  );
}