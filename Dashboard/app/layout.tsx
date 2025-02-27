import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { PageTransition } from "@/components/page-transition"
import { SchemaMarkup } from "@/components/schema-markup"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Toaster } from "@/components/ui/toaster"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "TurqaEstate - Premium Real Estate in Turkey",
    template: "%s | TurqaEstate",
  },
  description:
    "Discover luxury properties in Turkey with TurqaEstate. Expert guidance for buying, selling, and investing in Turkish real estate.",
  keywords: [
    "Turkey real estate",
    "luxury properties",
    "Antalya homes",
    "Alanya villas",
    "Turkish property investment",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.turqaestate.com",
    siteName: "TurqaEstate",
    images: [
      {
        url: "https://www.turqaestate.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TurqaEstate - Premium Real Estate in Turkey",
      },
    ],
  },
    generator: 'v0.dev'
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-full`}>
        <LanguageProvider>
          <AuthProvider>
            <ScrollToTop />
            <Header />
            <PageTransition>
              <main className="flex-grow">{children}</main>
            </PageTransition>
            <Footer />
            <SchemaMarkup />
            <Toaster />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}



import './globals.css'