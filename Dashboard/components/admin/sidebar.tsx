"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Building, FileText, Home, Settings } from "lucide-react"

interface SidebarProps {
  open: boolean
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Properties", href: "/admin/properties", icon: Building },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "Site Content", href: "/admin/site-content", icon: Settings },
]

export function Sidebar({ open }: SidebarProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("bg-white h-[calc(100vh-4rem)] border-r transition-all duration-300", open ? "w-64" : "w-20")}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-[#003366] text-white"
                    : "text-gray-700 hover:text-[#003366] hover:bg-[#F5F6FA]",
                )}
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                {open && <span>{item.name}</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

