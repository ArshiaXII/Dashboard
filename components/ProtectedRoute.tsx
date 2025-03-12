"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isInitialized } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // Only redirect if authentication check is complete
    if (isInitialized) {
      if (!user) {
        // Make sure we're not already on the login page to prevent redirect loops
        if (pathname !== "/login" && pathname !== "/admin/login") {
          router.push("/login")
        }
      } else {
        setIsAuthorized(true)
      }
    }
  }, [user, isInitialized, router, pathname])

  // Show loading state while checking authentication
  if (isLoading || !isInitialized) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  // Only render children if user is authorized
  return isAuthorized ? <>{children}</> : null
} 