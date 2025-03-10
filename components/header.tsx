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
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar with language, login, contact info */}
      <div className="bg-white border-b border-gray-200 py-1">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <button className="flex items-center text-sm font-medium">
                <span className="mr-1">▼</span> English
              </button>
              <button className="flex items-center text-sm font-medium ml-4">
                <span className="mr-1">▼</span> EUR
              </button>
            </div>
            <button className="flex items-center text-sm font-medium text-blue-600">
              <span className="mr-1">🔒</span> LOGIN
            </button>
          </div>
          
          <div className="flex items-center flex-wrap">
            <div className="flex items-center mr-4">
              <span className="text-sm font-medium text-gray-600 mr-2">CALL NOW</span>
              <a href="tel:+902422345434" className="text-sm">+90 242 234 54 34</a>
            </div>
            <div className="flex items-center mr-4">
              <span className="text-sm font-medium text-gray-600 mr-2">MOBILE</span>
              <a href="tel:+905322124590" className="text-sm">+90 532 212 45 90</a>
            </div>
            <a href="#" className="mr-4">
              <img alt="WhatsApp" width="20" height="20" src="/whatsapp-icon.png" />
            </a>
            <a href="#" className="bg-gray-100 text-sm py-1 px-3 rounded mr-2">FIND A PROPERTY</a>
            <a href="#" className="bg-red-600 text-white text-sm py-1 px-3 rounded">MAKE AN APPOINTMENT</a>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="py-3">
            <Link href="/">
              <div className="flex flex-col">
                <span className="text-red-600 font-bold text-xl">ANTALYA HOMES</span>
                <span className="text-xs text-gray-600">LEADING REAL ESTATE COMPANY</span>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex">
            <Link className="px-4 py-6 font-medium" href="/buy">BUY</Link>
            <Link className="px-4 py-6 font-medium" href="/sell">SELL</Link>
            <Link className="px-4 py-6 font-medium" href="/buying-guide">BUYING GUIDE</Link>
            <Link className="px-4 py-6 font-medium" href="/corporate">CORPORATE</Link>
            <Link className="px-4 py-6 font-medium" href="/blog">BLOG</Link>
            <Link className="px-4 py-6 font-medium" href="/contact-us">CONTACT US</Link>
          </nav>
          
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link className="hover:text-primary" href="/buy">BUY</Link>
              <Link className="hover:text-primary" href="/sell">SELL</Link>
              <Link className="hover:text-primary" href="/buying-guide">BUYING GUIDE</Link>
              <Link className="hover:text-primary" href="/corporate">CORPORATE</Link>
              <Link className="hover:text-primary" href="/blog">BLOG</Link>
              <Link className="hover:text-primary" href="/contact-us">CONTACT US</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

