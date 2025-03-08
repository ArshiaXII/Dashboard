"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Building2, Users, Award, Target } from "lucide-react"
import React from 'react'

const teamMembers = [
  {
    name: "Alex Johnson",
    position: "ceoFounder",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Maria Garcia",
    position: "headOfSales",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Kemal Yılmaz",
    position: "legalAdvisor",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Sophie Chen",
    position: "marketingDirector",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const achievements = [
  { icon: Building2, value: "1000+", label: "propertiesSold" },
  { icon: Users, value: "500+", label: "happyClients" },
  { icon: Award, value: "10+", label: "yearsOfExperience" },
  { icon: Target, value: "5", label: "citiesCovered" },
]

const AboutPage = () => {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("aboutTurqaEstate")}
      </motion.h1>

      <div className="space-y-8 md:space-y-12">
        <motion.div
          className="bg-gray-100 rounded-lg p-6 sm:p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-primary">{t("ourStory")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <p className="mb-4 text-sm sm:text-base">
                TurqaEstate была основана в 2010 году с целью стать ведущим агентством недвижимости в Турции. Наш путь
                начался в Анталии, и с тех пор мы расширили свою деятельность, охватив крупные города и туристические
                направления по всей стране.
              </p>
              <p className="text-sm sm:text-base">
                Имея более десяти лет опыта, TurqaEstate помогла тысячам клиентов найти дом своей мечты, сделать
                выгодные инвестиции и разобраться в сложностях турецкого рынка недвижимости.
              </p>
            </div>
            <div className="relative h-48 sm:h-64 md:h-full min-h-[200px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt={t("turqaEstateOffice")}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 text-center text-primary">
            {t("ourTeam")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="relative w-full pt-[100%] mb-4 rounded-full overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <CardTitle className="text-center text-lg sm:text-xl">{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-sm sm:text-base text-gray-500">
                      {t(member.position as "ceoFounder" | "headOfSales" | "legalAdvisor" | "marketingDirector")}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-primary text-white rounded-lg p-6 sm:p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 text-center">
            {t("ourAchievements")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <achievement.icon className="w-12 h-12 mx-auto mb-2" />
                <p className="text-3xl sm:text-4xl font-bold mb-1">{achievement.value}</p>
                <p className="text-sm sm:text-base">
                  {t(achievement.label as "propertiesSold" | "happyClients" | "yearsOfExperience" | "citiesCovered")}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 text-center text-primary">
            {t("ourValues")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {["integrity", "excellence", "clientCentric"].map((value, index) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl md:text-2xl text-center">
                      {t(value as "integrity" | "excellence" | "clientCentric")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base text-center">
                      {t((`${value}Description`) as "integrityDescription" | "excellenceDescription" | "clientCentricDescription")}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutPage

