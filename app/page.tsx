"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, MapPin, ArrowRight, Sun, Umbrella, Building, Palm, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/LanguageContext"

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

// Featured properties data
const featuredProperties = [
  {
    id: 1,
    title: "OBA VALENTINO VIP",
    location: "Alanya, Turkey",
    price: 183000,
    currency: "EUR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-60K8wlYz6HcKQpEroW8brdtjgC0omB.png",
    beds: 2,
    baths: 1,
    area: 41,
    isNew: true,
  },
  {
    id: 2,
    title: "LUXURY VILLA WITH SEA VIEW",
    location: "Bodrum, Turkey",
    price: 450000,
    currency: "EUR",
    image: "/placeholder.svg?height=400&width=600",
    beds: 4,
    baths: 3,
    area: 220,
    isNew: false,
  },
  {
    id: 3,
    title: "MODERN APARTMENT IN CITY CENTER",
    location: "Istanbul, Turkey",
    price: 320000,
    currency: "EUR",
    image: "/placeholder.svg?height=400&width=600",
    beds: 3,
    baths: 2,
    area: 120,
    isNew: true,
  },
]

// Popular locations data
const popularLocations = [
  { name: "Istanbul", properties: 245, image: "/placeholder.svg?height=400&width=300" },
  { name: "Antalya", properties: 187, image: "/placeholder.svg?height=400&width=300" },
  { name: "Bodrum", properties: 124, image: "/placeholder.svg?height=400&width=300" },
  { name: "Alanya", properties: 98, image: "/placeholder.svg?height=400&width=300" },
]

// Services data
const services = [
  {
    title: "Property Search",
    description: "Find your perfect property with our advanced search tools.",
    icon: Search,
  },
  {
    title: "Legal Assistance",
    description: "Expert legal guidance throughout the buying process.",
    icon: Sun,
  },
  {
    title: "Property Management",
    description: "Comprehensive management services for your investment properties.",
    icon: Umbrella,
  },
  {
    title: "Buying Assistance",
    description: "Expert assistance in the buying process.",
    icon: Building,
  },
]

export default function HomePage() {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter states
  const [expandedFilters, setExpandedFilters] = useState<string[]>([])
  
  const toggleFilter = (filter: string) => {
    if (expandedFilters.includes(filter)) {
      setExpandedFilters(expandedFilters.filter(f => f !== filter))
    } else {
      setExpandedFilters([...expandedFilters, filter])
    }
  }
  
  const isFilterExpanded = (filter: string) => expandedFilters.includes(filter)

  // Function to handle opening the filters modal
  const handleOpenFilters = () => {
    console.log("Opening filters modal")
    setShowFilters(true)
  }

  // Function to handle closing the filters modal
  const handleCloseFilters = () => {
    console.log("Closing filters modal")
    setShowFilters(false)
  }

  // Handle scroll for animations
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    handleResize()

    // Add event listeners
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/luxury-real-estate.jpg"
            alt="Luxury Real Estate"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t("welcomeMessage") || "Find Your Dream Home in Turkey"}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              {t("homeDescription") || "Discover luxurious properties in the most desirable locations"}
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder={t("searchPlaceholder") || "Search by city, region, or property type"}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-20 py-6 text-black rounded-full shadow-lg"
                />
                <Button 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full px-4"
                >
                  {t("search") || "Search"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("featuredProperties") || "Featured Properties"}
            </h2>
            <Link href="/catalog" className="text-primary hover:underline flex items-center">
              {t("viewAllListings") || "View All Listings"}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary hover:bg-primary/90">
                      {property.price.toLocaleString()} {property.currency}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{property.title}</h3>
                  <p className="text-gray-500 flex items-center mb-4 text-sm">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    {property.location}
                  </p>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{property.beds} {t("beds") || "beds"}</span>
                    <span>{property.baths} {t("baths") || "baths"}</span>
                    <span>{property.area} m² {t("area") || "area"}</span>
                  </div>
                  <Link href={`/property/${property.id}`}>
                    <Button className="w-full">{t("viewDetails") || "View Details"}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {t("ourServices") || "Our Services"}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { 
                title: t("propertySearch") || "Property Search", 
                description: t("propertySearchDescription") || "Find your perfect property with our advanced search tools."
              },
              { 
                title: t("legalAssistance") || "Legal Assistance", 
                description: t("legalAssistanceDescription") || "Expert legal guidance throughout the buying process."
              },
              { 
                title: t("propertyManagement") || "Property Management", 
                description: t("propertyManagementDescription") || "Comprehensive management services for your investment properties."
              },
              { 
                title: t("buyingAssistance") || "Buying Assistance", 
                description: t("buyingAssistanceDescription") || "Personalized support to help you make the right purchase decision."
              },
            ].map((service, index) => (
              <Card key={index} className="h-full hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t("welcomeToTurqaEstate") || "Welcome to TurqaEstate"}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("aboutUsShort") || "TurqaEstate is your trusted partner in finding the perfect property in Turkey."}
              </p>
              <Link href="/about">
                <Button variant="outline">{t("readMoreAboutUs") || "Read More About Us"}</Button>
              </Link>
            </div>
            <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="About TurqaEstate"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("contactUs") || "Contact Us"}</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            {t("contactUsShort") || "Have questions? We're here to help!"}
          </p>
          <Link href="/contact">
            <Button variant="secondary">{t("getInTouch") || "Get in Touch"}</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

// Property Card Component
function PropertyCard({ property }) {
  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        
        {property.isNew && (
          <Badge className="absolute top-3 left-3 bg-primary text-white">New</Badge>
        )}
        
        <div className="absolute bottom-3 right-3">
          <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
            {property.price.toLocaleString()} {property.currency}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4 sm:p-5">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{property.title}</h3>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>{property.beds} beds</div>
          <div>{property.baths} baths</div>
          <div>{property.area} m²</div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link href={`/property/${property.id}`}>
            <Button variant="link" className="p-0 h-auto text-primary">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

