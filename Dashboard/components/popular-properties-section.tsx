"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { PropertyCard } from "@/components/property-card"

const popularProperties = [
  {
    id: 4,
    title: "Spacious Family Home",
    location: "Izmir / Cesme",
    image: "/placeholder.svg?height=300&width=400",
    bedrooms: 4,
    bathrooms: 2,
    area: 180,
    price: 280000,
  },
  {
    id: 5,
    title: "Cozy Studio in Old Town",
    location: "Antalya / Kaleici",
    image: "/placeholder.svg?height=300&width=400",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    price: 85000,
  },
  {
    id: 6,
    title: "Mountain View Chalet",
    location: "Bursa / Uludag",
    image: "/placeholder.svg?height=300&width=400",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    price: 320000,
  },
]

export function PopularPropertiesSection() {
  const { t } = useLanguage()

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("popularProperties")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {popularProperties.map((property, index) => (
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

