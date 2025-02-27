import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PropertyFilters() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" placeholder="Enter location" />
      </div>
      <div>
        <Label htmlFor="price">Max Price</Label>
        <Input id="price" type="number" placeholder="Enter max price" />
      </div>
      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}

