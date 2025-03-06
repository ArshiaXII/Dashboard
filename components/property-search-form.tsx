"use client"

import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/contexts/LanguageContext"

export function PropertySearchForm() {
  const { t } = useLanguage()
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [rooms, setRooms] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic
    console.log({ location, propertyType, rooms })
  }

  return (
    <form 
      onSubmit={handleSearch}
      className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="relative z-30">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder={t("location") || "Location"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="antalya">Antalya</SelectItem>
              <SelectItem value="alanya">Alanya</SelectItem>
              <SelectItem value="belek">Belek</SelectItem>
              <SelectItem value="kemer">Kemer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative z-20">
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue placeholder={t("propertyType") || "Type"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">{t("apartment") || "Apartment"}</SelectItem>
              <SelectItem value="villa">{t("villa") || "Villa"}</SelectItem>
              <SelectItem value="house">{t("house") || "House"}</SelectItem>
              <SelectItem value="land">{t("land") || "Land"}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative z-10">
          <Select value={rooms} onValueChange={setRooms}>
            <SelectTrigger>
              <SelectValue placeholder={t("rooms") || "Rooms"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1+1</SelectItem>
              <SelectItem value="2">2+1</SelectItem>
              <SelectItem value="3">3+1</SelectItem>
              <SelectItem value="4">4+1</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Additional filters here */}
          <div className="relative z-5">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t("priceRange") || "Price Range"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-100000">€0 - €100,000</SelectItem>
                <SelectItem value="100000-200000">€100,000 - €200,000</SelectItem>
                <SelectItem value="200000-500000">€200,000 - €500,000</SelectItem>
                <SelectItem value="500000+">€500,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="relative z-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t("area") || "Area"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-50">0 - 50 m²</SelectItem>
                <SelectItem value="50-100">50 - 100 m²</SelectItem>
                <SelectItem value="100-200">100 - 200 m²</SelectItem>
                <SelectItem value="200+">200+ m²</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="relative z-3">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t("distanceToSea") || "Distance to Sea"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-500">0 - 500 m</SelectItem>
                <SelectItem value="500-1000">500 - 1000 m</SelectItem>
                <SelectItem value="1000-2000">1 - 2 km</SelectItem>
                <SelectItem value="2000+">2+ km</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          type="button" 
          variant="outline" 
          className="w-full sm:w-auto flex-1"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? t("lessFilters") || "Less Filters" : t("moreFilters") || "More Filters"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button type="submit" className="w-full sm:w-auto flex-1">
          <Search className="mr-2 h-4 w-4" />
          {t("search") || "Search"}
        </Button>
      </div>
    </form>
  )
} 