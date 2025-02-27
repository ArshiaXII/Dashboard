import Image from "next/image"

interface TestimonialCardProps {
  testimonial: {
    id: string
    name: string
    role: string
    content: string
    image: string
  }
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
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
          <p className="text-gray-600">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-gray-700">{testimonial.content}</p>
    </div>
  )
}

