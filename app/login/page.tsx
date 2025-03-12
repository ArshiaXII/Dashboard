"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Head from "next/head"
import Image from "next/image"
import { LoginForm } from "@/components/LoginForm"

export default function LoginPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <Head>
        <title>Turqa Estate - Admin Login</title>
        <meta
          name="description"
          content="Secure login for Turqa Estate admin panel to manage luxury real estate listings and content."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#003366] to-[#001830] relative">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-[url('/luxury-property.jpg')] bg-cover bg-center opacity-10"
          style={{ backgroundBlendMode: "overlay" }}
        />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        
        {/* Content */}
        <div className="container relative z-10 px-4 py-8 mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left side - Branding */}
          <motion.div 
            className="max-w-md text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/logo.png"
              alt="Turqa Estate Logo"
              width={200}
              height={60}
              className="mx-auto lg:mx-0 mb-6"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome to <span className="text-[#FFD700]">Turqa Estate</span> Admin
            </h1>
            <p className="text-white/80 text-lg mb-6">
              Manage your luxury real estate listings, blog posts, and site content with our powerful admin dashboard.
            </p>
            <div className="hidden lg:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFD700]">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <div className="text-white">
                  <h3 className="font-medium">Property Management</h3>
                  <p className="text-sm text-white/70">Add, edit, and manage all your property listings</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFD700]">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
                <div className="text-white">
                  <h3 className="font-medium">Inquiry Management</h3>
                  <p className="text-sm text-white/70">Track and respond to customer inquiries</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right side - Login Form */}
          <motion.div 
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <LoginForm />
          </motion.div>
        </div>
        
        {/* Footer */}
        <div className="relative z-10 w-full text-center text-white/60 text-sm py-4">
          &copy; {new Date().getFullYear()} Turqa Estate. All rights reserved.
        </div>
      </div>
    </>
  )
}

