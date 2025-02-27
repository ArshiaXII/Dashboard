"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { PropertyCard } from "@/components/property-card"

const newAddedProperties = [
  {
    id: 7,
    title: "Modern City Apartment",
    location: "Istanbul / Beyoglu",
    image: "/placeholder.svg?height=300&width=400",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    price: 200000,
  },
  {
    id: 8,
    title: "Seaside Villa",
    location: "Mugla / Fethiye",
    image: "/placeholder.svg?height=300&width=400",
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    price: 380000,
  },
  {
    id: 9,
    title: "Countryside Cottage",
    location: "Canakkale / Bozcaada",
    image: "/placeholder.svg?height=300&width=400",
    bedrooms: 2,
    bathrooms: 1,
    area: 100,
    price: 150000,
  },
]

export function NewAddedPropertiesSection() {
  const { t } = useLanguage()

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("newAddedProperties")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {newAddedProperties.map((property, index) => (
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

