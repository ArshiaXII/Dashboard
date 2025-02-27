"use client"

import type React from "react"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Sidebar } from "@/components/admin/sidebar"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-[#F5F6FA] dark:bg-gray-900">
      <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar open={sidebarOpen} />
        <main className={`flex-1 p-6 lg:p-8 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}

