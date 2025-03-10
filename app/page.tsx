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

export default function Home() {
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
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full">
        {/* Top Bar with Language, Login, and Contact */}
        <div className="bg-white border-b border-gray-200 py-1">
          <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <button className="flex items-center text-sm font-medium">
                  <span className="mr-1">▼</span> English
                </button>
                <button className="flex items-center text-sm font-medium ml-4">
                  <span className="mr-1">▼</span> EUR
                </button>
              </div>
              <button className="flex items-center text-sm font-medium text-blue-600">
                <span className="mr-1">🔒</span> LOGIN
              </button>
            </div>
            
            <div className="flex items-center flex-wrap">
              <div className="flex items-center mr-4">
                <span className="text-sm font-medium text-gray-600 mr-2">CALL NOW</span>
                <a href="tel:+902422345434" className="text-sm">+90 242 234 54 34</a>
              </div>
              <div className="flex items-center mr-4">
                <span className="text-sm font-medium text-gray-600 mr-2">MOBILE</span>
                <a href="tel:+905322124590" className="text-sm">+90 532 212 45 90</a>
              </div>
              <a href="#" className="mr-4">
                <Image src="/whatsapp-icon.png" alt="WhatsApp" width={20} height={20} />
              </a>
              <a href="#" className="bg-gray-100 text-sm py-1 px-3 rounded mr-2">
                FIND A PROPERTY
              </a>
              <a href="#" className="bg-red-600 text-white text-sm py-1 px-3 rounded">
                MAKE AN APPOINTMENT
              </a>
            </div>
          </div>
        </div>
        
        {/* Main Navigation */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="py-3">
              <Link href="/">
                <div className="flex flex-col">
                  <span className="text-red-600 font-bold text-xl">ANTALYA HOMES</span>
                  <span className="text-xs text-gray-600">LEADING REAL ESTATE COMPANY</span>
                </div>
              </Link>
            </div>
            
            <nav className="hidden md:flex">
              <Link href="/buy" className="px-4 py-6 font-medium">BUY</Link>
              <Link href="/sell" className="px-4 py-6 font-medium">SELL</Link>
              <Link href="/buying-guide" className="px-4 py-6 font-medium">BUYING GUIDE</Link>
              <Link href="/corporate" className="px-4 py-6 font-medium">CORPORATE</Link>
              <Link href="/blog" className="px-4 py-6 font-medium">BLOG</Link>
              <Link href="/contact-us" className="px-4 py-6 font-medium">CONTACT US</Link>
            </nav>
            
            <button className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Slider */}
      <section className="relative h-[80vh] min-h-[500px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/tekce-banner.jpg" // Replace with your actual banner image
            alt="Visit us at Apartments and Houses Fair Poznan"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        
        {/* Search Bar Overlay */}
        <div className="absolute bottom-10 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
              {/* Search Input */}
              <div className="p-4 pb-0">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="e.g. Home for sale in Antalya Lara"
                    className="pl-4 pr-12 py-3 border-2 border-gray-200 rounded-md w-full"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600">
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Filter Options */}
              <div className="grid grid-cols-3 gap-2 p-4">
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-gray-200 rounded-md py-2 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:border-gray-500">
                    <option value="">WHERE?</option>
                    <option value="alanya">Alanya</option>
                    <option value="antalya">Antalya</option>
                    <option value="bodrum">Bodrum</option>
                    <option value="istanbul">Istanbul</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-gray-200 rounded-md py-2 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:border-gray-500">
                    <option value="">TYPE</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="house">House</option>
                    <option value="commercial">Commercial</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-gray-200 rounded-md py-2 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:border-gray-500">
                    <option value="">ROOMS</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4+">4+</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 p-4 pt-0">
                <Button 
                  variant="outline"
                  className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  onClick={() => setShowFilters(true)}
                >
                  <span className="text-sm font-medium">MORE FILTERS</span>
                </Button>
                <Button className="bg-red-600 text-white hover:bg-red-700 transition-colors">
                  <span className="text-sm font-medium">SEARCH</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Slider Pagination */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          <div className="flex space-x-2">
            {[...Array(11)].map((_, i) => (
              <button 
                key={i} 
                className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-600' : 'bg-white/50'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* More Filters Dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="sticky top-0 bg-white p-4 border-b">
            <DialogTitle>Advanced Filters</DialogTitle>
          </DialogHeader>
          
          <div className="p-4">
            {/* Filter Sections */}
            <div className="space-y-2">
              {/* Installments */}
              <div className="border rounded-md overflow-hidden">
                <button 
                  className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => toggleFilter('installments')}
                >
                  <span className="font-medium">INSTALLMENTS</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isFilterExpanded('installments') ? 'rotate-180' : ''}`} />
                </button>
                
                {isFilterExpanded('installments') && (
                  <div className="p-4 border-t">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox id="installment-yes" />
                      <label htmlFor="installment-yes" className="text-sm">Available with installments</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="installment-no" />
                      <label htmlFor="installment-no" className="text-sm">No installments</label>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Storeys */}
              <div className="border rounded-md overflow-hidden">
                <button 
                  className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => toggleFilter('storeys')}
                >
                  <span className="font-medium">STOREYS</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isFilterExpanded('storeys') ? 'rotate-180' : ''}`} />
                </button>
                
                {isFilterExpanded('storeys') && (
                  <div className="p-4 border-t">
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4, 5, '6+'].map((storey) => (
                        <div key={storey} className="flex items-center space-x-2">
                          <Checkbox id={`storey-${storey}`} />
                          <label htmlFor={`storey-${storey}`} className="text-sm">{storey} {storey === 1 ? 'storey' : 'storeys'}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Plot Size */}
              <div className="border rounded-md overflow-hidden">
                <button 
                  className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => toggleFilter('plotSize')}
                >
                  <span className="font-medium">PLOT SIZE (m²)</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isFilterExpanded('plotSize') ? 'rotate-180' : ''}`} />
                </button>
                
                {isFilterExpanded('plotSize') && (
                  <div className="p-4 border-t">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Min: 0 m²</span>
                        <span className="text-sm">Max: 10,000+ m²</span>
                      </div>
                      <div className="px-2">
                        <Slider defaultValue={[0, 10000]} min={0} max={10000} step={100} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Interior Features */}
              <div className="border rounded-md overflow-hidden">
                <button 
                  className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => toggleFilter('interiorFeatures')}
                >
                  <span className="font-medium">INTERIOR FEATURES</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isFilterExpanded('interiorFeatures') ? 'rotate-180' : ''}`} />
                </button>
                
                {isFilterExpanded('interiorFeatures') && (
                  <div className="p-4 border-t">
                    <div className="grid grid-cols-2 gap-2">
                      {['Air Conditioning', 'Built-in Wardrobes', 'Furnished', 'Marble Floors', 'Smart Home System', 'Walk-in Closet'].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox id={`interior-${feature.toLowerCase().replace(/\s+/g, '-')}`} />
                          <label htmlFor={`interior-${feature.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm">{feature}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Exterior Features */}
              <div className="border rounded-md overflow-hidden">
                <button 
                  className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => toggleFilter('exteriorFeatures')}
                >
                  <span className="font-medium">EXTERIOR FEATURES</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isFilterExpanded('exteriorFeatures') ? 'rotate-180' : ''}`} />
                </button>
                
                {isFilterExpanded('exteriorFeatures') && (
                  <div className="p-4 border-t">
                    <div className="grid grid-cols-2 gap-2">
                      {['Balcony', 'Garden', 'Pool', 'Terrace', 'Parking', 'Security'].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox id={`exterior-${feature.toLowerCase()}`} />
                          <label htmlFor={`exterior-${feature.toLowerCase()}`} className="text-sm">{feature}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Location Features */}
              <div className="border rounded-md overflow-hidden">
                <button 
                  className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => toggleFilter('locationFeatures')}
                >
                  <span className="font-medium">LOCATION FEATURES</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isFilterExpanded('locationFeatures') ? 'rotate-180' : ''}`} />
                </button>
                
                {isFilterExpanded('locationFeatures') && (
                  <div className="p-4 border-t">
                    <div className="grid grid-cols-2 gap-2">
                      {['Beach Nearby', 'City Center', 'Sea View', 'Mountain View', 'Close to Amenities', 'Quiet Area'].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox id={`location-${feature.toLowerCase().replace(/\s+/g, '-')}`} />
                          <label htmlFor={`location-${feature.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm">{feature}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Heating Features */}
              <div className="border rounded-md overflow-hidden">
                <button 
                  className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => toggleFilter('heatingFeatures')}
                >
                  <span className="font-medium">HEATING FEATURES</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isFilterExpanded('heatingFeatures') ? 'rotate-180' : ''}`} />
                </button>
                
                {isFilterExpanded('heatingFeatures') && (
                  <div className="p-4 border-t">
                    <div className="grid grid-cols-2 gap-2">
                      {['Central Heating', 'Floor Heating', 'Gas Heating', 'Electric Heating', 'Solar Heating'].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox id={`heating-${feature.toLowerCase().replace(/\s+/g, '-')}`} />
                          <label htmlFor={`heating-${feature.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm">{feature}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Orientation Features */}
              <div className="border rounded-md overflow-hidden">
                <button 
                  className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => toggleFilter('orientationFeatures')}
                >
                  <span className="font-medium">ORIENTATION FEATURES</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isFilterExpanded('orientationFeatures') ? 'rotate-180' : ''}`} />
                </button>
                
                {isFilterExpanded('orientationFeatures') && (
                  <div className="p-4 border-t">
                    <div className="grid grid-cols-2 gap-2">
                      {['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'].map((orientation) => (
                        <div key={orientation} className="flex items-center space-x-2">
                          <Checkbox id={`orientation-${orientation.toLowerCase()}`} />
                          <label htmlFor={`orientation-${orientation.toLowerCase()}`} className="text-sm">{orientation}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter className="sticky bottom-0 bg-white p-4 border-t">
            <Button variant="outline" onClick={handleCloseFilters}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleCloseFilters}>
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Contact Bar */}
      <section className="bg-[#0078c8] text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center">
              <span className="font-medium mr-2">Need assistance?</span>
              <span>+90 555 123 4567</span>
            </div>
            <Link href="/contacts">
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Turkish Riviera Highlights */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#0078c8]"
          >
            Why Choose Alanya?
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.5,
                      delay: index * 0.1
                    } 
                  }
                }}
              >
                <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-b from-[#f8f9fb] to-white">
                  <CardContent className="p-6 text-center">
                    <div className="bg-[#e6f4ff] p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-7 w-7 text-[#0078c8]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-[#0078c8]">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MOST POPULAR PROPERTY LOCATIONS - Add this section here */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold mb-6 border-b pb-2 text-gray-800">
            MOST POPULAR PROPERTY LOCATIONS
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <Link href="/properties?location=antalya" className="hover:text-red-600 transition-colors">
              <div className="text-center">
                <span className="block font-medium">Antalya</span>
                <span className="text-gray-500 text-sm">(873)</span>
              </div>
            </Link>
            
            <Link href="/properties?location=alanya" className="hover:text-red-600 transition-colors">
              <div className="text-center">
                <span className="block font-medium">Alanya</span>
                <span className="text-gray-500 text-sm">(346)</span>
              </div>
            </Link>
            
            <Link href="/properties?location=bodrum" className="hover:text-red-600 transition-colors">
              <div className="text-center">
                <span className="block font-medium">Bodrum</span>
                <span className="text-gray-500 text-sm">(107)</span>
              </div>
            </Link>
            
            <Link href="/properties?location=belek" className="hover:text-red-600 transition-colors">
              <div className="text-center">
                <span className="block font-medium">Belek</span>
                <span className="text-gray-500 text-sm">(39)</span>
              </div>
            </Link>
            
            <Link href="/properties?location=fethiye" className="hover:text-red-600 transition-colors">
              <div className="text-center">
                <span className="block font-medium">Fethiye</span>
                <span className="text-gray-500 text-sm">(75)</span>
              </div>
            </Link>
            
            <Link href="/properties?location=mersin" className="hover:text-red-600 transition-colors">
              <div className="text-center">
                <span className="block font-medium">Mersin</span>
                <span className="text-gray-500 text-sm">(123)</span>
              </div>
            </Link>
          </div>
          
          <div className="mt-4">
            <Link href="/properties?location=kas-kalkan" className="hover:text-red-600 transition-colors">
              <div className="text-center inline-block mr-6">
                <span className="block font-medium">Kaş / Kalkan</span>
                <span className="text-gray-500 text-sm">(20)</span>
              </div>
            </Link>
            
            {/* You can add more locations here if needed */}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-12 md:py-16 bg-[#f8f9fb]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUp}
              className="text-2xl md:text-3xl font-bold text-[#0078c8]"
            >
              {t("featuredProperties")}
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUp}
            >
              <Link href="/catalog" className="text-[#0078c8] hover:underline flex items-center">
                {t("viewAllListings")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.5,
                      delay: index * 0.1
                    } 
                  }
                }}
              >
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300 border-none">
                  <div className="relative h-48 sm:h-56 md:h-64">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-[#0078c8] hover:bg-[#0069b4]">
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
                      <span>{property.beds} {t("beds")}</span>
                      <span>{property.baths} {t("baths")}</span>
                      <span>{property.area} m² {t("area")}</span>
                    </div>
                    <Link href={`/property/${property.id}`}>
                      <Button className="w-full bg-[#0078c8] hover:bg-[#0069b4]">{t("viewDetails")}</Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#0078c8]"
          >
            Popular Destinations in Turkey
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularLocations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.5,
                      delay: index * 0.1
                    } 
                  }
                }}
              >
                <Link href={`/catalog?location=${destination.name}`}>
                  <div className="relative rounded-lg overflow-hidden group cursor-pointer h-60">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <h3 className="text-white font-bold text-xl mb-1">{destination.name}</h3>
                      <p className="text-white/90 text-sm">{destination.properties} properties</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 bg-[#f8f9fb]">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#0078c8]"
          >
            {t("ourServices")}
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.5,
                      delay: index * 0.1
                    } 
                  }
                }}
              >
                <Card className="h-full hover:shadow-md transition-shadow duration-300 border-none">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2 text-[#0078c8]">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-[#0078c8] to-[#005a96] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("specialOfferTitle")}</h2>
            <p className="mb-6">{t("specialOfferDescription")}</p>
            <p className="mb-8 font-medium">{t("freeViewingTour")}</p>
            <Button variant="secondary" size="lg" className="bg-white text-[#0078c8] hover:bg-white/90">
              {t("scheduleFreeTour")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUp}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0078c8]">{t("welcomeToTurqaEstate")}</h2>
              <p className="text-gray-600 mb-4">{t("aboutUsShort")}</p>
              <Link href="/about">
                <Button variant="outline" className="border-[#0078c8] text-[#0078c8] hover:bg-[#0078c8] hover:text-white">
                  {t("readMoreAboutUs")}
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden"
            >
              <Image
                src="/placeholder.svg?height=400&width=600" // Replace with an image of your office or team
                alt="About TurqaEstate"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leading Real Estate Company Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-bold mb-4 text-[#1e3a8a]">
            Leading Real Estate Company at Turkish Riviera | Antalya Homes ®
          </h2>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Antalya Homes ® is the leading real estate company in the Turkish Riviera. We set estate agency standards since our establishment in 2004. You find thousands of properties for sale in the best locations on the Mediterranean Coast. Our professional team collects suitable real estate listings with pre-due diligence. We guarantee title deed delivery with zero failure and the best price. We offer professional and high-quality real estate services in over 30+ languages.
            </p>
            
            <p>
              Antalya Homes is the founder brand of TEKCE Real Estate. Our offices are located in Antalya (Lara - Konyaaltı - Döşemealtı - Belek - Alanya), Istanbul (Cevizlibağ - Göktürpe), Muğla (Bodrum - Fethiye), Mersin, Ankara, Bursa, Trabzon, Yalova and İzmir. As a global estate agency we operate in Spain (Málaga - Alicante), Sweden (Stockholm), Cyprus (Girne), and United Arab Emirates (Dubai). You can visit one of our 20 offices for coffee and experience the professional sales process.
            </p>
            
            <Link href="/about" className="text-red-600 hover:underline text-sm inline-block">
              Read More...
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-16 bg-[#f8f9fb]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0078c8]">{t("contactUs")}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t("contactUsShort")}</p>
            </motion.div>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6 md:p-8">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("name")}
                      </label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("email")}
                      </label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("phone")}
                    </label>
                    <Input id="phone" placeholder="Your phone number" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("message")}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full bg-[#0078c8] hover:bg-[#0069b4]">
                    {t("send")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
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

