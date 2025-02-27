"use client"

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { ReactNode } from "react"
import en from "@/translations/en"
import ru from "@/translations/ru"
import tr from "@/translations/tr"

type Language = "en" | "ru" | "tr"
type TranslationsType = typeof en

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof TranslationsType) => string
}

const translations = {
  en,
  ru,
  tr,
} as const

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key.toString(),
})

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Language) || "en"
    }
    return "en"
  })

  const t = useCallback(
    (key: keyof TranslationsType) => {
      return translations[language][key] || key.toString()
    },
    [language],
  )

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
    }
  }, [language])

  const value = {
    language,
    setLanguage,
    t,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

