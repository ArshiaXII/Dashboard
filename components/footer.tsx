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
    image: "/placeholder.svg?height=300&width=400",
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
    <footer className="bg-gray-900 text-white">
      {/* Top section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Buy Apartments in Turkey</h3>
            <p className="text-sm text-gray-400">
              Find your dream property in Turkey with our expert guidance and comprehensive listings.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Top Property Locations</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li><Link href="#">Antalya</Link></li>
              <li><Link href="#">Istanbul</Link></li>
              <li><Link href="#">Alanya</Link></li>
              <li><Link href="#">Bodrum</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li><Link href="#">Property Management</Link></li>
              <li><Link href="#">Legal Assistance</Link></li>
              <li><Link href="#">Citizenship by Investment</Link></li>
              <li><Link href="#">After-Sales Support</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Middle section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} TurqaEstate. All Rights Reserved.
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-sm text-gray-400 hover:text-white">Legal Notice</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white">Terms of Use</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white">Cookies Policy</Link>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-sm text-gray-400 mr-4">CALL US: +90 242 234 54 94</span>
            <span className="text-sm text-gray-400">FOLLOW US:</span>
            <div className="flex space-x-2 ml-2">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-4 w-4 text-gray-400 hover:text-white" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-4 w-4 text-gray-400 hover:text-white" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-4 w-4 text-gray-400 hover:text-white" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4 text-gray-400 hover:text-white" />
              </Link>
              <Link href="#" aria-label="YouTube">
                <Youtube className="h-4 w-4 text-gray-400 hover:text-white" />
              </Link>
            </div>
          </div>
          <div>
            <Link href="https://itecke.com" target="_blank" rel="noopener noreferrer">
              <Image src="/placeholder.svg?height=30&width=80" alt="iTecke" width={80} height={30} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

