"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { PropertyCard } from "@/components/property-card"
import { PropertyQuickView } from "@/components/property-quick-view"
import type { Property } from "@/types/property"
import { useState } from "react"

interface RelatedPropertiesProps {
  currentPropertyId: number
}

// This would typically come from an API or database
const relatedProperties: Property[] = [
  {
    id: 2,
    title: "Modern Apartment in City Center",
    location: "Istanbul, Turkey",
    price: 300000,
    bedrooms: 2,
    bathrooms: 1,
    area: 100,
    type: "apartment",
    amenities: ["parking", "elevator"],
    image: "/placeholder.svg?height=300&width=400",
    coordinates: { lat: 41.0082, lng: 28.9784 },
  },
  {
    id: 3,
    title: "Beachfront Villa in Bodrum",
    location: "Bodrum, Turkey",
    price: 750000,
    bedrooms: 5,
    bathrooms: 4,
    area: 300,
    type: "villa",
    amenities: ["pool", "garden", "security"],
    image: "/placeholder.svg?height=300&width=400",
    coordinates: { lat: 37.0344, lng: 27.4305 },
  },
  {
    id: 4,
    title: "Cozy Studio in Antalya",
    location: "Antalya, Turkey",
    price: 120000,
    bedrooms: 1,
    bathrooms: 1,
    area: 50,
    type: "apartment",
    amenities: ["furnished"],
    image: "/placeholder.svg?height=300&width=400",
    coordinates: { lat: 36.8969, lng: 30.7133 },
  },
]

export function RelatedProperties({ currentPropertyId }: RelatedPropertiesProps) {
  const { t } = useLanguage()
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null)

  const filteredProperties = relatedProperties.filter((property) => property.id !== currentPropertyId)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProperties.map((property) => (
        <PropertyCard key={property.id} property={property} onQuickView={setQuickViewProperty} />
      ))}
      {quickViewProperty && (
        <PropertyQuickView property={quickViewProperty} onClose={() => setQuickViewProperty(null)} />
      )}
    </div>
  )
}

