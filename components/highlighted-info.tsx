"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

const highlights = [
  {
    title: "Expert Guidance",
    description: "Our team of professionals will guide you through every step of the process.",
  },
  { title: "Wide Selection", description: "Browse through our extensive catalog of premium properties across Turkey." },
  { title: "Personalized Service", description: "We tailor our services to meet your unique needs and preferences." },
  { title: "Local Expertise", description: "Benefit from our in-depth knowledge of the Turkish real estate market." },
]

export function HighlightedInfo() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % highlights.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + highlights.length) % highlights.length)
  }

  return (
    <section className="py-12 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="relative h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col justify-center items-center text-center"
            >
              <h3 className="text-2xl font-bold mb-4">{highlights[currentIndex].title}</h3>
              <p className="text-lg">{highlights[currentIndex].description}</p>
            </motion.div>
          </AnimatePresence>
          <Button variant="ghost" size="icon" className="absolute left-0 top-1/2 -translate-y-1/2" onClick={prevSlide}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2" onClick={nextSlide}>
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}

