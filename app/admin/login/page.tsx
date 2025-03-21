"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/LoginForm"
import { useAuth } from "@/contexts/AuthContext"

export default function AdminLoginPage() {
  const router = useRouter()
  const { user, isInitialized } = useAuth()
  
  // Redirect to admin dashboard if already logged in
  useEffect(() => {
    if (user && isInitialized) {
      router.push("/admin")
    }
  }, [user, isInitialized, router])

  // Don't render anything while checking authentication
  if (!isInitialized) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  // Only render the login form if not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoginForm />
      </div>
    )
  }
  
  return null
}

