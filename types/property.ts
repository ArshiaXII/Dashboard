export interface Property {
  id: number
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  type: string
  image: string
  featured?: boolean
  description?: string
  amenities?: string[]
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface PropertyFiltersType {
  priceRange: [number, number]
  propertyType: string
  location: string
  bedrooms: string
  bathrooms: string
  area: string
  amenities: string[]
  sortBy: string
}

