"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface Advantage {
  image: string
  title: string
}

interface PropertyAdvantagesProps {
  advantages: Advantage[]
}

export function PropertyAdvantages({ advantages }: PropertyAdvantagesProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {advantages.map((advantage, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group cursor-pointer"
        >
          <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
            <Image
              src={advantage.image || "/placeholder.svg"}
              alt={advantage.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <p className="text-sm text-center text-gray-600">{advantage.title}</p>
        </motion.div>
      ))}
    </div>
  )
}

