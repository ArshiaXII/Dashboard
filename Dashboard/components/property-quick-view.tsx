"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { ChevronLeft, ChevronRight, X, Bed, Bath, Square } from "lucide-react"
import type { Property } from "@/types/property"
import Link from "next/link"

interface PropertyQuickViewProps {
  property: Property
  onClose: () => void
}

export function PropertyQuickView({ property, onClose }: PropertyQuickViewProps) {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = property.images && property.images.length > 0 ? property.images : [property.image]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[700px] p-0 overflow-hidden bg-white rounded-lg">
        <DialogHeader className="p-6 sm:p-8">
          <DialogTitle className="text-2xl font-bold">{property.title}</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4 rounded-full" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="grid gap-4 sm:gap-6">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 700px"
            />
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 text-sm sm:text-base">
              <div className="flex items-center">
                <Bed className="w-5 h-5 mr-2 text-gray-500" />
                <span>
                  {property.bedrooms} {t("beds")}
                </span>
              </div>
              <div className="flex items-center">
                <Bath className="w-5 h-5 mr-2 text-gray-500" />
                <span>
                  {property.bathrooms} {t("baths")}
                </span>
              </div>
              <div className="flex items-center">
                <Square className="w-5 h-5 mr-2 text-gray-500" />
                <span>{property.area} m²</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{property.description}</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <span className="text-2xl font-bold text-orange-600">${property.price.toLocaleString()}</span>
              <Button asChild className="rounded-full bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
                <Link href={`/property/${property.id}`}>{t("viewFullDetails")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

