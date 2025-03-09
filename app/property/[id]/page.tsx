"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { MapPin, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyLocation } from "@/components/property-location"
import { PropertyAdvantages } from "@/components/property-advantages"
import { motion } from "framer-motion"

// Mock data - in a real app this would come from an API
const mockPropertyData = {
  id: 1,
  title: "OBA VALENTINO VIP",
  location: "Alanya, Antalya, Turkey NO.134256",
  price: 183000,
  currency: "EUR",
  area: 41,
  floors: 6,
  yearOfDelivery: 2025,
  distanceToSea: 2000,
  description: `The OBA VALENTINO VIP project consists of two blocks and includes 72 premium quality apartments with ready renovation and a smart home system. 46 cozy and spacious apartments with 1+1 layout (41-46 m2) and 26 designer duplexes with 2+1 layout (82-97 m2).

Impeccable location in the popular Oba area close to the sea and the center of Alanya surrounded by the majestic Taurus Mountains. You will always be able to enjoy incredible views from your own terrace. European style, exclusive design, complete infrastructure, including swimming pools, spa centers and gyms equipped with professional equipment!`,
  images: [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-60K8wlYz6HcKQpEroW8brdtjgC0omB.png",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  distances: [
    {
      label: "to the river and the Dim Chai recreation area",
      distance: "800 m",
    },
    {
      label: "to the sea",
      distance: "2 km",
    },
    {
      label: "to the center of Alanya",
      distance: "5 km",
    },
    {
      label: "to Antalya airport",
      distance: "125 km",
    },
    {
      label: "to Gazipasa airport",
      distance: "35 km",
    },
    {
      label: "to the Wladorf private school",
      distance: "200 m",
    },
  ],
  advantages: [
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Premium finish materials",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Unique architecture",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Pool view from terrace",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Sports complex",
    },
  ],
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
}

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function PropertyDetailPage() {
  const params = useParams()
  const [propertyData, setPropertyData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch the property data from an API
    // For now, we'll just use the mock data
    try {
      // Simulate API call
      setTimeout(() => {
        setPropertyData(mockPropertyData)
        setLoading(false)
      }, 500)
    } catch (err) {
      console.error("Error fetching property data:", err)
      setError("Failed to load property data. Please try again later.")
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] pt-16 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mb-8"></div>
          <div className="h-64 w-full max-w-2xl bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] pt-16 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-red-500 mb-4 text-lg">{error}</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Return to home page
          </Link>
        </motion.div>
      </div>
    )
  }

  if (!propertyData) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] pt-16 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-red-500 mb-4 text-lg">Property not found</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Return to home page
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] pt-16">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Breadcrumb */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-wrap items-center text-sm text-gray-500 mb-4 sm:mb-6"
        >
          <Link href="/" className="hover:text-gray-900">
            Memoshome
          </Link>
          <span className="mx-2">/</span>
          <Link href="/projects" className="hover:text-gray-900">
            Projects
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate max-w-[200px] sm:max-w-none">{propertyData.title}</span>
        </motion.div>

        {/* Title Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={slideUp}
          className="mb-6"
        >
          <div className="flex justify-between items-start">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{propertyData.title}</h1>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart 
                className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                strokeWidth={isFavorite ? 2 : 1.5}
              />
            </button>
          </div>
          <p className="text-gray-500 flex items-center flex-wrap">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="break-words">{propertyData.location}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-2 space-y-6 sm:space-y-8"
          >
            {/* Image Gallery */}
            <motion.div variants={slideUp}>
              <PropertyGallery images={propertyData.images} />
            </motion.div>

            {/* Description */}
            <motion.div 
              variants={staggerContainer}
              className="space-y-6 sm:space-y-8"
            >
              <motion.div variants={slideUp}>
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">PROJECT DESCRIPTION</h2>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed text-sm sm:text-base">{propertyData.description}</p>
              </motion.div>

              {/* Location */}
              <motion.div variants={slideUp}>
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">LOCATION</h2>
                <PropertyLocation distances={propertyData.distances} />
              </motion.div>

              {/* Advantages */}
              <motion.div variants={slideUp}>
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">ADVANTAGES</h2>
                <PropertyAdvantages advantages={propertyData.advantages} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-6">
              <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Key Details */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <p className="text-gray-500 text-xs sm:text-sm">Area</p>
                      <p className="font-semibold text-sm sm:text-base">from {propertyData.area} m²</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs sm:text-sm">District</p>
                      <p className="font-semibold text-sm sm:text-base">Oba</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs sm:text-sm">Floors</p>
                      <p className="font-semibold text-sm sm:text-base">{propertyData.floors}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs sm:text-sm">Year of delivery</p>
                      <p className="font-semibold text-sm sm:text-base">{propertyData.yearOfDelivery}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500 text-xs sm:text-sm">To the sea</p>
                      <p className="font-semibold text-sm sm:text-base">{propertyData.distanceToSea} m</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Price */}
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm mb-2">Price</p>
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">100% payment</Badge>
                      <Badge variant="outline" className="text-xs">Installment</Badge>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold">
                      {propertyData.price.toLocaleString()} {propertyData.currency}
                    </p>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 transition-colors duration-300" 
                      size="lg"
                    >
                      Book a viewing
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-primary text-primary hover:bg-primary/5 transition-colors duration-300" 
                      size="lg"
                    >
                      Ask a question
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

