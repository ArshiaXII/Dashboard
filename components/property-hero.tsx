"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/LanguageContext"
import { PropertySlider } from "@/components/property-slider"

export function PropertyHero() {
  const { t } = useLanguage()
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [rooms, setRooms] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Search submitted:", { location, propertyType, rooms })
  }

  return (
    <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
      <PropertySlider />

      <motion.div
        className="absolute inset-x-0 bottom-4 sm:bottom-10 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <form
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder={t("location")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="antalya">Antalya</SelectItem>
                  <SelectItem value="alanya">Alanya</SelectItem>
                  <SelectItem value="belek">Belek</SelectItem>
                  <SelectItem value="kemer">Kemer</SelectItem>
                </SelectContent>
              </Select>

              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder={t("propertyType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">{t("apartment")}</SelectItem>
                  <SelectItem value="villa">{t("villa")}</SelectItem>
                  <SelectItem value="house">{t("house")}</SelectItem>
                  <SelectItem value="land">{t("land")}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={rooms} onValueChange={setRooms}>
                <SelectTrigger>
                  <SelectValue placeholder={t("rooms")} />
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

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                type="button"
                className="w-full sm:w-auto flex-1"
                onClick={() => console.log("Advanced filters clicked")}
              >
                {t("moreFilters")}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button type="submit" className="w-full sm:w-auto flex-1">
                <Search className="mr-2 h-4 w-4" />
                {t("search")}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

