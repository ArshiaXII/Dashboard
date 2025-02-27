"use client"

import { useState } from "react"
import { Bell, Search, Menu, Sun, Moon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Link from "next/link"

export function Header({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}) {
  const [searchOpen, setSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between w-full h-16 bg-white dark:bg-gray-800 shadow-md px-6">
      <div className="flex items-center">
        <button className="text-gray-500 hover:text-gray-600 lg:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
        <div className={`${searchOpen ? "flex" : "hidden"} ml-6 md:flex`}>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              className="w-full sm:w-64 h-10 pl-10 pr-4 rounded-lg focus:outline-none focus:shadow-outline"
            />
            <div className="absolute top-3 left-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 md:hidden"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <Search className="h-5 w-5" />
        </button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-4"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" className="ml-4 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            3
          </span>
        </Button>
        <Button variant="ghost" size="sm" asChild className="ml-4">
          <Link href="/admin">Log In</Link>
        </Button>
        <Avatar className="ml-4">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

