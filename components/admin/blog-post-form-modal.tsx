"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BlogPost {
  id?: number
  title: string
  content: string
  author: string
  publishDate: string
  status: string
}

interface BlogPostFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (post: BlogPost) => void
  post?: BlogPost | null
}

export function BlogPostFormModal({ isOpen, onClose, onSubmit, post }: BlogPostFormModalProps) {
  const [formData, setFormData] = useState<BlogPost>({
    title: "",
    content: "",
    author: "",
    publishDate: new Date().toISOString().split("T")[0],
    status: "draft",
  })

  useEffect(() => {
    if (post) {
      setFormData(post)
    } else {
      setFormData({
        title: "",
        content: "",
        author: "",
        publishDate: new Date().toISOString().split("T")[0],
        status: "draft",
      })
    }
  }, [post])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{post ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" value={formData.content} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="author">Author</Label>
            <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="publishDate">Publish Date</Label>
            <Input
              id="publishDate"
              name="publishDate"
              type="date"
              value={formData.publishDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">{post ? "Update" : "Add"} Blog Post</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

