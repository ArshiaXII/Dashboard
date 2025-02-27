"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { useLanguage } from "@/contexts/LanguageContext"
import { PropertyCard } from "@/components/property-card"
import type { Property } from "@/types/property"

interface PropertyMapProps {
  properties: Property[]
  onQuickView: (property: Property) => void
}

export function PropertyMap({ properties, onQuickView }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      })

      const { Map } = await loader.importLibrary("maps")

      if (mapRef.current) {
        const mapInstance = new Map(mapRef.current, {
          center: { lat: 36.5444, lng: 32.0044 }, // Alanya coordinates
          zoom: 12,
        })

        setMap(mapInstance)
        setInfoWindow(new google.maps.InfoWindow())
      }
    }

    initMap()
  }, [])

  useEffect(() => {
    if (!map || !infoWindow) return

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null))

    // Create new markers
    const newMarkers = properties.map((property) => {
      const marker = new google.maps.Marker({
        position: { lat: property.lat || 36.5444, lng: property.lng || 32.0044 },
        map,
        title: property.title,
      })

      const content = `
        <div class="p-2 max-w-[200px]">
          <img src="${property.image}" alt="${property.title}" class="w-full h-32 object-cover mb-2 rounded" />
          <h3 class="font-semibold">${property.title}</h3>
          <p class="text-primary font-bold">$${property.price.toLocaleString()}</p>
        </div>
      `

      marker.addListener("click", () => {
        infoWindow.setContent(content)
        infoWindow.open(map, marker)
      })

      return marker
    })

    setMarkers(newMarkers)

    // Fit bounds to show all markers
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds()
      newMarkers.forEach((marker) => bounds.extend(marker.getPosition()!))
      map.fitBounds(bounds)
    }
  }, [map, properties, infoWindow, markers]) // Added markers to dependencies

  return (
    <div className="relative h-[600px]">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-4 max-h-[calc(100%-2rem)] overflow-y-auto">
        {properties.map((property) => (
          <div key={property.id} className="mb-4 last:mb-0">
            <PropertyCard property={property} onQuickView={() => onQuickView(property)} />
          </div>
        ))}
      </div>
    </div>
  )
}

