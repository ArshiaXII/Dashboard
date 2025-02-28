import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Bed, Bath, Square } from "lucide-react"

interface PropertyQuickViewProps {
  property: {
    id: string | number
    title: string
    price: number
    location: string
    image: string
    bedrooms?: number
    bathrooms?: number
    area?: number
  } | null
  isOpen: boolean
  onClose: () => void
}

export function PropertyQuickView({ property, isOpen, onClose }: PropertyQuickViewProps) {
  if (!property) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{property.title}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
        </div>
        <div className="grid gap-4">
          <div>
            <h4 className="font-semibold">Price</h4>
            <p className="text-2xl font-bold text-orange-600">${property.price.toLocaleString()}</p>
          </div>
          <div>
            <h4 className="font-semibold">Location</h4>
            <p>{property.location}</p>
          </div>
          {(property.bedrooms || property.bathrooms || property.area) && (
            <div className="flex justify-between">
              {property.bedrooms && (
                <div className="flex items-center">
                  <Bed className="mr-2 h-4 w-4" />
                  <span>{property.bedrooms} Beds</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center">
                  <Bath className="mr-2 h-4 w-4" />
                  <span>{property.bathrooms} Baths</span>
                </div>
              )}
              {property.area && (
                <div className="flex items-center">
                  <Square className="mr-2 h-4 w-4" />
                  <span>{property.area} m²</span>
                </div>
              )}
            </div>
          )}
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  )
}

