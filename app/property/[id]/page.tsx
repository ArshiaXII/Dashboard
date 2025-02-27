"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyLocation } from "@/components/property-location"
import { PropertyAdvantages } from "@/components/property-advantages"

// Mock data - in a real app this would come from an API
const propertyData = {
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

export default function PropertyDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8F9FB] pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-900">
            Memoshome
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-gray-900">
            Projects
          </Link>
          <span>/</span>
          <span className="text-gray-900">{propertyData.title}</span>
        </div>

        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{propertyData.title}</h1>
          <p className="text-gray-500 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {propertyData.location}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <PropertyGallery images={propertyData.images} />

            {/* Description */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4">PROJECT DESCRIPTION</h2>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">{propertyData.description}</p>
              </div>

              {/* Location */}
              <div>
                <h2 className="text-xl font-bold mb-4">LOCATION</h2>
                <PropertyLocation distances={propertyData.distances} />
              </div>

              {/* Advantages */}
              <div>
                <h2 className="text-xl font-bold mb-4">ADVANTAGES</h2>
                <PropertyAdvantages advantages={propertyData.advantages} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="overflow-hidden">
                <CardContent className="p-6 space-y-6">
                  {/* Key Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">Area</p>
                      <p className="font-semibold">from {propertyData.area} m²</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">District</p>
                      <p className="font-semibold">Oba</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Floors</p>
                      <p className="font-semibold">{propertyData.floors}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Year of delivery</p>
                      <p className="font-semibold">{propertyData.yearOfDelivery}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500 text-sm">To the sea</p>
                      <p className="font-semibold">{propertyData.distanceToSea} m</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Price */}
                  <div>
                    <p className="text-gray-500 text-sm mb-2">Price</p>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">100% payment</Badge>
                      <Badge variant="outline">Installment</Badge>
                    </div>
                    <p className="text-2xl font-bold">
                      {propertyData.price.toLocaleString()} {propertyData.currency}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      Book a viewing
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      Ask a question
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

