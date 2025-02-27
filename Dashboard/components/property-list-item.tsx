"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { Bed, Bath, Square, MapPin, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Property } from "@/types/property"

interface PropertyListItemProps {
  property: Property
  onQuickView: () => void
}

export function PropertyListItem({ property, onQuickView }: PropertyListItemProps) {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg flex">
      <div className="relative w-1/3">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
        {property.featured && <Badge className="absolute top-2 left-2 bg-primary text-white">{t("featured")}</Badge>}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/property/${property.id}`} className="block">
            <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">{property.title}</h3>
          </Link>
          <p className="text-gray-600 mb-2 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {property.location}
          </p>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.bedrooms} {t("beds")}
            </span>
            <span className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {property.bathrooms} {t("baths")}
            </span>
            <span className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              {property.area} m²
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-primary">${property.price.toLocaleString()}</p>
          <Button variant="outline" size="sm" onClick={onQuickView}>
            <Eye className="w-4 h-4 mr-1" />
            {t("quickView")}
          </Button>
        </div>
      </div>
    </div>
  )
}

