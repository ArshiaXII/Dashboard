"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import type { Property } from "@/types/property"

interface PropertySpecificationsProps {
  property: Property
}

export function PropertySpecifications({ property }: PropertySpecificationsProps) {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">{t("specifications")}</h2>
      <ul className="space-y-2">
        <li>
          <span className="font-semibold">{t("propertyType")}:</span> {t(property.type)}
        </li>
        <li>
          <span className="font-semibold">{t("yearBuilt")}:</span> {property.constructionYear}
        </li>
        <li>
          <span className="font-semibold">{t("energyRating")}:</span> {property.energyRating}
        </li>
        <li>
          <span className="font-semibold">{t("totalArea")}:</span> {property.area} m²
        </li>
        <li>
          <span className="font-semibold">{t("bedrooms")}:</span> {property.bedrooms}
        </li>
        <li>
          <span className="font-semibold">{t("bathrooms")}:</span> {property.bathrooms}
        </li>
      </ul>
    </div>
  )
}

