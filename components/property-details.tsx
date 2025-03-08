"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyLocation } from "@/components/property-location"
import { PropertyAdvantages } from "@/components/property-advantages"

interface PropertyDetailsProps {
  propertyData: {
    id: number;
    title: string;
    location: string;
    price: number;
    currency: string;
    area: number;
    floors: number;
    yearOfDelivery: number;
    distanceToSea: number;
    description: string;
    images: string[];
    distances: {
      label: string;
      distance: string;
    }[];
    advantages: {
      image: string;
      title: string;
    }[];
  }
}

export function PropertyDetails({ propertyData }: PropertyDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
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
  )
}

