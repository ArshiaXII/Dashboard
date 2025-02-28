"use client"

import { useState } from "react"
import { PropertyCard } from "./property-card"
import { PropertyQuickView } from "./property-quick-view"

const properties = [
  {
    id: 1,
    title: "Modern City Apartment",
    price: 200000,
    location: "Istanbul / Beyoglu",
    image: "/placeholder.svg",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    price: 500000,
    location: "Antalya / Lara",
    image: "/placeholder.svg",
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
  },
  {
    id: 3,
    title: "Seaside Residence",
    price: 350000,
    location: "Izmir / Karsiyaka",
    image: "/placeholder.svg",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
  },
  // Add more properties as needed
]

export function PropertyGrid() {
  const [quickViewProperty, setQuickViewProperty] = useState<(typeof properties)[0] | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} onQuickView={() => setQuickViewProperty(property)} />
        ))}
      </div>
      <PropertyQuickView
        property={quickViewProperty}
        isOpen={!!quickViewProperty}
        onClose={() => setQuickViewProperty(null)}
      />
    </>
  )
}

