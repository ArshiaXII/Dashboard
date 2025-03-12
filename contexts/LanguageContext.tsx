"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const translations: Record<string, Record<string, string>> = {
  en: {
    location: "Location",
    propertyType: "Property Type",
    rooms: "Rooms",
    apartment: "Apartment",
    villa: "Villa",
    house: "House",
    land: "Land",
    moreFilters: "More Filters",
    lessFilters: "Less Filters",
    search: "Search"
  },
  tr: {
    location: "Konum",
    propertyType: "Mülk Tipi",
    rooms: "Odalar",
    apartment: "Daire",
    villa: "Villa",
    house: "Ev",
    land: "Arsa",
    moreFilters: "Daha Fazla Filtre",
    lessFilters: "Daha Az Filtre",
    search: "Ara"
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en")

  const t = (key: string): string => {
    return translations[language]?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

