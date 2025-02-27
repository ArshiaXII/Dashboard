"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SiteContent {
  homepageWelcome: string
  aboutUs: string
  contactPageText: string
  footerText: string
}

export default function SiteContentPage() {
  const [content, setContent] = useState<SiteContent>({
    homepageWelcome: "",
    aboutUs: "",
    contactPageText: "",
    footerText: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    // Fetch site content from API
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/site-content")
        if (!response.ok) {
          throw new Error("Failed to fetch site content")
        }
        const data = await response.json()
        setContent(data)
      } catch (error) {
        console.error("Error fetching site content:", error)
        toast({
          title: "Error",
          description: "Failed to fetch site content",
          variant: "destructive",
        })
      }
    }

    fetchContent()
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContent((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })
      if (!response.ok) {
        throw new Error("Failed to update site content")
      }
      toast({
        title: "Success",
        description: "Site content updated successfully",
      })
    } catch (error) {
      console.error("Error updating site content:", error)
      toast({
        title: "Error",
        description: "Failed to update site content",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold">Site Content Management</h1>
      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="homepage" className="space-y-4">
          <TabsList>
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="about">About Us</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>
          <TabsContent value="homepage">
            <Card>
              <CardHeader>
                <CardTitle>Homepage Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="homepageWelcome">Welcome Message</Label>
                  <Textarea
                    id="homepageWelcome"
                    name="homepageWelcome"
                    value={content.homepageWelcome}
                    onChange={handleChange}
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Us Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="aboutUs">About Us Text</Label>
                  <Textarea id="aboutUs" name="aboutUs" value={content.aboutUs} onChange={handleChange} rows={10} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Page Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="contactPageText">Contact Page Text</Label>
                  <Textarea
                    id="contactPageText"
                    name="contactPageText"
                    value={content.contactPageText}
                    onChange={handleChange}
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="footer">
            <Card>
              <CardHeader>
                <CardTitle>Footer Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="footerText">Footer Text</Label>
                  <Input id="footerText" name="footerText" value={content.footerText} onChange={handleChange} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-6">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  )
}

