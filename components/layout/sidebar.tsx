"use client"

import Link from "next/link"
import { useRouter } from "next/router"
import { LayoutDashboard, Home, FileText, Image, Users, Settings } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Properties", href: "/admin/properties", icon: Home },
  { name: "Posts", href: "/admin/posts", icon: FileText },
  { name: "Media", href: "/admin/media", icon: Image },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function Sidebar({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const router = useRouter()

  return (
    <div
      className={`${
        open ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 overflow-y-auto transition duration-300 ease-in-out transform lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-center h-16 bg-gray-900 dark:bg-gray-700">
        <span className="text-white text-2xl font-semibold">Admin CMS</span>
      </div>
      <nav className="mt-5">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-6 py-2 mt-4 duration-200 border-l-4 ${
              router.pathname === item.href
                ? "bg-gray-100 dark:bg-gray-700 border-blue-500 text-blue-500"
                : "border-transparent hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="mx-4">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

