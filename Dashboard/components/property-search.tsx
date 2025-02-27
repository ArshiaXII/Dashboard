"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/LanguageContext"
import type { PropertyFiltersType } from "@/types/property"

const MotionInput = motion(Input)
const MotionSelect = motion(Select)

interface PropertySearchProps {
  onSearch: (filters: Partial<PropertyFiltersType>) => void
}

export function PropertySearch({ onSearch }: PropertySearchProps) {
  const { t } = useLanguage()
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [priceRange, setPriceRange] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const filters: Partial<PropertyFiltersType> = {
      location,
      propertyType,
    }
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number)
      filters.priceRange = [min, max === 0 ? 2000000 : max]
    }
    onSearch(filters)
  }

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-white/90">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <MapPin className="h-5 w-5" />
          </div>
          <MotionInput
            type="text"
            placeholder={t("where")}
            className="pl-10 h-12 rounded-full border-gray-300"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        <MotionSelect value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger className="h-12 rounded-full border-gray-300">
            <SelectValue placeholder={t("type")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">{t("apartment")}</SelectItem>
            <SelectItem value="villa">{t("villa")}</SelectItem>
            <SelectItem value="house">{t("house")}</SelectItem>
            <SelectItem value="penthouse">{t("penthouse")}</SelectItem>
          </SelectContent>
        </MotionSelect>

        <MotionSelect value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className="h-12 rounded-full border-gray-300">
            <SelectValue placeholder={t("priceRange")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-100000">$0 - $100,000</SelectItem>
            <SelectItem value="100000-250000">$100,000 - $250,000</SelectItem>
            <SelectItem value="250000-500000">$250,000 - $500,000</SelectItem>
            <SelectItem value="500000-0">{t("above")} $500,000</SelectItem>
          </SelectContent>
        </MotionSelect>

        <Button type="submit" className="h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium">
          <Search className="w-5 h-5 mr-2" />
          {t("search")}
        </Button>
      </div>
    </form>
  )
}

