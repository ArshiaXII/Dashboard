"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Code, Layout, FileCode, Palette } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CustomDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  const templates = [
    {
      title: "Landing Pages",
      description: "Beautiful, responsive landing page templates",
      icon: Layout,
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "Components",
      description: "Reusable UI components and patterns",
      icon: Code,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Full Projects",
      description: "Complete application templates",
      icon: FileCode,
      gradient: "from-orange-500 to-red-600",
    },
    {
      title: "Design System",
      description: "Consistent design tokens and styles",
      icon: Palette,
      gradient: "from-pink-500 to-rose-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold">
            Web Development Assistant
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400"
          >
            Create stunning web experiences with AI-powered development tools
          </motion.p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-2xl mx-auto"
        >
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What would you like to build today?"
            className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 rounded-xl"
          />
          <Button className="absolute right-2 top-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
            Create
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {templates.map((template, index) => (
            <motion.div
              key={template.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${template.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <template.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                  <p className="text-sm text-slate-400">{template.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

