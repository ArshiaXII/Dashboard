"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PriceHistoryProps {
  propertyId: number
}

// This would typically come from an API
const mockPriceHistory = [
  { date: "2020-01", price: 450000 },
  { date: "2020-07", price: 460000 },
  { date: "2021-01", price: 475000 },
  { date: "2021-07", price: 485000 },
  { date: "2022-01", price: 495000 },
  { date: "2022-07", price: 500000 },
]

export function PriceHistory({ propertyId }: PriceHistoryProps) {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">{t("priceHistory")}</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockPriceHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

