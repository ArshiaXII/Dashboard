"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClipboardList, Building2, FileText, Key, Download } from "lucide-react"

const buyingSteps = [
  {
    icon: ClipboardList,
    title: "Wish List",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Choose a property type, home features, and region that best meets your home-buying needs. Decide whether it is for investment, living or both. Working with a local real estate company makes property buying easier, especially if you are a first-time buyer in Turkey. Real estate agents create a wish list according to your needs.",
  },
  {
    icon: Building2,
    title: "Viewing Tour",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "You meet with the seller and tour the homes you've selected in person. When you deal with a real estate agent, they will contact the seller, arrange a viewing tour, and give you all the information during the home tour.",
  },
  {
    icon: FileText,
    title: "Deposit and Sales Agreement",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "You choose the property you want to buy. Then your agent negotiates with the seller for the final price and terms of sale. The payment plan will be clear. Our company lawyers prepare your sales contract following the law, protecting all parties' rights.\n\nYou pay a 5,000 USD/EUR deposit to reserve the property and fix the price. You pay a down payment within 1-4 weeks after the deposit. You pay the remaining amount during the deed transfer.",
  },
  {
    icon: FileText,
    title: "Legal Procedures and Title Deed Conveyance",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Finally, you need to get a tax number. Your passport is enough for the application. Then you open a bank account to make purchase payments. The appraisal report is mandatory for foreigners to obtain Turkish citizenship or a residency permit.\n\nThe seller applies for a title deed (tapu in Turkish) conveyance to the General Directorate of The Land Registry to Cadastre. The real estate payment has to be completed before the final signature of the conveyance.",
  },
  {
    icon: Key,
    title: "Key Delivery and Moving In",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "After you get the title deed, you may have the keys. You may get the utility abonnements on your behalf with the title deed.",
  },
]

export default function BuyingProcessPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t("buyingPropertyInTurkey")}</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Buying a property in Turkey is a fast and easy procedure. You may get your title deed in just 3-4 days on
            your behalf if you have selected your property to buy. There are reliable registry institutions to secure
            real title deed conveyance. Foreigners have the same rights and conditions as the locals. Here is a
            step-by-step guide to investing and buying real estate in Turkey as a foreigner.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6">
          {buyingSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <step.icon className="h-6 w-6 text-primary" />
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden">
                    <Image
                      src={step.image || "/placeholder.svg"}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <p className="whitespace-pre-line">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          className="mt-12 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <p className="mb-4">
                If you can not spend a week time, our TeleProperty service handles your buying process remotely. You can
                join online tours and look at the properties as if you are there. You can speak with the seller and your
                agent all the time. Additionally, you do not need to come to Turkey in person for all these procedures,
                you can give a power of attorney to us, our property purchase solicitor, or a legal representative.
              </p>
              <p className="mb-4">
                There is a special program for real estate investors called Turkish Citizenship by Real Estate
                Investment. Foreigners may apply for Turkish citizenship by purchasing a property worth at least USD
                400,000. Investors must keep the property for 3 years on their behalf. You can learn all the investment
                program details from{" "}
                <Link href="/buying-guide/turkish-citizenship" className="text-primary hover:underline">
                  How to get Turkish Citizenship
                </Link>
                .
              </p>
              <p>
                If you want to reside in Turkey for longer than 6 months, you need to get a residence permit. The
                regulation allows buyers of property worth over USD 200,000 to get a residence permit. All information
                is available on{" "}
                <Link href="/buying-guide/residence-permit" className="text-primary hover:underline">
                  Residence Permit in Turkey
                </Link>
                .
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="mb-4">
                Foreigners have various financing alternatives when purchasing a home in Turkey. You may check{" "}
                <Link href="/buying-guide/financing" className="text-primary hover:underline">
                  home financing options in Turkey
                </Link>
                .
              </p>
              <div className="flex justify-center">
                <Button variant="outline" size="lg" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Property Buying Guide Turkey
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

