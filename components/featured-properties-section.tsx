"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { PropertyCard } from "@/components/property-card"

const featuredProperties = [
  {
    id: 1,
    title: "Luxury Villa with Sea View",
    location: "Antalya / Kalkan",
    image: "/placeholder.svg?height=300&width=400",
    beds: 4,
    baths: 3,
    area: 200,
    price: 450000,
    featured: true,
  },
  {
    id: 2,
    title: "Modern Apartment in City Center",
    location: "Istanbul / Sisli",
    image: "/placeholder.svg?height=300&width=400",
    beds: 2,
    baths: 1,
    area: 90,
    price: 180000,
    featured: true,
  },
  {
    id: 3,
    title: "Beachfront Condo",
    location: "Bodrum / Gumbet",
    image: "/placeholder.svg?height=300&width=400",
    beds: 3,
    baths: 2,
    area: 120,
    price: 300000,
    featured: true,
  },
]

export function FeaturedPropertiesSection() {
  const { t } = useLanguage()

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-xl sm:text-2xl font-semibold text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("featuredProperties")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PropertyCard
                property={property}
                onQuickView={() => {
                  /* handle quick view */
                }}
                showViewDetailsButton={true}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-6 sm:px-8 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <Link href="/catalog">{t("viewAllListings")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

