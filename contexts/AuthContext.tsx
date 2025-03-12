"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type User = {
  id: string
  email: string
  name: string
  role: string
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
  isInitialized: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Check if user is already logged in
  useEffect(() => {
    const initAuth = async () => {
      try {
        // For demo purposes, check localStorage
        const storedUser = localStorage.getItem("turqaUser")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
        // Clear potentially corrupted auth data
        localStorage.removeItem("turqaUser")
        setUser(null)
      } finally {
        setIsInitialized(true)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // For demo purposes, we'll use a simple check
      if (email === "admin@turqaestate.com" && password === "admin123") {
        const user = {
          id: "1",
          email: "admin@turqaestate.com",
          name: "Admin User",
          role: "admin"
        }
        setUser(user)
        localStorage.setItem("turqaUser", JSON.stringify(user))
        return Promise.resolve()
      } else {
        return Promise.reject(new Error("Invalid credentials"))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      setUser(null)
      localStorage.removeItem("turqaUser")
      return Promise.resolve()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isInitialized }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

