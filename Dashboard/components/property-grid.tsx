"use client"

import { motion } from "framer-motion"
import { PropertyCard } from "@/components/property-card"
import type { Property } from "@/types/property"

interface PropertyGridProps {
  properties: Property[]
  onQuickView: (property: Property) => void
  viewMode: "grid" | "list" | "map"
}

export function PropertyGrid({ properties, onQuickView, viewMode }: PropertyGridProps) {
  if (viewMode === "map") {
    // Implement map view here
    return <div>Map view not implemented</div>
  }

  return (
    <div
      className={
        viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" : "space-y-6 sm:space-y-8"
      }
    >
      {properties.map((property, index) => (
        <motion.div
          key={property.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <PropertyCard key={property.id} property={property} onQuickView={onQuickView} />
        </motion.div>
      ))}
    </div>
  )
}

