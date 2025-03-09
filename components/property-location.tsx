"use client"

import { motion } from "framer-motion"

interface Distance {
  label: string
  distance: string
}

interface PropertyLocationProps {
  distances: Distance[]
}

export function PropertyLocation({ distances }: PropertyLocationProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {distances.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Distance {item.label}</p>
              <p className="font-medium">{item.distance}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

