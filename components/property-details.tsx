"use client"

import { motion } from "framer-motion"
import { Bed, Bath, Maximize, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Property } from "@/types/property"

interface PropertyDetailsProps {
  property: Property
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const { t } = useLanguage()

  const details = [
    { icon: Bed, label: "bedrooms", value: property.bedrooms || t("notSpecified") },
    { icon: Bath, label: "bathrooms", value: property.bathrooms || t("notSpecified") },
    { icon: Maximize, label: "area", value: property.area ? `${property.area} m²` : t("notSpecified") },
    { icon: MapPin, label: "location", value: property.location || t("notSpecified") },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-6 mb-4 sm:mb-8">
      <motion.h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4">{t("propertyDetails")}</motion.h2>
      <motion.div className="grid gap-2 sm:gap-4">
        {details.map((detail, index) => (
          <motion.div
            key={detail.label}
            className="flex items-center bg-gray-50 p-2 rounded-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <detail.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary flex-shrink-0" />
            <span className="text-xs sm:text-base">
              {t(detail.label)}: {detail.value}
            </span>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="mt-3 sm:mt-6 text-lg sm:text-2xl font-bold text-primary border-t pt-3 sm:pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {property.price ? `$${property.price.toLocaleString()}` : t("priceOnRequest")}
      </motion.div>
    </div>
  )
}

