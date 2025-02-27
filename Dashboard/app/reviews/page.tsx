import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import { ReviewForm } from "@/components/review-form"

const reviews = [
  {
    name: "John Doe",
    rating: 5,
    comment: "Excellent service! They helped me find my dream home in Antalya.",
    date: "2023-05-15",
  },
  {
    name: "Jane Smith",
    rating: 4,
    comment: "Very professional team. The property search process was smooth and efficient.",
    date: "2023-06-02",
  },
  {
    name: "Michael Johnson",
    rating: 5,
    comment: "I highly recommend their investment consulting services. My property value has increased significantly!",
    date: "2023-04-20",
  },
  {
    name: "Emily Brown",
    rating: 4,
    comment: "Great experience overall. The legal assistance was particularly helpful.",
    date: "2023-07-10",
  },
  {
    name: "David Lee",
    rating: 5,
    comment: "Outstanding customer service. They went above and beyond to meet my requirements.",
    date: "2023-03-30",
  },
]

export default function ReviewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Отзывы клиентов</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {reviews.map((review, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{review.name}</span>
                <span className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{review.comment}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Оставить отзыв</h2>
        <ReviewForm />
      </div>
    </div>
  )
}

