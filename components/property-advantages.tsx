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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {advantages.map((advantage, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          <div className="relative h-40 w-full">
            <Image
              src={advantage.image}
              alt={advantage.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
          <div className="p-3 text-center">
            <h3 className="font-medium text-sm sm:text-base">{advantage.title}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

