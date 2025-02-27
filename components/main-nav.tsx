"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Heart, MessageSquare, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/LanguageContext"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl font-bold">TurqaEstate</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/search">
                <Search className="h-4 w-4 mr-2" />
                {t("search")}
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/favorites">
                <Heart className="h-4 w-4 mr-2" />
                {t("favorites")}
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/messages">
                <MessageSquare className="h-4 w-4 mr-2" />
                {t("messages")}
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/profile">
                <User className="h-4 w-4 mr-2" />
                {t("profile")}
              </Link>
            </Button>
            <LanguageSwitcher />
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/search">
                <Search className="h-4 w-4 mr-2" />
                {t("search")}
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/favorites">
                <Heart className="h-4 w-4 mr-2" />
                {t("favorites")}
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/messages">
                <MessageSquare className="h-4 w-4 mr-2" />
                {t("messages")}
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/profile">
                <User className="h-4 w-4 mr-2" />
                {t("profile")}
              </Link>
            </Button>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

