"use client"

import Image from "next/image"
import Link from "next/link"

interface NewsItem {
  id: number
  title: string
  image: string
  category: string
  date?: string
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Education in Turkey: A Journey of Rich Influence and Learning",
    image: "/placeholder.svg?height=200&width=300",
    category: "BLOG GUIDE"
  },
  {
    id: 2,
    title: "Circulars in Selimiye, Turkey",
    image: "/placeholder.svg?height=200&width=300",
    category: "BLOG GUIDE"
  },
  {
    id: 3,
    title: "Join Us at the Apartments and Houses Fair in Poznan",
    image: "/placeholder.svg?height=200&width=300",
    category: "BLOG GUIDE"
  },
  {
    id: 4,
    title: "Investing in Alanya: Affordable Apartments in Alanya & Mersin",
    image: "/placeholder.svg?height=200&width=300",
    category: "BLOG GUIDE"
  },
  {
    id: 5,
    title: "Discover the Apartments and Houses Fair in Krakow, Poland",
    image: "/placeholder.svg?height=200&width=300",
    category: "BLOG GUIDE"
  },
  {
    id: 6,
    title: "Weekend Getaway in Turkey: Celebrating Love in Magical Places",
    image: "/placeholder.svg?height=200&width=300",
    category: "BLOG GUIDE"
  }
]

export function LatestNews() {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 border-b pb-2">Latest News & Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="relative h-48 w-full mb-3">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <span className="text-xs text-blue-600 font-medium mb-2">{item.category}</span>
                <h3 className="text-base font-semibold mb-3">{item.title}</h3>
                <div className="mt-auto">
                  <Link 
                    href={`/blog/${item.id}`} 
                    className="text-xs text-blue-600 font-medium hover:underline"
                  >
                    READ MORE
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-right mt-6">
          <Link href="/blog" className="text-sm text-gray-600 hover:underline">
            All News →
          </Link>
        </div>
      </div>
    </div>
  )
} 