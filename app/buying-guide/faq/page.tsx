import type { Metadata } from "next"
import { FAQContent } from "@/components/faq-content"

export const metadata: Metadata = {
  title: "Buying Guide FAQ | TurqaEstate",
  description:
    "Find answers to the most common questions about buying property in Turkey. Expert advice on the Turkish real estate market, legal procedures, and more.",
}

export default function BuyingGuideFAQ() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-24">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-8">Buying Guide FAQ</h1>
        <FAQContent />
      </div>
    </div>
  )
}

