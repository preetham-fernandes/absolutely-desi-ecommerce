"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItemProps {
  title: string
  href: string
  megaMenu?: React.ReactNode
}

export function NavItem({ title, href, megaMenu }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative group" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <Link
        href={href}
        className={cn("text-gray-300 hover:text-white flex items-center transition-all", isOpen && "text-white")}
      >
        {title}
        {megaMenu && (
          <ChevronDown className={cn("h-4 w-4 ml-1 transition-transform duration-200", isOpen && "rotate-180")} />
        )}
      </Link>

      {megaMenu && (
        <div
          className={cn(
            "absolute left-0 top-full pt-2 w-screen max-w-[90vw] transform opacity-0 -translate-y-2 pointer-events-none transition-all duration-200",
            isOpen && "opacity-100 translate-y-0 pointer-events-auto",
          )}
        >
          {megaMenu}
        </div>
      )}
    </div>
  )
}
