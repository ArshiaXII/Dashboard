"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface PropertyAmenitiesProps {
  amenities: string[]
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <motion.h2 className="text-2xl font-bold mb-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        {t("amenities")}
      </motion.h2>
      <motion.ul
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {amenities.map((amenity, index) => (
          <motion.li
            key={amenity}
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Check className="w-5 h-5 mr-2 text-primary" />
            <span>{t(amenity)}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}

