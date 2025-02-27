"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Head from "next/head"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Building, Users, FileText, Activity, MoreHorizontal, Plus, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface DashboardStat {
  name: string
  value: string
  icon: React.ElementType
  change: string
  changeType: "positive" | "negative"
}

const initialStats: DashboardStat[] = [
  {
    name: "Total Properties",
    value: "245",
    icon: Building,
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "Active Users",
    value: "2,340",
    icon: Users,
    change: "+11.4%",
    changeType: "positive",
  },
  {
    name: "Blog Posts",
    value: "42",
    icon: FileText,
    change: "+6.2%",
    changeType: "positive",
  },
  {
    name: "Site Traffic",
    value: "12.5K",
    icon: Activity,
    change: "+12.3%",
    changeType: "positive",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [stats, setStats] = useState<DashboardStat[]>([])
  const { toast } = useToast()

  useEffect(() => {
    setStats(initialStats)
  }, [])

  const handleLogout = () => {
    // Implement logout logic here
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  return (
    <>
      <Head>
        <title>Turqa Estate - Admin Dashboard</title>
        <meta
          name="description"
          content="Manage luxury real estate listings, blog posts, and site content for Turqa Estate."
        />
        <meta name="keywords" content="real estate, luxury properties, admin panel, turqa estate, dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#003366]">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="bg-white p-1 rounded-lg shadow-sm">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="site-content">Site Content</TabsTrigger>
              <TabsTrigger value="help">Help</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <Card key={stat.name}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                      <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className={cn("text-xs", stat.changeType === "positive" ? "text-green-600" : "text-red-600")}>
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="listings">
              <ListingsManager />
            </TabsContent>
            <TabsContent value="blog">
              <BlogManager />
            </TabsContent>
            <TabsContent value="site-content">
              <SiteContentManager />
            </TabsContent>
            <TabsContent value="help">
              <HelpSection />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  )
}

function ListingsManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleAddProperty = () => {
    // Implement add property logic here
    toast({
      title: "Add Property",
      description: "Add property functionality to be implemented.",
    })
  }

  const handleEditProperty = (id: string) => {
    // Implement edit property logic here
    toast({
      title: "Edit Property",
      description: `Edit property functionality to be implemented for ID: ${id}`,
    })
  }

  const handleDeleteProperty = (id: string) => {
    // Implement delete property logic here
    toast({
      title: "Delete Property",
      description: `Delete property functionality to be implemented for ID: ${id}`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#003366]">Property Listings</h2>
        <Button className="bg-[#003366] hover:bg-[#004080]" onClick={handleAddProperty}>
          <Plus className="mr-2 h-4 w-4" /> Add New Property
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search properties..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Luxury Villa</TableCell>
                <TableCell>$1,500,000</TableCell>
                <TableCell>Beachfront</TableCell>
                <TableCell>Active</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEditProperty("1")}>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDeleteProperty("1")}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function BlogManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleAddPost = () => {
    // Implement add blog post logic here
    toast({
      title: "Add Blog Post",
      description: "Add blog post functionality to be implemented.",
    })
  }

  const handleEditPost = (id: string) => {
    // Implement edit blog post logic here
    toast({
      title: "Edit Blog Post",
      description: `Edit blog post functionality to be implemented for ID: ${id}`,
    })
  }

  const handleDeletePost = (id: string) => {
    // Implement delete blog post logic here
    toast({
      title: "Delete Blog Post",
      description: `Delete blog post functionality to be implemented for ID: ${id}`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#003366]">Blog Posts</h2>
        <Button className="bg-[#003366] hover:bg-[#004080]" onClick={handleAddPost}>
          <Plus className="mr-2 h-4 w-4" /> Add New Post
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search blog posts..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Top 10 Luxury Properties</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>2023-05-15</TableCell>
                <TableCell>Published</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEditPost("1")}>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDeletePost("1")}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function SiteContentManager() {
  const [content, setContent] = useState({
    welcomeMessage: "Welcome to Turqa Estate, your gateway to luxury living in Turkey.",
    aboutUs:
      "Turqa Estate is a premier real estate agency specializing in luxury properties across Turkey's most desirable locations.",
    contactInfo: "Email: info@turqaestate.com\nPhone: +90 123 456 7890\nAddress: 123 Luxury Lane, Istanbul, Turkey",
  })
  const { toast } = useToast()

  const handleContentChange = (field: string, value: string) => {
    setContent((prevContent) => ({
      ...prevContent,
      [field]: value,
    }))
  }

  const handleSaveChanges = () => {
    // Implement save changes logic here
    toast({
      title: "Save Changes",
      description: "Site content changes saved successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#003366]">Site Content</h2>
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="welcome-message">Homepage Welcome Message</Label>
            <Textarea
              id="welcome-message"
              placeholder="Enter welcome message"
              value={content.welcomeMessage}
              onChange={(e) => handleContentChange("welcomeMessage", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="about-us">About Us</Label>
            <Textarea
              id="about-us"
              placeholder="Enter about us content"
              value={content.aboutUs}
              onChange={(e) => handleContentChange("aboutUs", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-info">Contact Information</Label>
            <Textarea
              id="contact-info"
              placeholder="Enter contact information"
              value={content.contactInfo}
              onChange={(e) => handleContentChange("contactInfo", e.target.value)}
            />
          </div>
          <Button className="bg-[#003366] hover:bg-[#004080]" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function HelpSection() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  })
  const { toast } = useToast()

  const handleFeedbackChange = (field: string, value: string) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [field]: value,
    }))
  }

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement submit feedback logic here
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    })
    setFeedback({ name: "", email: "", message: "" })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#003366]">Help & Support</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Log in to your admin dashboard</li>
              <li>Navigate to the Listings section to manage properties</li>
              <li>Use the Blog section to create and edit posts</li>
              <li>Update site content in the Site Content section</li>
              <li>For additional help, refer to the user manual or contact support</li>
            </ol>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Feedback Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmitFeedback}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={feedback.name}
                  onChange={(e) => handleFeedbackChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  value={feedback.email}
                  onChange={(e) => handleFeedbackChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your feedback or question"
                  value={feedback.message}
                  onChange={(e) => handleFeedbackChange("message", e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-[#003366] hover:bg-[#004080]">
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

