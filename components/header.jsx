"use client"

import Link from "next/link"
import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

export function Header() {
  const { t, language, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl">
            TurqaEstate
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-primary">
              {t("home")}
            </Link>
            <Link href="/catalog" className="hover:text-primary">
              {t("catalog")}
            </Link>
            <Link href="/services" className="hover:text-primary">
              {t("services")}
            </Link>
            <Link href="/about" className="hover:text-primary">
              {t("about")}
            </Link>
            <Link href="/contacts" className="hover:text-primary">
              {t("contacts")}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm"
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="tr">TR</option>
            </select>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-primary">
                {t("home")}
              </Link>
              <Link href="/catalog" className="hover:text-primary">
                {t("catalog")}
              </Link>
              <Link href="/services" className="hover:text-primary">
                {t("services")}
              </Link>
              <Link href="/about" className="hover:text-primary">
                {t("about")}
              </Link>
              <Link href="/contacts" className="hover:text-primary">
                {t("contacts")}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
} 