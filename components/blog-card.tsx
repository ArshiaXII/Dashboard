"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface BlogCardProps {
  id: number
  title: string
  image: string
  date?: string
  slug: string
}

export function BlogCard({ id, title, image, date, slug }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
        <div className="relative h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          {date && <p className="text-sm text-gray-500 mb-2">{date}</p>}
          <h3 className="font-semibold line-clamp-2">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  )
}

