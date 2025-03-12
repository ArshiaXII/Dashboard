"use client"

import Link from "next/link"
import Image from "next/image"

// News article data
const newsArticles = [
  {
    id: 1,
    image: "/placeholder.svg?height=200&width=300",
    category: "Education in Turkey",
    title: "A Journey of New Beginnings and Opportunities",
    link: "#"
  },
  {
    id: 2,
    image: "/placeholder.svg?height=200&width=300",
    category: "Education in Sakarya, Turkey",
    title: "",
    link: "#"
  },
  {
    id: 3,
    image: "/placeholder.svg?height=200&width=300",
    category: "Join Us at the Apartments and Houses Fair in Poznan",
    title: "",
    link: "#"
  },
  {
    id: 4,
    image: "/placeholder.svg?height=200&width=300",
    category: "Navigating Offshore Properties in Antalya & Mersin",
    title: "",
    link: "#"
  },
  {
    id: 5,
    image: "/placeholder.svg?height=200&width=300",
    category: "Discover the Apartments and Houses Fair in Krakow, Poland",
    title: "",
    link: "#"
  },
  {
    id: 6,
    image: "/placeholder.svg?height=200&width=300",
    category: "Weekend Get in Turkey: Celebrating Life in Magical Places",
    title: "",
    link: "#"
  }
]

export function LatestNews() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Latest News & Articles</h2>
        <Link href="/news" className="text-blue-600 hover:underline">
          All News →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsArticles.map((article) => (
          <div key={article.id} className="border border-gray-200 rounded overflow-hidden">
            <div className="relative h-48">
              <Image 
                src={article.image} 
                alt={article.category} 
                fill 
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-2">{article.category}</p>
              <h3 className="font-semibold mb-3">{article.title || article.category}</h3>
              <Link href={article.link} className="text-blue-600 text-sm uppercase font-semibold">
                READ MORE
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 