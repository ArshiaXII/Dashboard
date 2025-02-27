import Link from "next/link"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

const recentProperties = [
  {
    id: 1,
    title: "Modern Apartment in Antalya",
    location: "Antalya, Turkey",
    price: 150000,
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Luxury Villa with Sea View",
    location: "Bodrum, Turkey",
    price: 500000,
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Cozy Studio in Istanbul",
    location: "Istanbul, Turkey",
    price: 80000,
    bedrooms: 1,
    bathrooms: 1,
    area: 50,
    image: "/placeholder.svg?height=300&width=400",
  },
]

export function RecentProperties() {
  const { t } = useLanguage()

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{t("newAddedProperties")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/catalog">{t("viewAllListings")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

