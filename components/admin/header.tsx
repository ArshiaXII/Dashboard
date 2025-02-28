"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, ChevronDown, Globe, HelpCircle, LogOut, Menu, Settings, User, LogIn } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"
import { LoginModal } from "@/components/admin/login-modal"

interface AdminHeaderProps {
  onMenuClick: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const router = useRouter()
  const [notifications] = useState(3)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    router.push("/admin/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <Image
            src="https://sjc.microlink.io/I3CDehkzGwoh5StGnufc35uMg5vBtCN8nTL-UsUN3Qe70w_WI-ebqvkxBNFTaOE6trdPLiWlmOoc8ji_jDupFw.jpeg"
            alt="Turqa Estate Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
          {user && (
            <div className="hidden md:flex items-center gap-6 text-sm ml-8">
              <Button variant="ghost" className="text-gray-600 hover:text-[#003366] hover:bg-[#F5F6FA]">
                Dashboard
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-[#003366] hover:bg-[#F5F6FA]">
                Properties
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-[#003366] hover:bg-[#F5F6FA]">
                Blog
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                {notifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full text-xs"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>

              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5 text-gray-600" />
              </Button>

              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5 text-gray-600" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-flex items-center gap-2">
                      Admin User
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-[#003366] hover:bg-[#004080] text-white font-semibold px-6 py-2 rounded-md transition-colors duration-200"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Admin Login
            </Button>
          )}
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  )
}

