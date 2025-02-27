"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/blog-card"
import { Clock, Calendar, ArrowLeft } from "lucide-react"
import type { BlogPost } from "@/types/blog"

// This would typically come from an API
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Türk Rivierası'nın Gizli Cevherlerini Keşfedin!",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KT1y5T9J1vbWZEQgE8O68AiAunU7MH.png",
    date: "21.01.2025",
    slug: "turk-rivierasinin-gizli-cevherlerini-kesfedin",
    content: `
      <p>Türk Rivierası, dünyaca ünlü tatil beldelerinin yanı sıra, henüz keşfedilmemiş birçok gizli cenneti barındırıyor. Bu yazımızda, bölgenin en özel ve az bilinen lokasyonlarını sizler için derledik.</p>

      <h2>Gizli Koylar ve Plajlar</h2>
      <p>Türk Rivierası'nın kristal berraklığındaki sularında gizlenmiş, el değmemiş koylar ve plajlar bulunuyor. Bu doğal güzelliklerin bazıları sadece deniz yoluyla ulaşılabilir durumda, bu da onların doğal güzelliklerini korumalarını sağlıyor.</p>

      <h2>Antik Kentler</h2>
      <p>Bölge aynı zamanda birçok antik kenti de bünyesinde barındırıyor. Bu kentler, binlerce yıllık tarihi ve kültürel mirası günümüze taşıyor.</p>

      <h2>Yerel Lezzetler</h2>
      <p>Türk Rivierası'nın her köşesinde, yerel mutfağın eşsiz lezzetlerini tadabileceğiniz otantik restoranlar bulunuyor. Taze deniz ürünlerinden yerel zeytinyağlılara kadar, damak zevkinize hitap edecek birçok seçenek mevcut.</p>
    `,
    excerpt: "Türk Rivierası'nın keşfedilmemiş güzelliklerini ve gizli kalmış lokasyonlarını keşfedin...",
    author: {
      name: "Ahmet Yılmaz",
      avatar: "/placeholder.svg?height=50&width=50",
      role: "Travel Expert",
    },
    category: "Travel",
    readTime: 5,
  },
  // ... other blog posts
]

export default function BlogPostPage() {
  const { t } = useLanguage()
  const params = useParams()
  const { slug } = params

  const post = blogPosts.find((post) => post.slug === slug)
  const relatedPosts = blogPosts.filter((p) => p.id !== post?.id).slice(0, 3)

  if (!post) {
    return (
      <div className="min-h-screen pt-16 sm:pt-24 flex items-center justify-center">
        <p className="text-center text-gray-500">{t("postNotFound")}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6 sm:mb-8">
          <Button variant="ghost" asChild className="p-0 sm:p-2">
            <Link href="/blog" className="flex items-center text-sm sm:text-base">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backToBlog")}
            </Link>
          </Button>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="relative h-48 sm:h-64 md:h-[400px]">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            {/* Meta Information */}
            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4">
              {post.category && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{post.category}</span>}
              <div className="flex items-center">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                {post.date}
              </div>
              {post.readTime && (
                <div className="flex items-center">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  {post.readTime} {t("minuteRead")}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{post.title}</h1>

            {/* Author */}
            {post.author && (
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                {post.author.avatar && (
                  <Image
                    src={post.author.avatar || "/placeholder.svg"}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <div className="font-semibold text-sm sm:text-base">{post.author.name}</div>
                  {post.author.role && <div className="text-xs sm:text-sm text-gray-500">{post.author.role}</div>}
                </div>
              </div>
            )}

            {/* Content */}
            <div
              className="prose max-w-none text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </div>
        </motion.article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">{t("relatedPosts")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((post, index) => (
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
          </div>
        )}
      </div>
    </div>
  )
}

