"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Head from "next/head"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Implement authentication logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      router.push("/admin")
      toast({
        title: "Success",
        description: "You have successfully logged in.",
      })
    } catch (err) {
      setError("Invalid email or password")
      toast({
        title: "Error",
        description: "Failed to log in. Please check your credentials.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Turqa Estate - Admin Login</title>
        <meta
          name="description"
          content="Secure login for Turqa Estate admin panel to manage luxury real estate listings and content."
        />
        <meta name="keywords" content="real estate, luxury properties, admin panel, turqa estate, login" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#003366] to-[#001830] relative">
        <div
          className="absolute inset-0 bg-[url('/luxury-property.jpg')] bg-cover bg-center opacity-10"
          style={{ backgroundBlendMode: "overlay" }}
        />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

        <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-md border-0 shadow-2xl">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="Turqa Estate Logo"
                width={180}
                height={60}
                className="h-16 w-auto"
                loading="eager"
                priority
              />
            </div>
            <CardTitle className="text-4xl font-playfair text-[#003366] bg-gradient-to-r from-[#003366] to-[#FFD700] bg-clip-text text-transparent">
              Exclusive Access
            </CardTitle>
            <CardDescription className="text-gray-600 font-sans">
              Sign in to your premium admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#003366]" />
                  Email Address
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@turqaestate.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pr-10 border-gray-200 focus:border-[#FFD700] focus:ring-[#FFD700]/20 transition-all"
                          required
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#003366] text-white">
                      <p>Use your Turqa Estate email address</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[#003366]" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 border-gray-200 focus:border-[#FFD700] focus:ring-[#FFD700]/20 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#003366] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <button type="button" className="text-sm text-[#003366] hover:text-[#FFD700] transition-colors">
                    Forgot password?
                  </button>
                </div>
              </div>
              {error && (
                <Alert variant="destructive" className="animate-fadeIn">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-[#003366] to-[#004080] hover:from-[#004080] hover:to-[#005099] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <footer className="relative z-10 mt-8 text-center text-white/80">
          <div className="text-sm font-sans">© 2025 Turqa Estate. All rights reserved.</div>
        </footer>
      </div>
    </>
  )
}

