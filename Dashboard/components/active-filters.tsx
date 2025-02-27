"use client"

import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import type { PropertyFiltersType } from "@/types/property"
import { useLanguage } from "@/contexts/LanguageContext"

interface ActiveFiltersProps {
  filters: PropertyFiltersType
  onChange: (filters: PropertyFiltersType) => void
}

export function ActiveFilters({ filters, onChange }: ActiveFiltersProps) {
  const { t } = useLanguage()

  const removeFilter = (key: keyof PropertyFiltersType, value?: string) => {
    const newFilters = { ...filters }
    if (key === "amenities" && value) {
      newFilters.amenities = filters.amenities.filter((item) => item !== value)
    } else if (key === "priceRange") {
      newFilters.priceRange = [0, 2000000]
    } else {
      newFilters[key] = ""
    }
    onChange(newFilters)
  }

  const activeFilters = [
    ...(filters.propertyType ? [{ key: "propertyType", value: filters.propertyType }] : []),
    ...(filters.location ? [{ key: "location", value: filters.location }] : []),
    ...(filters.bedrooms ? [{ key: "bedrooms", value: `${filters.bedrooms} ${t("beds")}` }] : []),
    ...(filters.bathrooms ? [{ key: "bathrooms", value: `${filters.bathrooms} ${t("baths")}` }] : []),
    ...(filters.area ? [{ key: "area", value: `${filters.area}m²` }] : []),
    ...filters.amenities.map((amenity) => ({ key: "amenities", value: amenity })),
    ...(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 2000000
      ? [
          {
            key: "priceRange",
            value: `$${filters.priceRange[0].toLocaleString()} - $${filters.priceRange[1].toLocaleString()}`,
          },
        ]
      : []),
  ]

  if (activeFilters.length === 0) return null

  return (
    <motion.div className="flex flex-wrap gap-2 mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <AnimatePresence>
        {activeFilters.map((filter, index) => (
          <motion.div
            key={`${filter.key}-${filter.value}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: index * 0.05 }}
          >
            <Badge variant="secondary" className="px-3 py-1 flex items-center gap-1">
              {t(filter.value)}
              <button
                onClick={() => removeFilter(filter.key as keyof PropertyFiltersType, filter.value)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

