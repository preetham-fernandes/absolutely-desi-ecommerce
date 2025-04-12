// src/components/admin/Sidebar.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  User, 
  Settings,
  ChevronDown,
  ChevronRight,
  Package,
  ShoppingCart,
  CreditCard,
  Truck,
  BarChart3,
} from 'lucide-react';
import { useState, useEffect } from 'react';

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  submenu?: NavItem[];
};

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/obm-admin/dashboard',
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: 'Analytics',
    href: '/obm-admin/analytics',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: 'Product management',
    href: '/obm-admin/manage-products',
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: 'Order management',
    href: '/obm-admin/manage-orders',
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    title: 'Payments & Transactions',
    href: '/obm-admin/payments',
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: 'Settings',
    href: '/obm-admin/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  // Automatically expand the active submenu
  useEffect(() => {
    const checkPathAndOpenMenu = () => {
      navItems.forEach(item => {
        if (item.submenu && pathname.startsWith(item.href)) {
          setOpenMenus(prev => ({ ...prev, [item.title]: true }));
        }
      });
    };
    
    checkPathAndOpenMenu();
    
    // Check if mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [pathname]);

  const toggleSubmenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className="w-64 md:w-64 border-r border-border bg-card h-full ">
      <div className="py-4 px-3">
        
          <div className="flex items-center mb-6 px-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Admin </h3>
              <p className="text-xs text-muted-foreground">admin@gmail.com</p>
            </div>
          </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isOpen = openMenus[item.title];
            
            return (
              <div key={item.href} className="space-y-1">
                {hasSubmenu ? (
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "flex items-center w-full rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-accent text-accent-foreground" 
                        : "hover:bg-accent/50 hover:text-accent-foreground"
                    )}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="flex-1 text-left">{item.title}</span>
                    {isOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-accent text-accent-foreground" 
                        : "hover:bg-accent/50 hover:text-accent-foreground"
                    )}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                )}
                
                {hasSubmenu && isOpen && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.submenu?.map((subItem) => {
                      const isSubActive = pathname === subItem.href || pathname.startsWith(subItem.href);
                      
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            isSubActive 
                              ? "bg-accent text-accent-foreground" 
                              : "hover:bg-accent/50 hover:text-accent-foreground"
                          )}
                        >
                          <span className="mr-3">{subItem.icon}</span>
                          <span>{subItem.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}