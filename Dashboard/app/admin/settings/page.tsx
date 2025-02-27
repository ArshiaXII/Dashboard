"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "TurqaEstate",
    siteDescription: "Premium Real Estate in Turkey",
    contactEmail: "info@turqaestate.com",
    contactPhone: "+90 (544) 315 43 51",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the settings to your backend API
    console.log("Settings saved:", settings)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="siteName">Site Name</Label>
          <Input
            id="siteName"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            placeholder="Enter site name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="siteDescription">Site Description</Label>
          <Textarea
            id="siteDescription"
            name="siteDescription"
            value={settings.siteDescription}
            onChange={handleChange}
            placeholder="Enter site description"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={settings.contactEmail}
            onChange={handleChange}
            placeholder="Enter contact email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            name="contactPhone"
            type="tel"
            value={settings.contactPhone}
            onChange={handleChange}
            placeholder="Enter contact phone"
          />
        </div>
        <Button type="submit">Save Settings</Button>
      </form>
    </div>
  )
}

