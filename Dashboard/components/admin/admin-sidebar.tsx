"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building, FileText, MessageSquare, Users, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/properties", label: "Properties", icon: Building },
  { href: "/admin/posts", label: "Blog Posts", icon: FileText },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700",
              pathname === item.href && "bg-gray-700",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
        <button
          onClick={logout}
          className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700 w-full text-left"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  )
}

