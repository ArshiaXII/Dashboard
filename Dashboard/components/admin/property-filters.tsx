import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Filters {
  minPrice: string
  maxPrice: string
  type: string
  status: string
  bedrooms: string
}

interface PropertyFiltersProps {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

export function PropertyFilters({ filters, setFilters }: PropertyFiltersProps) {
  const handleChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div>
        <Label htmlFor="minPrice">Min Price</Label>
        <Input
          id="minPrice"
          type="number"
          value={filters.minPrice}
          onChange={(e) => handleChange("minPrice", e.target.value)}
          placeholder="Min Price"
        />
      </div>
      <div>
        <Label htmlFor="maxPrice">Max Price</Label>
        <Input
          id="maxPrice"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => handleChange("maxPrice", e.target.value)}
          placeholder="Max Price"
        />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Select value={filters.type} onValueChange={(value) => handleChange("type", value)}>
          <SelectTrigger id="type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="condo">Condo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={filters.status} onValueChange={(value) => handleChange("status", value)}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="for_sale">For Sale</SelectItem>
            <SelectItem value="for_rent">For Rent</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="bedrooms">Bedrooms</Label>
        <Select value={filters.bedrooms} onValueChange={(value) => handleChange("bedrooms", value)}>
          <SelectTrigger id="bedrooms">
            <SelectValue placeholder="Select bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

