"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

export function IntroductionSection() {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => setExpanded(!expanded)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-full">
            <h1 className="text-2xl font-semibold mb-4 text-primary">{t("welcomeToTurqaEstate")}</h1>
            <h2 className="text-xl font-medium mb-6 text-gray-700">{t("yourTrustedPartnerInTurkishRealEstate")}</h2>
            <div className="prose max-w-none mb-6">
              <p className="mb-4">{t("introductionParagraph1")}</p>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mb-4">{t("introductionParagraph2")}</p>
                    <p className="mb-4">{t("introductionParagraph3")}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button onClick={toggleExpand}>{expanded ? t("readLess") : t("readMore")}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

