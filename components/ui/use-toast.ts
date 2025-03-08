"use client"

// Simplified version, you might want to expand this based on your needs
import { useState } from "react"

export type ToastProps = string | {
  title?: string;
  description?: string;
  variant?: string;
}

export function useToast() {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const [variant, setVariant] = useState("default")

  const toast = (props: ToastProps) => {
    if (typeof props === "string") {
      setMessage(props)
      setTitle("")
      setVariant("default")
    } else {
      setMessage(props.description || "")
      setTitle(props.title || "")
      setVariant(props.variant || "default")
    }
    setIsVisible(true)
    setTimeout(() => setIsVisible(false), 3000)
  }

  return { toast, isVisible, message, title, variant }
}

