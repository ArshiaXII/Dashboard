"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

interface PropertyGalleryProps {
  images: string[]
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Handle swipe gestures on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextImage()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevImage()
    }
  }

  // Prevent scroll issues when dialog is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isFullscreen])

  return (
    <>
      <div className="relative rounded-lg overflow-hidden">
        <div 
          className="relative aspect-[16/9]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt="Property"
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
            priority
          />
        </div>

        {/* Navigation buttons - hidden on very small screens, visible on hover for larger screens */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 shadow-md z-10 w-8 h-8 sm:w-10 sm:h-10"
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 shadow-md z-10 w-8 h-8 sm:w-10 sm:h-10"
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 sm:right-4 top-2 sm:top-4 bg-white/80 hover:bg-white text-gray-800 shadow-md z-10 w-8 h-8 sm:w-10 sm:h-10"
          onClick={(e) => {
            e.stopPropagation();
            setIsFullscreen(true);
          }}
        >
          <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>

        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail grid - responsive columns */}
      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 gap-1 sm:gap-2 mt-1 sm:mt-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-200 ${
              index === currentImageIndex ? "ring-2 ring-primary" : "hover:opacity-80"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <Image 
              src={image || "/placeholder.svg"} 
              alt={`Property ${index + 1}`} 
              fill 
              className="object-cover" 
              sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 bg-black/95 sm:rounded-lg">
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={`Property ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Fullscreen navigation - larger on desktop, smaller on mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white z-20 w-8 h-8 sm:w-12 sm:h-12"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5 sm:h-8 sm:w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white z-20 w-8 h-8 sm:w-12 sm:h-12"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5 sm:h-8 sm:w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 sm:right-4 top-2 sm:top-4 bg-white/20 hover:bg-white/40 text-white z-20 w-8 h-8 sm:w-10 sm:h-10"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="h-4 w-4 sm:h-6 sm:w-6" />
            </Button>

            {/* Indicator dots - smaller on mobile */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

