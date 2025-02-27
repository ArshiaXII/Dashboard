import type { Metadata } from "next"
import { CatalogContent } from "@/components/catalog-content"

export const metadata: Metadata = {
  title: "Property Catalog | TurqaEstate",
  description:
    "Browse our extensive catalog of properties for sale in Turkey. Find your dream home or investment opportunity.",
}

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Property Catalog</h1>
        <CatalogContent />
      </div>
    </div>
  )
}

