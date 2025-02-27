"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReviewForm() {
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New review submitted:", newReview)
    // Here you would typically send the new review to your backend
    setNewReview({ name: "", rating: 5, comment: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Ваше имя"
        value={newReview.name}
        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
        required
      />
      <Select
        value={newReview.rating.toString()}
        onValueChange={(value) => setNewReview({ ...newReview, rating: Number.parseInt(value) })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Выберите оценку" />
        </SelectTrigger>
        <SelectContent>
          {[1, 2, 3, 4, 5].map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num} {num === 1 ? "Звезда" : "Звезды"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea
        placeholder="Ваш отзыв"
        value={newReview.comment}
        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        required
      />
      <Button type="submit">Отправить отзыв</Button>
    </form>
  )
}

