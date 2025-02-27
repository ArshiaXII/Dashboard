"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, FileText, Home, Key } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

const services = [
  {
    icon: Search,
    title: "propertySearch",
    description: "propertySearchDescription",
  },
  {
    icon: FileText,
    title: "legalAssistance",
    description: "legalAssistanceDescription",
  },
  {
    icon: Home,
    title: "propertyManagement",
    description: "propertyManagementDescription",
  },
  {
    icon: Key,
    title: "buyingAssistance",
    description: "buyingAssistanceDescription",
  },
]

export function ServicesOverview() {
  const { t } = useLanguage()

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("ourServices")}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <service.icon className="w-10 h-10 text-primary mb-4" />
                  <CardTitle className="text-lg sm:text-xl">{t(service.title)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{t(service.description)}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

