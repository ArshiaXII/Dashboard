"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { MapPin, Eye } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PropertyCardProps {
  property: {
    id: string | number
    title: string
    price: number
    location: string
    image: string
    bedrooms?: number
    bathrooms?: number
    area?: number
  }
  onQuickView: (property: PropertyCardProps["property"]) => void
}

export function PropertyCard({ property, onQuickView }: PropertyCardProps) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={() => router.push(`/property/${property.id}`)}
    >
      <Card className="overflow-hidden border-transparent transition-all duration-300 hover:border-orange-500/20 hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-orange-600">{property.title}</h3>
          <div className="mb-3 flex items-center text-sm text-gray-500">
            <MapPin className="mr-1 h-4 w-4" />
            {property.location}
          </div>
          <div className="mb-4">
            <span className="text-sm text-gray-500">Price</span>
            <div className="text-xl font-bold text-orange-600">${property.price.toLocaleString()}</div>
          </div>
          <div className="flex space-x-2">
            <Button
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/property/${property.id}`)
              }}
            >
              View Details
            </Button>
            <Button
              variant="outline"
              className="flex-none"
              onClick={(e) => {
                e.stopPropagation()
                onQuickView(property)
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

