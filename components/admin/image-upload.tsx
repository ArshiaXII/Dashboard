"use client"

import { useState, useCallback } from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
}

export function ImageUpload({ images = [], onChange, maxImages = 10 }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }, [])

  const handleFiles = useCallback((files: FileList) => {
    if (images.length >= maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images.`)
      return
    }

    const newImages = [...images]
    
    Array.from(files).forEach(file => {
      if (newImages.length >= maxImages) return
      
      if (!file.type.match('image.*')) {
        alert('Please upload image files only.')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push(e.target.result as string)
          onChange([...newImages])
        }
      }
      reader.readAsDataURL(file)
    })
  }, [images, maxImages, onChange])

  const removeImage = useCallback((index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    onChange(newImages)
  }, [images, onChange])

  return (
    <div className="space-y-4">
      <div 
        className={cn(
          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors",
          dragActive ? "border-[#003366] bg-[#003366]/5" : "border-gray-300 hover:border-[#003366]/50 hover:bg-gray-50"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          id="image-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        <label htmlFor="image-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm font-medium">Drag & drop images here or click to browse</p>
          <p className="text-xs text-gray-500 mt-1">
            {images.length}/{maxImages} images uploaded
          </p>
        </label>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border">
                <img 
                  src={image} 
                  alt={`Property image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          {images.length < maxImages && (
            <label 
              htmlFor="image-upload" 
              className="aspect-square rounded-lg border border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
            >
              <ImageIcon className="h-6 w-6 text-gray-400 mb-1" />
              <span className="text-xs text-gray-500">Add more</span>
            </label>
          )}
        </div>
      )}
    </div>
  )
} 