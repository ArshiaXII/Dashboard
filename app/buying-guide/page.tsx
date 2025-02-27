"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const guideCategories = [
  {
    title: "BUYING IN TURKEY",
    items: [
      {
        title: "BUYING PROCESS",
        href: "/buying-guide/buying-process",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "TAPU | TITLE DEED",
        href: "/buying-guide/tapu",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        logo: "TeleProperty",
        image: "/placeholder.svg?height=60&width=200",
        href: "/buying-guide/teleproperty",
      },
    ],
  },
  {
    title: "CITIZENSHIP IN TURKEY",
    items: [
      {
        title: "TURKISH CITIZENSHIP",
        href: "/buying-guide/turkish-citizenship",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "REAL ESTATE FUNDS",
        href: "/buying-guide/real-estate-funds",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        logo: "TeleMortgage",
        image: "/placeholder.svg?height=60&width=200",
        href: "/buying-guide/telemortgage",
      },
    ],
  },
  {
    title: "PURCHASE EXPENSES",
    items: [
      {
        title: "PURCHASE COSTS",
        href: "/buying-guide/purchase-costs",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "HEALTHCARE SYSTEM",
        href: "/buying-guide/healthcare",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        logo: "WikiProperty",
        image: "/placeholder.svg?height=60&width=200",
        href: "/buying-guide/wikiproperty",
      },
    ],
  },
  {
    title: "POWER OF ATTORNEY",
    items: [
      {
        title: "POWER OF ATTORNEY",
        href: "/buying-guide/power-of-attorney",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "RESIDENCE PERMIT",
        href: "/buying-guide/residence-permit",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "WHY TURKEY?",
        href: "/buying-guide/why-turkey",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    title: "FREQUENTLY ASKED QUESTIONS",
    items: [
      {
        title: "BUYING GUIDE FAQ",
        href: "/buying-guide/faq",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
]

export default function BuyingGuidePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t("buyingGuide")}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("buyingGuideDescription")}</p>
        </motion.div>

        {/* Guide Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guideCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg text-center text-primary">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.title || item.logo}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: categoryIndex * 0.1 + itemIndex * 0.05 }}
                      className="text-center"
                    >
                      <Link href={item.href} className="block group">
                        <div className="relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title || item.logo || ""}
                            width={item.logo ? 200 : 300}
                            height={item.logo ? 60 : 200}
                            className={`mx-auto ${item.logo ? "object-contain" : "object-cover rounded-lg"} transition-transform duration-300 group-hover:scale-105`}
                          />
                          {!item.logo && (
                            <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-white font-medium">{item.title}</span>
                            </div>
                          )}
                        </div>
                        {!item.logo && (
                          <span className="mt-2 block text-sm hover:text-primary transition-colors">{item.title}</span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-600 mb-4">{t("needMoreInfo")}</p>
          <Link href="/contact" className="text-primary hover:text-primary/80 font-medium">
            {t("contactUs")}
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

