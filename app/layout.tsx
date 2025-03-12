import './globals.css'
import { Inter } from "next/font/google"
import { Suspense } from 'react'
import type { Metadata } from "next"
import { AuthProvider } from "@/contexts/AuthContext"
import { Toaster } from "@/components/ui/toaster"

// Import the client layout directly for type checking
import ClientLayoutComponent from "@/components/client-layout"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/navbar"
import { LanguageProvider } from "@/contexts/LanguageContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Turqa Estate - Luxury Real Estate in Turkey",
  description: "Find your dream luxury property in Turkey with Turqa Estate.",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

// Create a dynamic import wrapper for the client component
import dynamic from 'next/dynamic'
const ClientLayout = dynamic(() => import('@/components/client-layout'), { 
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-full`}>
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}