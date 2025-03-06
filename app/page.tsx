"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Building, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Search, 
  ChevronRight, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter 
} from "lucide-react"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Luxury Property"
            fill
            priority
            className="object-cover brightness-[0.7]"
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find Your Dream Home in Turkey
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Discover luxury properties in the most beautiful locations across Turkey
            </p>
            <div className="bg-white/90 p-4 md:p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-1 block">
                    Location
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="antalya">Antalya</SelectItem>
                      <SelectItem value="istanbul">Istanbul</SelectItem>
                      <SelectItem value="bodrum">Bodrum</SelectItem>
                      <SelectItem value="alanya">Alanya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-1 block">
                    Property Type
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-1 block">
                    Price Range
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-100000">€0 - €100,000</SelectItem>
                      <SelectItem value="100000-250000">€100,000 - €250,000</SelectItem>
                      <SelectItem value="250000-500000">€250,000 - €500,000</SelectItem>
                      <SelectItem value="500000+">€500,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <Button className="w-full md:w-auto bg-[#003366]">
                  <Search className="mr-2 h-4 w-4" /> Search Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Properties</h2>
              <p className="text-gray-600">Explore our handpicked luxury properties</p>
            </div>
            <Link href="/properties" className="mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center">
                View All Properties <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Property Card 1 */}
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/property1.jpg"
                  alt="Luxury Villa"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#003366] text-white px-3 py-1 rounded-full text-sm font-medium">
                  For Sale
                </div>
                <div className="absolute top-4 right-4 bg-white text-[#003366] px-3 py-1 rounded-full text-sm font-medium">
                  €450,000
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Luxury Villa with Sea View</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" /> Antalya, Lara
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" /> 4 Bedrooms
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" /> 3 Bathrooms
                  </div>
                  <div className="flex items-center">
                    <Maximize className="h-4 w-4 mr-1" /> 250 m²
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#003366]">View Details</Button>
              </CardFooter>
            </Card>
            
            {/* Property Card 2 */}
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/property2.jpg"
                  alt="Modern Apartment"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#003366] text-white px-3 py-1 rounded-full text-sm font-medium">
                  For Sale
                </div>
                <div className="absolute top-4 right-4 bg-white text-[#003366] px-3 py-1 rounded-full text-sm font-medium">
                  €180,000
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Modern Apartment in City Center</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" /> Alanya, Center
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" /> 2 Bedrooms
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" /> 1 Bathroom
                  </div>
                  <div className="flex items-center">
                    <Maximize className="h-4 w-4 mr-1" /> 120 m²
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#003366]">View Details</Button>
              </CardFooter>
            </Card>
            
            {/* Property Card 3 */}
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/property3.jpg"
                  alt="Beachfront Penthouse"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#003366] text-white px-3 py-1 rounded-full text-sm font-medium">
                  For Sale
                </div>
                <div className="absolute top-4 right-4 bg-white text-[#003366] px-3 py-1 rounded-full text-sm font-medium">
                  €650,000
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Beachfront Penthouse</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" /> Kemer, Seaside
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" /> 3 Bedrooms
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" /> 2 Bathrooms
                  </div>
                  <div className="flex items-center">
                    <Maximize className="h-4 w-4 mr-1" /> 200 m²
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#003366]">View Details</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Why Choose Turqa Estate</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide exceptional service and expertise in the Turkish real estate market
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-[#003366]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-[#003366]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Properties</h3>
              <p className="text-gray-600">
                We carefully select only the finest properties in the most desirable locations
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-[#003366]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-[#003366]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Prime Locations</h3>
              <p className="text-gray-600">
                Our properties are situated in the most sought-after areas across Turkey
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-[#003366]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-[#003366]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Guidance</h3>
              <p className="text-gray-600">
                Our team of professionals will guide you through every step of the buying process
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#003366] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">Ready to Find Your Dream Home?</h2>
              <p className="text-white/80">
                Contact us today to schedule a viewing or discuss your requirements
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#003366]">
                Browse Properties
              </Button>
              <Button className="bg-white text-[#003366] hover:bg-white/90">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Turqa Estate</h3>
              <p className="text-gray-400 mb-4">
                Luxury real estate in Turkey's most desirable locations
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="/properties" className="text-gray-400 hover:text-white">Properties</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Property Types</h3>
              <ul className="space-y-2">
                <li><Link href="/properties?type=apartment" className="text-gray-400 hover:text-white">Apartments</Link></li>
                <li><Link href="/properties?type=villa" className="text-gray-400 hover:text-white">Villas</Link></li>
                <li><Link href="/properties?type=penthouse" className="text-gray-400 hover:text-white">Penthouses</Link></li>
                <li><Link href="/properties?type=land" className="text-gray-400 hover:text-white">Land</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                  <span className="text-gray-400">
                    123 Lara Beach Road, Antalya, Turkey
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-gray-400" />
                  <span className="text-gray-400">+90 555 123 4567</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-gray-400" />
                  <span className="text-gray-400">info@turqaestate.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Turqa Estate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

