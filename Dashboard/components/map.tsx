"use client"

import { useEffect, useRef } from "react"
import { Loader } from "@googlemaps/js-api-loader"

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      })

      const { Map } = await loader.importLibrary("maps")

      const position = { lat: 36.8969, lng: 30.7133 } // Antalya coordinates

      new Map(mapRef.current as HTMLElement, {
        center: position,
        zoom: 12,
      })
    }

    initMap()
  }, [])

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
}

