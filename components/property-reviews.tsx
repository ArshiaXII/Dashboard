"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Star } from "lucide-react"

interface Review {
  id: number
  author: string
  rating: number
  comment: string
  date: string
}

interface PropertyReviewsProps {
  propertyId: number
}

// This would typically come from an API
const mockReviews: Review[] = [
  {
    id: 1,
    author: "John Doe",
    rating: 5,
    comment: "Fantastic property with amazing views!",
    date: "2023-05-15",
  },
  {
    id: 2,
    author: "Jane Smith",
    rating: 4,
    comment: "Great location, but could use some minor updates.",
    date: "2023-04-22",
  },
]

export function PropertyReviews({ propertyId }: PropertyReviewsProps) {
  const { t } = useLanguage()
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    // This would typically be an API call
    setReviews(mockReviews)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">{t("propertyReviews")}</h2>
      {reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{review.author}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-1">{review.comment}</p>
              <p className="text-sm text-gray-400">{review.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>{t("noReviewsYet")}</p>
      )}
    </div>
  )
}

