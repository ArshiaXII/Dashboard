"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-32">
              <Image 
                src="/placeholder.svg?height=40&width=120" 
                alt="TurqaEstate Logo" 
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/catalog" className="text-sm font-medium hover:text-primary">
              Catalog
            </Link>
            <Link href="/buying-guide" className="text-sm font-medium hover:text-primary">
              Buying Guide
            </Link>
            <Link href="/faq" className="text-sm font-medium hover:text-primary">
              FAQ
            </Link>
            <Link href="/corporate" className="text-sm font-medium hover:text-primary">
              Corporate
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary">
              Blog
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>

          {/* Contact & Language */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-sm">+90 242 324 54 94</span>
            </div>
            
            <div className="relative">
              <button 
                className="flex items-center text-sm"
                onClick={() => setLanguage(language === "en" ? "tr" : "en")}
              >
                {language.toUpperCase()}
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <Button size="sm">
              Schedule Viewing
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/catalog" 
                className="text-sm font-medium py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Catalog
              </Link>
              <Link 
                href="/buying-guide" 
                className="text-sm font-medium py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Buying Guide
              </Link>
              <Link 
                href="/faq" 
                className="text-sm font-medium py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="/corporate" 
                className="text-sm font-medium py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Corporate
              </Link>
              <Link 
                href="/blog" 
                className="text-sm font-medium py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className="text-sm font-medium py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center mb-4">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">+90 242 324 54 94</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <button 
                    className="flex items-center text-sm"
                    onClick={() => setLanguage(language === "en" ? "tr" : "en")}
                  >
                    {language.toUpperCase()}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>
                  
                  <Button size="sm">
                    Schedule Viewing
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
} 