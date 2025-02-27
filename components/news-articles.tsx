"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

const articles = [
  {
    id: 1,
    title: "Top 5 Reasons to Invest in Turkish Real Estate",
    excerpt: "Discover why Turkey is becoming a hotspot for international property investors...",
    image: "/placeholder.svg?height=200&width=300",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "Guide to Obtaining Turkish Citizenship Through Property Investment",
    excerpt: "Learn about the process and benefits of acquiring Turkish citizenship by investing in real estate...",
    image: "/placeholder.svg?height=200&width=300",
    date: "2023-05-10",
  },
  {
    id: 3,
    title: "Exploring Turkey's Most Beautiful Coastal Properties",
    excerpt: "Take a virtual tour of stunning beachfront homes and apartments along the Turkish Riviera...",
    image: "/placeholder.svg?height=200&width=300",
    date: "2023-05-05",
  },
]

export function NewsArticles() {
  const { t } = useLanguage()

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{t("latestNews")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full h-48">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{article.date}</span>
                  <Link href={`/blog/${article.id}`} className="text-primary hover:underline">
                    {t("readMore")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/blog">{t("viewAllNews")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

