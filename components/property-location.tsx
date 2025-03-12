"use client"

import { MapPin } from "lucide-react"

interface Distance {
  label: string
  distance: string
}

interface PropertyLocationProps {
  distances: Distance[]
}

export function PropertyLocation({ distances }: PropertyLocationProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
      {distances.map((item, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold">{item.distance}</p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

