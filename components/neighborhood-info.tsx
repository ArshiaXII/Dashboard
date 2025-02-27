"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { MapPin } from "lucide-react"

interface NearbyAmenity {
  name: string
  distance: string
}

interface NeighborhoodInfoProps {
  nearbyAmenities: NearbyAmenity[]
}

export function NeighborhoodInfo({ nearbyAmenities }: NeighborhoodInfoProps) {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">{t("neighborhoodInfo")}</h2>
      <ul className="space-y-2">
        {nearbyAmenities.map((amenity, index) => (
          <li key={index} className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            <span>
              {t(amenity.name)}: {amenity.distance}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

