"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { PropertyQuickView } from "@/components/property-quick-view"
import type { Property } from "@/types/property"

const properties = [
  {
    id: 1,
    title: "Lory Queen residence",
    location: "Alanya / Kestel",
    price: 97000,
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Vanessa River — Premium Class",
    location: "Alanya / Kargicak",
    price: 120000,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Luxury Villa with Sea View",
    location: "Antalya / Kalkan",
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    image: "/placeholder.svg?height=300&width=400",
  },
]

export function FeaturedProperties() {
  const { t } = useLanguage()
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{t("featuredProperties")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} onQuickView={setQuickViewProperty} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild className="mt-12 px-8 py-3 bg-red-600 hover:bg-red-700 text-white">
            <Link href="/catalog">{t("viewAllListings")}</Link>
          </Button>
        </div>
        {quickViewProperty && (
          <PropertyQuickView property={quickViewProperty} onClose={() => setQuickViewProperty(null)} />
        )}
      </div>
    </section>
  )
}

