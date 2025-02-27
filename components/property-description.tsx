"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"

interface PropertyDescriptionProps {
  description: string
}

export function PropertyDescription({ description }: PropertyDescriptionProps) {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <motion.h2 className="text-2xl font-bold mb-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        {t("description")}
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        {description}
      </motion.p>
    </div>
  )
}

