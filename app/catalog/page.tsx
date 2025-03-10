"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Search, Filter, Grid3X3, Map as MapIcon, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/contexts/LanguageContext"

// Mock properties data
const mockProperties = Array(12).fill(null).map((_, i) => ({
  id: i + 1,
  title: i % 3 === 0 ? "OBA VALENTINO VIP" : i % 3 === 1 ? "LUXURY VILLA WITH SEA VIEW" : "MODERN APARTMENT IN CITY CENTER",
  location: i % 3 === 0 ? "Alanya, Turkey" : i % 3 === 1 ? "Bodrum, Turkey" : "Istanbul, Turkey",
  price: i % 3 === 0 ? 183000 : i % 3 === 1 ? 450000 : 320000,
  currency: "EUR",
  image: i % 3 === 0 
    ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-60K8wlYz6HcKQpEroW8brdtjgC0omB.png" 
    : "/placeholder.svg?height=400&width=600",
  beds: i % 3 === 0 ? 2 : i % 3 === 1 ? 4 : 3,
  baths: i % 3 === 0 ? 1 : i % 3 === 1 ? 3 : 2,
  area: i % 3 === 0 ? 41 : i % 3 === 1 ? 220 : 120,
  type: i % 3 === 0 ? "apartment" : i % 3 === 1 ? "villa" : "apartment",
}))

export default function CatalogPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    minPrice: 0,
    maxPrice: 1000000,
    minArea: 0,
  })
  const [sortOption, setSortOption] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const propertiesPerPage = 9

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProperties(mockProperties)
      setLoading(false)
    }, 500)
  }, [])

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = !filters.type || property.type === filters.type
    const matchesLocation = !filters.location || property.location.includes(filters.location)
    const matchesPrice = property.price >= filters.minPrice && property.price <= filters.maxPrice
    const matchesArea = property.area >= filters.minArea
    
    return matchesSearch && matchesType && matchesLocation && matchesPrice && matchesArea
  })

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortOption) {
      case "priceLowToHigh":
        return a.price - b.price
      case "priceHighToLow":
        return b.price - a.price
      case "largestArea":
        return b.area - a.area
      default: // newest
        return b.id - a.id
    }
  })

  // Pagination
  const indexOfLastProperty = currentPage * propertiesPerPage
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage
  const currentProperties = sortedProperties.slice(indexOfFirstProperty, indexOfLastProperty)
  const totalPages = Math.ceil(sortedProperties.length / propertiesPerPage)

  const resetFilters = () => {
    setFilters({
      type: "",
      location: "",
      minPrice: 0,
      maxPrice: 1000000,
      minArea: 0,
    })
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">{t("propertyListing")}</h1>
        
        {/* Search and Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder={t("searchProperties")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    {t("filters")}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>{t("filters")}</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">{t("propertyType")}</label>
                      <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectType")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">{t("selectType")}</SelectItem>
                          <SelectItem value="apartment">{t("apartment")}</SelectItem>
                          <SelectItem value="house">{t("house")}</SelectItem>
                          <SelectItem value="villa">{t("villa")}</SelectItem>
                          <SelectItem value="commercial">{t("commercial")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">{t("location")}</label>
                      <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectLocation")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">{t("selectLocation")}</SelectItem>
                          <SelectItem value="Alanya">Alanya</SelectItem>
                          <SelectItem value="Bodrum">Bodrum</SelectItem>
                          <SelectItem value="Istanbul">Istanbul</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">{t("priceRange")}</label>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">{filters.minPrice.toLocaleString()} €</span>
                        <span className="text-sm">{filters.maxPrice.toLocaleString()} €</span>
                      </div>
                      <Slider
                        defaultValue={[filters.minPrice, filters.maxPrice]}
                        min={0}
                        max={1000000}
                        step={10000}
                        onValueChange={(value) => setFilters({...filters, minPrice: value[0], maxPrice: value[1]})}
                        className="my-4"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">{t("minArea")}</label>
                      <Input
                        type="number"
                        placeholder={t("enterMinArea")}
                        value={filters.minArea}
                        onChange={(e) => setFilters({...filters, minArea: Number(e.target.value)})}
                      />
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={resetFilters}>
                        {t("resetFilters")}
                      </Button>
                      <Button>
                        {t("apply")}
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("sortBy")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t("newest")}</SelectItem>
                  <SelectItem value="priceLowToHigh">{t("priceLowToHigh")}</SelectItem>
                  <SelectItem value="priceHighToLow">{t("priceHighToLow")}</SelectItem>
                  <SelectItem value="largestArea">{t("largestArea")}</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="hidden sm:flex border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("map")}
                  className="rounded-none"
                >
                  <MapIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Active filters */}
          {(filters.type || filters.location || filters.minPrice > 0 || filters.maxPrice < 1000000 || filters.minArea > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.type && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {t(filters.type)}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setFilters({...filters, type: ""})}
                  />
                </Badge>
              )}
              {filters.location && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.location}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setFilters({...filters, location: ""})}
                  />
                </Badge>
              )}
              {(filters.minPrice > 0 || filters.maxPrice < 1000000) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.minPrice.toLocaleString()} - {filters.maxPrice.toLocaleString()} €
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setFilters({...filters, minPrice: 0, maxPrice: 1000000})}
                  />
                </Badge>
              )}
              {filters.minArea > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {t("minArea")}: {filters.minArea} m²
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setFilters({...filters, minArea: 0})}
                  />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs">
                {t("resetFilters")}
              </Button>
            </div>
          )}
        </div>
        
        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {sortedProperties.length} {t("results")}
          </p>
        </div>
        
        {/* Properties Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(null).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                <div className="bg-white p-4 rounded-b-lg">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProperties.map((property) => (
              <div key={property.id} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                <div className="bg-white p-4 rounded-b-lg">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

