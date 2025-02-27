"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { BlogCard } from "@/components/blog-card"

const blogPosts = [
  {
    id: 1,
    title: "Türk Rivierası'nın Gizli Cevherlerini Keşfedin!",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KT1y5T9J1vbWZEQgE8O68AiAunU7MH.png",
    date: "21.01.2025",
    slug: "turk-rivierasinin-gizli-cevherlerini-kesfedin",
  },
  {
    id: 2,
    title: "Muğla'nın Saklı Cenneti Dalaman'ı Keşfe Çıkın",
    image: "/placeholder.svg?height=300&width=400",
    date: "09.01.2025",
    slug: "muglanin-sakli-cenneti-dalamani-kesfe-cikin",
  },
  {
    id: 3,
    title: "Mersin'de Sosyal Hayat: Şehrin Kalbine Yolculuk",
    image: "/placeholder.svg?height=300&width=400",
    date: "03.01.2025",
    slug: "mersinde-sosyal-hayat-sehrin-kalbine-yolculuk",
  },
]

const frequentPages = [
  { title: "Türkiye'de Satılık Daire İlanları", href: "/catalog/apartments" },
  { title: "Türkiye'de Satılık Ev İlanları", href: "/catalog/houses" },
  { title: "Antalya'da Satılık Ev İlanları", href: "/catalog/antalya" },
]

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-white">
      {/* News Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-8">{t("latestNews")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-right mt-8">
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
            {t("viewAllNews")} →
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-8">
          {/* Frequently Visited Pages */}
          <div className="mb-8">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">{t("frequentlyVisitedPages")}</h3>
            <div className="flex flex-wrap gap-4">
              {frequentPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>© 2004-{new Date().getFullYear()} Antalya Homes®</span>
              <Link href="/legal" className="hover:text-blue-600">
                {t("legalNotice")}
              </Link>
              <Link href="/terms" className="hover:text-blue-600">
                {t("termsOfUse")}
              </Link>
              <Link href="/privacy" className="hover:text-blue-600">
                {t("privacyPolicy")}
              </Link>
              <Link href="/cookies" className="hover:text-blue-600">
                {t("cookiePolicy")}
              </Link>
            </div>

            <div className="flex items-center gap-8">
              {/* Contact */}
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">{t("callUs")}</div>
                <div className="font-semibold">+90 242 324 54 94</div>
              </div>

              {/* Social Media */}
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-600"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-700"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>

              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KT1y5T9J1vbWZEQgE8O68AiAunU7MH.png"
                  alt="Tekce Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

