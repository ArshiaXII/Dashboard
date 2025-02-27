"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

const blurDataURL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8AoNxbhL3xvpeNluNyeQ0pwCxJGwA5FDpZxeI9bcohF5QsZUjY+9qARhQhzU6sh//Z"

export function SpecialOfferSection() {
  const { t } = useLanguage()
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  }

  return (
    <motion.section
      className="relative py-8 sm:py-12 overflow-hidden bg-blue-800"
      variants={fadeInVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-2 sm:inset-4 md:inset-6 lg:inset-8 z-0 overflow-hidden rounded-lg">
        <Image
          src="/luxury-real-estate.jpg"
          alt="Luxury Real Estate"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-blue-900/10" />
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="container mx-auto px-4 sm:px-6 relative z-10 max-w-xl"
      >
        <div className="mx-auto text-center">
          <motion.h2 variants={itemVariants} className="text-lg sm:text-xl font-bold mb-2 text-white">
            {t("specialOfferTitle")}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xs sm:text-sm mb-2 text-white">
            {t("specialOfferDescription")}
          </motion.p>
          <motion.p variants={itemVariants} className="text-sm sm:text-base mb-4 text-white font-medium">
            {t("freeViewingTour")}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button
              size="sm"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium py-2 px-6 rounded-[4px] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-xs uppercase tracking-wide"
            >
              {t("scheduleFreeTour")}
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" /> */}
    </motion.section>
  )
}

