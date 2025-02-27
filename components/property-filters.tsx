"use client"

import { useCallback } from "react"
import { debounce } from "lodash"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/contexts/LanguageContext"
import type { PropertyFiltersType } from "@/types/property"
import { motion } from "framer-motion"
import { ChevronDown, Search } from "lucide-react"

interface PropertyFiltersProps {
  filters: PropertyFiltersType
  onFilterChange: (filters: PropertyFiltersType) => void
}

const amenities = ["pool", "garden", "parking", "security", "gym", "balcony", "elevator", "furnished"]

const sortOptions = [
  { value: "newest", label: "newest" },
  { value: "price-asc", label: "priceLowToHigh" },
  { value: "price-desc", label: "priceHighToLow" },
  { value: "area-desc", label: "largestArea" },
]

export function PropertyFilters({ filters, onFilterChange }: PropertyFiltersProps) {
  const { t } = useLanguage()

  const updateFilter = useCallback(
    (key: keyof PropertyFiltersType, value: any) => {
      onFilterChange({
        ...filters,
        [key]: value,
      })
    },
    [onFilterChange],
  )

  const toggleAmenity = useCallback(
    (amenity: string) => {
      const newAmenities = filters.amenities.includes(amenity)
        ? filters.amenities.filter((a) => a !== amenity)
        : [...filters.amenities, amenity]
      updateFilter("amenities", newAmenities)
    },
    [updateFilter],
  )

  const debouncedUpdateArea = useCallback(
    debounce((value: string) => updateFilter("area", value), 300),
    [updateFilter],
  )

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <Label className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 block">{t("sortBy")}</Label>
        <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
          <SelectTrigger>
            <SelectValue placeholder={t("selectSortOption")} />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {t(option.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 block">{t("propertyType")}</Label>
        <Select value={filters.propertyType} onValueChange={(value) => updateFilter("propertyType", value)}>
          <SelectTrigger>
            <SelectValue placeholder={t("selectType")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">{t("apartment")}</SelectItem>
            <SelectItem value="house">{t("house")}</SelectItem>
            <SelectItem value="villa">{t("villa")}</SelectItem>
            <SelectItem value="commercial">{t("commercial")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 block">{t("location")}</Label>
        <Select value={filters.location} onValueChange={(value) => updateFilter("location", value)}>
          <SelectTrigger>
            <SelectValue placeholder={t("selectLocation")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="antalya">Antalya</SelectItem>
            <SelectItem value="alanya">Alanya</SelectItem>
            <SelectItem value="istanbul">Istanbul</SelectItem>
            <SelectItem value="bodrum">Bodrum</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 block">{t("priceRange")}</Label>
        <Slider
          min={0}
          max={2000000}
          step={50000}
          value={filters.priceRange}
          onValueChange={(value) => updateFilter("priceRange", value)}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${filters.priceRange[0].toLocaleString()}</span>
          <span>${filters.priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-base sm:text-lg font-semibold block">{t("amenities")}</Label>
        <div className="grid grid-cols-2 gap-2">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <label
                htmlFor={amenity}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t(amenity)}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bedrooms">{t("bedrooms")}</Label>
          <Select value={filters.bedrooms} onValueChange={(value) => updateFilter("bedrooms", value)}>
            <SelectTrigger id="bedrooms">
              <SelectValue placeholder={t("any")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="bathrooms">{t("bathrooms")}</Label>
          <Select value={filters.bathrooms} onValueChange={(value) => updateFilter("bathrooms", value)}>
            <SelectTrigger id="bathrooms">
              <SelectValue placeholder={t("any")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="area">{t("minArea")} (m²)</Label>
        <Input
          type="number"
          id="area"
          placeholder={t("enterMinArea")}
          defaultValue={filters.area}
          onChange={(e) => debouncedUpdateArea(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          type="button"
          className="w-full sm:w-auto flex-1 rounded-[4px] border-gray-300 shadow-sm"
          onClick={() => console.log("Advanced filters clicked")}
        >
          {t("moreFilters")}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button
          type="submit"
          className="w-full sm:w-auto flex-1 rounded-[4px] bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-sm"
        >
          <Search className="mr-2 h-4 w-4" />
          {t("search")}
        </Button>
      </div>
    </motion.div>
  )
}

