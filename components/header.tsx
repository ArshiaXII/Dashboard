"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Phone, PhoneIcon as WhatsApp, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/LanguageContext"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  const menuItems = [
    { href: "/catalog", label: t("catalog") },
    { href: "/buying-guide", label: t("buyingGuide") },
    { href: "/buying-guide/faq", label: t("faq") },
    { href: "/about", label: t("corporate") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}
    >
      {/* Top Bar - Hidden on mobile, visible on tablet and up */}
      <div className="hidden md:block bg-gray-100 py-2 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <span className="text-gray-400">|</span>
              <Button variant="ghost" size="sm" asChild className="hover:text-primary transition-colors">
                <Link href="/login">Log In</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="tel:+902423245494"
                className="text-gray-600 hover:text-primary transition-colors flex items-center"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span>+90 242 324 54 94</span>
              </a>
              <a
                href="https://wa.me/905322124590"
                className="text-gray-600 hover:text-primary transition-colors flex items-center"
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
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YrmtHArqFMEzPzgCTB1qGyCGUs18aV.png"
              alt="TurqaEstate Logo"
              width={150}
              height={30}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium hover:text-primary transition-colors pb-2 border-b-2 ${
                  pathname === item.href ? "border-primary text-primary" : "border-transparent"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Search and Schedule */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder={t("searchProperties")}
                className="w-64 pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-full shadow-md transition-all duration-300 hover:shadow-lg"
            >
              {t("scheduleViewing")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8 pt-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YrmtHArqFMEzPzgCTB1qGyCGUs18aV.png"
                    alt="TurqaEstate Logo"
                    width={120}
                    height={24}
                    className="h-6 w-auto"
                  />
                  <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                    <Menu className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-lg font-medium hover:text-primary transition-colors ${
                        pathname === item.href ? "text-primary" : "text-gray-600"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/auth"
                    className="text-lg font-medium text-gray-600 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("login")}
                  </Link>
                </nav>
                <div className="mt-auto space-y-4 py-4">
                  <Input type="search" placeholder={t("searchProperties")} className="w-full" />
                  <Button className="w-full bg-primary hover:bg-primary-dark text-white">{t("scheduleViewing")}</Button>
                  <div className="flex flex-col space-y-2 text-sm text-gray-600">
                    <a href="tel:+902423245494" className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>+90 242 324 54 94</span>
                    </a>
                    <a
                      href="https://wa.me/905322124590"
                      className="flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsApp className="h-4 w-4 mr-2" />
                      <span>+90 532 212 45 90</span>
                    </a>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

