"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Bed, Bath, Square, MapPin, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Property } from "@/types/property"
import type React from "react"

interface PropertyCardProps {
  property: Property
  onQuickView?: (property: Property) => void
  showViewDetailsButton?: boolean
}

export function PropertyCard({ property, onQuickView, showViewDetailsButton = false }: PropertyCardProps) {
  const { t } = useLanguage()
  const router = useRouter()

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking the Quick View button
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    router.push(`/property/${property.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {property.featured && (
          <Badge className="absolute top-4 left-4 bg-orange-500/90 backdrop-blur-sm hover:bg-orange-600 text-white border-none px-3 py-1.5">
            {t("featured")}
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex-grow p-3 sm:p-4 flex flex-col justify-between">
        <div className="space-y-2 sm:space-y-3">
          {/* Title & Location */}
          <div>
            <h3 className="text-sm sm:text-base font-medium line-clamp-1 group-hover:text-orange-600 transition-colors">
              {property.title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 flex items-center">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0 text-gray-400" />
              <span className="line-clamp-1">{property.location}</span>
            </p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="flex items-center text-gray-600 text-xs sm:text-sm">
              <Bed className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0 text-orange-500" />
              <span>
                {property.bedrooms} {t("beds")}
              </span>
            </div>
            <div className="flex items-center text-gray-600 text-xs sm:text-sm">
              <Bath className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0 text-orange-500" />
              <span>
                {property.bathrooms} {t("baths")}
              </span>
            </div>
            <div className="flex items-center text-gray-600 text-xs sm:text-sm">
              <Square className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0 text-orange-500" />
              <span>{property.area} m²</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase">{t("price")}</span>
            <span className="text-base sm:text-lg font-semibold text-orange-600">
              ${property.price.toLocaleString()}
            </span>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {onQuickView && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onQuickView(property)
                }}
                className="flex-1 sm:flex-none h-9 text-xs sm:text-sm rounded-[4px] border-gray-300 hover:bg-gray-100 hover:text-gray-900 shadow-sm"
              >
                <Eye className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{t("quickView")}</span>
                <span className="sm:hidden">Quick</span>
              </Button>
            )}
            {showViewDetailsButton && (
              <Button
                size="sm"
                className="flex-1 sm:flex-none h-9 text-xs sm:text-sm rounded-[4px] bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/property/${property.id}`)
                }}
              >
                {t("viewDetails")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

