"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, PhoneIcon as WhatsApp, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/LanguageContext"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const menuItems = [
    { href: "/catalog", label: t("catalog") },
    { href: "/buying-guide", label: t("buyingGuide") },
    { href: "/buying-guide/faq", label: t("faq") },
    { href: "/about", label: t("corporate") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top Bar - Hidden on mobile, visible on tablet and up */}
      <div className="hidden sm:block bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <span className="text-sm text-gray-600">|</span>
              <Button variant="outline" size="sm" asChild className="ml-4">
                <Link href="/login">Log In</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <a href="tel:+902423245494" className="text-sm text-gray-600 hover:text-primary flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+90 242 324 54 94</span>
              </a>
              <a
                href="https://wa.me/905322124590"
                className="text-sm text-gray-600 hover:text-primary flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp className="h-4 w-4 mr-2" />
                <span>+90 532 212 45 90</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YrmtHArqFMEzPzgCTB1qGyCGUs18aV.png"
                alt="TurqaEstate Logo"
                width={150}
                height={30}
                className="h-6 sm:h-8 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium hover:text-red-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Contact Icons */}
            <div className="flex items-center space-x-3 sm:hidden">
              <a href="tel:+902423245494" className="text-gray-600 hover:text-primary">
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/905322124590"
                className="text-gray-600 hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp className="h-5 w-5" />
              </a>
            </div>

            {/* Desktop Search and Schedule */}
            <div className="hidden sm:flex items-center space-x-4">
              <Input type="search" placeholder={t("searchProperties")} className="w-48 h-8 text-sm" />
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-[4px] shadow-sm"
              >
                {t("scheduleViewing")}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden ml-2 rounded-[4px]">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="p-4 border-b">
                    <LanguageSwitcher />
                  </div>

                  {/* Mobile Menu Items */}
                  <div className="flex-1 overflow-auto py-4">
                    <nav className="px-4 space-y-4">
                      {menuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block text-base font-medium hover:text-red-600 transition-colors py-2"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <Link
                        href="/auth"
                        className="block text-base font-medium hover:text-red-600 transition-colors py-2"
                      >
                        {t("login")}
                      </Link>
                    </nav>
                  </div>

                  {/* Mobile Menu Footer */}
                  <div className="p-4 border-t space-y-4">
                    <Input type="search" placeholder={t("searchProperties")} className="w-full" />
                    <Button className="w-full bg-red-600 hover:bg-red-700">{t("scheduleViewing")}</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

