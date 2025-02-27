import { PropertyCard } from "./property-card"

const dummyProperties = [
  { id: 1, title: "Luxury Villa", price: 500000, location: "Antalya", image: "/placeholder.svg" },
  { id: 2, title: "Seaside Apartment", price: 300000, location: "Istanbul", image: "/placeholder.svg" },
  { id: 3, title: "Mountain Retreat", price: 400000, location: "Bodrum", image: "/placeholder.svg" },
]

export function PropertyGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dummyProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}

