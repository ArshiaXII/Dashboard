"use client"

import { useState, useEffect } from "react"
import { PropertySearch } from "@/components/property-search"
import { PropertyGrid } from "@/components/property-grid"
import { PropertyFilters } from "@/components/property-filters"
import { PropertyQuickView } from "@/components/property-quick-view"
import { ActiveFilters } from "@/components/active-filters"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Loader2, SlidersHorizontal } from "lucide-react"
import type { Property, PropertyFiltersType } from "@/types/property"

// This would typically come from an API
const mockProperties: Property[] = [
  {
    id: 1,
    title: "Luxury Villa with Sea View",
    location: "Antalya, Turkey",
    price: 500000,
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    type: "villa",
    image: "/placeholder.svg?height=400&width=600",
    amenities: ["pool", "garden"],
    dateAdded: new Date(),
  },
  {
    id: 2,
    title: "Modern Apartment in City Center",
    location: "Istanbul, Turkey",
    price: 300000,
    bedrooms: 2,
    bathrooms: 1,
    area: 100,
    type: "apartment",
    image: "/placeholder.svg?height=400&width=600",
    amenities: ["balcony"],
    dateAdded: new Date(),
  },
  // Add more mock properties as needed
]

const ITEMS_PER_PAGE = 9

export function CatalogContent() {
  const { t } = useLanguage()
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<PropertyFiltersType>({
    priceRange: [0, 2000000],
    propertyType: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    amenities: [],
    sortBy: "newest",
  })
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null)

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setProperties(mockProperties)
      } catch (err) {
        setError("Failed to fetch properties. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [])

  useEffect(() => {
    const applyFilters = () => {
      let result = properties

      if (filters.propertyType) {
        result = result.filter((property) => property.type === filters.propertyType)
      }

      if (filters.location) {
        result = result.filter((property) => property.location.includes(filters.location))
      }

      if (filters.bedrooms) {
        result = result.filter((property) => property.bedrooms >= Number.parseInt(filters.bedrooms))
      }

      if (filters.bathrooms) {
        result = result.filter((property) => property.bathrooms >= Number.parseInt(filters.bathrooms))
      }

      if (filters.area) {
        result = result.filter((property) => property.area >= Number.parseInt(filters.area))
      }

      result = result.filter(
        (property) => property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1],
      )

      if (filters.amenities.length > 0) {
        result = result.filter((property) =>
          filters.amenities.every((amenity) => property.amenities?.includes(amenity)),
        )
      }

      switch (filters.sortBy) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price)
          break
        case "price-desc":
          result.sort((a, b) => b.price - a.price)
          break
        case "newest":
          // Assuming there's a dateAdded field, otherwise keep the current order
          result.sort((a, b) => (b.dateAdded?.getTime() ?? 0) - (a.dateAdded?.getTime() ?? 0))
          break
        default:
          break
      }

      setFilteredProperties(result)
      setPage(1)
    }

    applyFilters()
  }, [filters, properties])

  const handleFilterChange = (newFilters: PropertyFiltersType) => {
    setFilters(newFilters)
  }

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const handleQuickView = (property: Property) => {
    setQuickViewProperty(property)
  }

  const paginatedProperties = filteredProperties.slice(0, page * ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <PropertySearch onSearch={handleFilterChange} />
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
          <div className="hidden md:block sticky top-24">
            <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full md:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                {t("filters")}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />
            </SheetContent>
          </Sheet>
        </aside>
        <main className="flex-grow">
          <ActiveFilters filters={filters} onChange={handleFilterChange} />
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <>
              <PropertyGrid properties={paginatedProperties} onQuickView={handleQuickView} viewMode="grid" />
              {paginatedProperties.length < filteredProperties.length && (
                <div className="mt-8 text-center">
                  <Button onClick={handleLoadMore}>{t("loadMore")}</Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      {quickViewProperty && (
        <PropertyQuickView property={quickViewProperty} onClose={() => setQuickViewProperty(null)} />
      )}
    </div>
  )
}

