import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"

const testimonials = [
  {
    name: "John Doe",
    role: "Homeowner",
    content: "testimonial1",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Jane Smith",
    role: "Investor",
    content: "testimonial2",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Mike Johnson",
    role: "First-time Buyer",
    content: "testimonial3",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function Testimonials() {
  const { t } = useLanguage()

  return (
    <section className="py-8 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">{t("customerTestimonials")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{t(testimonial.content)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

