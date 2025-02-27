"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ScheduleViewingProps {
  propertyId: number
}

export function ScheduleViewing({ propertyId }: ScheduleViewingProps) {
  const { t } = useLanguage()

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const handleScheduleViewing = () => {
    if (selectedDate) {
      console.log(`Scheduled viewing for property ${propertyId} on ${selectedDate.toISOString()}`)
      setSelectedDate(undefined)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("scheduleViewing")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border mb-4"
          />
          <Button onClick={handleScheduleViewing} disabled={!selectedDate} className="w-full">
            {t("scheduleViewing")}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

