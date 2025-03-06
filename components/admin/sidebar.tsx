"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Building, FileText, Home, Settings, HelpCircle, Menu, X } from "lucide-react"

interface SidebarProps {
  open: boolean
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Properties", href: "/admin/properties", icon: Building },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "Site Content", href: "/admin/site-content", icon: Settings },
  { name: "Help", href: "/admin/help", icon: HelpCircle },
]

export function Sidebar({ open }: SidebarProps) {
  const pathname = usePathname()

  return (
    <nav className={`bg-white h-full border-r transition-all duration-300 ${open ? "w-64" : "w-20"}`}>
      <div className="space-y-4 py-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname === item.href ? "bg-[#003366] text-white" : "text-gray-700 hover:text-[#003366] hover:bg-[#F5F6FA]"}`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {open && <span>{item.name}</span>}
          </Link>
        ))}
      </div>
    </nav>
  )
}

