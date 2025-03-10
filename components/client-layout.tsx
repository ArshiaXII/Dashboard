"use client"

import { AuthProvider } from "@/contexts/AuthContext"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SchemaMarkup } from "@/components/schema-markup"
import { Toaster } from "@/components/ui/toaster"
import type { ReactNode } from "react"

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ScrollToTop />
        <Header />
        <main className="pt-24">
          {children}
        </main>
        <Footer />
        <SchemaMarkup />
        <Toaster />
      </LanguageProvider>
    </AuthProvider>
  )
} 