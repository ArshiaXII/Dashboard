"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"

const locations = [
  {
    id: 1,
    name: "Alanya",
    image: "/placeholder.svg?height=400&width=600",
    properties: 234,
    href: "/catalog?location=alanya",
  },
  {
    id: 2,
    name: "Antalya",
    image: "/placeholder.svg?height=400&width=600",
    properties: 156,
    href: "/catalog?location=antalya",
  },
  {
    id: 3,
    name: "Istanbul",
    image: "/placeholder.svg?height=400&width=600",
    properties: 489,
    href: "/catalog?location=istanbul",
  },
  {
    id: 4,
    name: "Bodrum",
    image: "/placeholder.svg?height=400&width=600",
    properties: 123,
    href: "/catalog?location=bodrum",
  },
]

export function FeaturedLocations() {
  const { t } = useLanguage()

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t("popularLocations")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {locations.map((location) => (
            <Link key={location.id} href={location.href}>
              <motion.div
                className="group relative rounded-lg overflow-hidden h-48 sm:h-64"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={location.image || "/placeholder.svg"}
                  alt={location.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">{location.name}</h3>
                  <p className="text-xs sm:text-sm opacity-90">
                    {location.properties} {t("properties")}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

