import './globals.css'
import { Inter } from "next/font/google"
import { Suspense } from 'react'

// Import the client layout directly for type checking
import ClientLayoutComponent from "@/components/client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TurqaEstate - Turkish Real Estate",
  description: "Find your dream property in Turkey with TurqaEstate, the leading real estate company in the Turkish Riviera.",
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
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
      </body>
    </html>
  )
}