import { PropertyGrid } from "@/components/property-grid"

export default function PropertiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Featured Properties</h1>
      <PropertyGrid />
    </div>
  )
}

