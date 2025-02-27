"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

const properties = [
  {
    id: 1,
    title: "Antalya // Kepez",
    description: "Yüksek Kira Getirisi Potansiyeline Sahip Site İçinde Lüks Daireler",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YrmtHArqFMEzPzgCTB1qGyCGUs18aV.png",
  },
  {
    id: 2,
    title: "Alanya // Mahmutlar",
    description: "Denize Yakın Modern Tasarımlı Rezidans Projesi",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 3,
    title: "Antalya // Konyaaltı",
    description: "Prestijli Lokasyonda Yatırımlık Daireler",
    image: "/placeholder.svg?height=600&width=800",
  },
]

export function PropertySlider() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % properties.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + properties.length) % properties.length)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <div className="relative h-[600px] overflow-hidden">
      {properties.map((property, index) => (
        <div
          key={property.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-blue-400/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">{property.title}</h2>
              <p className="text-xl sm:text-2xl md:text-3xl">{property.description}</p>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {properties.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

