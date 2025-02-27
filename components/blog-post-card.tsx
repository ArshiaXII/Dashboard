"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import type { BlogPost } from "@/types/blog"

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const { t } = useLanguage()

  return (
    <article className="group bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {post.category && (
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-blue-100 text-blue-800 px-2 py-1 text-xs sm:text-sm rounded">
              {post.category}
            </div>
          )}
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
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
          <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{post.excerpt}</p>}
          {post.author && (
            <div className="flex items-center gap-2 sm:gap-3">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <div className="text-xs sm:text-sm">
                <div className="font-medium">{post.author.name}</div>
                {post.author.role && <div className="text-gray-500 text-xs">{post.author.role}</div>}
              </div>
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}

