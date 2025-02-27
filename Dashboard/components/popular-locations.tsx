"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"

const locations = [
  { name: "Antalya", image: "/placeholder.svg?height=300&width=400", propertyCount: 150 },
  { name: "Istanbul", image: "/placeholder.svg?height=300&width=400", propertyCount: 200 },
  { name: "Bodrum", image: "/placeholder.svg?height=300&width=400", propertyCount: 100 },
  { name: "Alanya", image: "/placeholder.svg?height=300&width=400", propertyCount: 120 },
]

export function PopularLocations() {
  const { t } = useLanguage()

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{t("popularLocations")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location) => (
            <Link key={location.name} href={`/catalog?location=${location.name.toLowerCase()}`} className="group">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={location.image || "/placeholder.svg"}
                  alt={location.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                  <div className="text-white">
                    <h3 className="text-xl font-semibold">{location.name}</h3>
                    <p>
                      {location.propertyCount} {t("properties")}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

