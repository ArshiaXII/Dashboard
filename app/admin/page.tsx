"use client"

import { useState } from "react"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { PropertyManagement } from "@/components/admin/property-management"
import { 
  LayoutDashboard, 
  Building, 
  FileText, 
  Settings, 
  Users, 
  MessageSquare,
  TrendingUp,
  Home,
  DollarSign,
  UserCheck
} from "lucide-react"

// Dashboard Overview Component
function DashboardOverview() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#003366]">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Properties</p>
              <h3 className="text-2xl font-bold">24</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">12%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <h3 className="text-2xl font-bold">€2.4M</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">8%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">New Inquiries</p>
              <h3 className="text-2xl font-bold">18</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">24%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
              <UserCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Site Visitors</p>
              <h3 className="text-2xl font-bold">1,240</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">18%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium mb-4">Recent Properties</h3>
          <div className="space-y-4">
            {[
              { title: "Luxury Villa with Sea View", location: "Antalya", price: "€450,000", date: "2 days ago" },
              { title: "Modern Apartment in City Center", location: "Alanya", price: "€180,000", date: "5 days ago" },
              { title: "Beachfront Penthouse", location: "Kemer", price: "€650,000", date: "1 week ago" },
              { title: "Family Home with Garden", location: "Side", price: "€320,000", date: "2 weeks ago" }
            ].map((property, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-medium">{property.title}</h4>
                  <p className="text-sm text-gray-500">{property.location} • {property.price}</p>
                </div>
                <span className="text-xs text-gray-400">{property.date}</span>
              </div>
            ))}
          </div>
          <Button variant="link" className="mt-4 text-[#003366]">
            View all properties
          </Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium mb-4">Recent Inquiries</h3>
          <div className="space-y-4">
            {[
              { name: "John Smith", property: "Luxury Villa with Sea View", email: "john@example.com", date: "1 day ago" },
              { name: "Emma Johnson", property: "Modern Apartment in City Center", email: "emma@example.com", date: "3 days ago" },
              { name: "Michael Brown", property: "Beachfront Penthouse", email: "michael@example.com", date: "6 days ago" },
              { name: "Sophia Williams", property: "Family Home with Garden", email: "sophia@example.com", date: "1 week ago" }
            ].map((inquiry, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-medium">{inquiry.name}</h4>
                  <p className="text-sm text-gray-500">{inquiry.property}</p>
                  <p className="text-xs text-gray-400">{inquiry.email}</p>
                </div>
                <span className="text-xs text-gray-400">{inquiry.date}</span>
              </div>
            ))}
          </div>
          <Button variant="link" className="mt-4 text-[#003366]">
            View all inquiries
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    window.location.href = "/admin/login"
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "properties":
        return <PropertyManagement />
      case "dashboard":
        return <DashboardOverview />
      default:
        return <div className="p-6 text-center text-gray-500">This section is under development.</div>
    }
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-white rounded-lg shadow-sm">
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab("dashboard")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        activeTab === "dashboard"
                          ? "bg-[#003366] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <LayoutDashboard className="mr-3 h-5 w-5" />
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("properties")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        activeTab === "properties"
                          ? "bg-[#003366] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Building className="mr-3 h-5 w-5" />
                      Properties
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("blog")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        activeTab === "blog"
                          ? "bg-[#003366] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <FileText className="mr-3 h-5 w-5" />
                      Blog Posts
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("inquiries")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        activeTab === "inquiries"
                          ? "bg-[#003366] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <MessageSquare className="mr-3 h-5 w-5" />
                      Inquiries
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("users")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        activeTab === "users"
                          ? "bg-[#003366] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Users className="mr-3 h-5 w-5" />
                      Users
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("settings")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        activeTab === "settings"
                          ? "bg-[#003366] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Settings className="mr-3 h-5 w-5" />
                      Settings
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>

        <footer className="bg-white mt-8 py-6 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Turqa Estate. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

