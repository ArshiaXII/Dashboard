"use client"

import { useState } from "react"
import Head from "next/head"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { BlogCard } from "@/components/blog-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import type { BlogPost } from "@/types/blog"

// This would typically come from an API
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Türk Rivierası'nın Gizli Cevherlerini Keşfedin!",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KT1y5T9J1vbWZEQgE8O68AiAunU7MH.png",
    date: "21.01.2025",
    slug: "turk-rivierasinin-gizli-cevherlerini-kesfedin",
    excerpt: "Türk Rivierası'nın keşfedilmemiş güzelliklerini ve gizli kalmış lokasyonlarını keşfedin...",
    author: {
      name: "Ahmet Yılmaz",
      avatar: "/placeholder.svg?height=50&width=50",
      role: "Travel Expert",
    },
    category: "Travel",
    readTime: 5,
  },
  {
    id: 2,
    title: "Muğla'nın Saklı Cenneti Dalaman'ı Keşfe Çıkın",
    image: "/placeholder.svg?height=300&width=400",
    date: "09.01.2025",
    slug: "muglanin-sakli-cenneti-dalamani-kesfe-cikin",
    excerpt: "Dalaman'ın eşsiz doğal güzellikleri ve muhteşem plajlarını keşfedin...",
    author: {
      name: "Ayşe Demir",
      avatar: "/placeholder.svg?height=50&width=50",
      role: "Local Guide",
    },
    category: "Destinations",
    readTime: 4,
  },
  {
    id: 3,
    title: "Mersin'de Sosyal Hayat: Şehrin Kalbine Yolculuk",
    image: "/placeholder.svg?height=300&width=400",
    date: "03.01.2025",
    slug: "mersinde-sosyal-hayat-sehrin-kalbine-yolculuk",
    excerpt: "Mersin'in canlı sosyal hayatı ve kültürel zenginliklerini keşfedin...",
    author: {
      name: "Mehmet Kaya",
      avatar: "/placeholder.svg?height=50&width=50",
      role: "Culture Editor",
    },
    category: "Lifestyle",
    readTime: 6,
  },
  {
    id: 4,
    title: "Antalya'da Yeni Yıl Kutlamaları: Harika Anlar Sizi Bekliyor!",
    image: "/placeholder.svg?height=300&width=400",
    date: "19.12.2024",
    slug: "antalyada-yeni-yil-kutlamalari",
    excerpt: "Antalya'nın yeni yıl kutlamalarındaki büyüleyici atmosferini keşfedin...",
    author: {
      name: "Zeynep Şahin",
      avatar: "/placeholder.svg?height=50&width=50",
      role: "Events Specialist",
    },
    category: "Events",
    readTime: 3,
  },
]

export default function BlogPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <Head>
        <title>Turqa Estate - Blog</title>
        <meta
          name="description"
          content="Stay informed about luxury real estate trends, market insights, and lifestyle tips with the Turqa Estate blog."
        />
        <meta name="keywords" content="luxury real estate, blog, market trends, lifestyle, Turqa Estate" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen bg-gray-50 pt-16 sm:pt-24">
        <div className="container mx-auto px-4 py-8">
          <motion.h1
            className="text-3xl sm:text-4xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t("latestNews")}
          </motion.h1>

          <motion.div
            className="max-w-md mx-auto mb-8 sm:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <Input
                type="search"
                placeholder={t("searchBlog")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div className="text-center py-8 sm:py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-gray-500 text-sm sm:text-base">{t("noPostsFound")}</p>
            </motion.div>
          )}

          {filteredPosts.length > 0 && (
            <motion.div
              className="text-center mt-8 sm:mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button variant="outline">{t("loadMore")}</Button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

