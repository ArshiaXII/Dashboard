"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PropertyContactFormProps {
  propertyId: number
}

export function PropertyContactForm({ propertyId }: PropertyContactFormProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { propertyId, ...formData })
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Card>
        <CardHeader>
          <CardTitle>{t("contactUs")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              id="name"
              name="name"
              placeholder={t("name")}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              id="email"
              name="email"
              placeholder={t("email")}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="tel"
              id="phone"
              name="phone"
              placeholder={t("phone")}
              value={formData.phone}
              onChange={handleChange}
            />
            <Textarea
              id="message"
              name="message"
              placeholder={t("message")}
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full">
              {t("send")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

