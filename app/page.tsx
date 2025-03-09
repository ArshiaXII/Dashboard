"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, MapPin, ArrowRight, Sun, Umbrella, Building, Palm } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
      {/* Hero Section with Mediterranean Theme */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/luxury-real-estate.jpg" // Replace with a beautiful Alanya coastline image
            alt="Alanya Coastline"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Discover Your Dream Home in Alanya
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Luxury properties with breathtaking Mediterranean views in Turkey's most beautiful coastal paradise
            </p>
            
            {/* Search Bar - Styled like the image */}
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
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
                <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
                  <span className="text-sm font-medium">MORE FILTERS</span>
                </button>
                <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
                  <span className="text-sm font-medium">SEARCH</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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

