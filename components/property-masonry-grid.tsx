"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { PropertyCard } from "@/components/property-card"
import type { Property } from "@/types/property"

interface PropertyMasonryGridProps {
  properties: Property[]
  onLoadMore: () => void
  hasMore: boolean
  onQuickView: (property: Property) => void
}

export function PropertyMasonryGrid({ properties, onLoadMore, hasMore, onQuickView }: PropertyMasonryGridProps) {
  const [columns, setColumns] = useState(3)
  const observer = useRef<IntersectionObserver | null>(null)
  const lastPropertyRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(1)
      } else if (window.innerWidth < 1024) {
        setColumns(2)
      } else {
        setColumns(3)
      }
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore()
        }
      },
      { threshold: 1 },
    )

    if (lastPropertyRef.current) {
      observer.current.observe(lastPropertyRef.current)
    }

    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [hasMore, onLoadMore])

  const columnProperties = Array.from({ length: columns }, (_, i) =>
    properties.filter((_, index) => index % columns === i),
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {columnProperties.map((column, columnIndex) => (
        <div key={columnIndex} className="space-y-6">
          {column.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              ref={index === column.length - 1 && columnIndex === columns - 1 ? lastPropertyRef : null}
            >
              <PropertyCard property={property} onQuickView={() => onQuickView(property)} />
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  )
}

