"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ImageUpload } from "@/components/admin/image-upload"
import { 
  MapPin, 
  Home, 
  Image, 
  FileText, 
  DollarSign, 
  Check, 
  Calendar, 
  Wifi, 
  Droplets, 
  Thermometer, 
  Car, 
  Trees, 
  Shield
} from "lucide-react"

interface PropertyFormProps {
  property?: any
  onSubmit: (property: any) => void
  onCancel: () => void
}

export function PropertyForm({ property, onSubmit, onCancel }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    id: property?.id || "",
    title: property?.title || "",
    description: property?.description || "",
    location: property?.location || "",
    address: property?.address || "",
    neighborhood: property?.neighborhood || "",
    price: property?.price || "",
    bedrooms: property?.bedrooms || "",
    bathrooms: property?.bathrooms || "",
    area: property?.area || "",
    landArea: property?.landArea || "",
    yearBuilt: property?.yearBuilt || "",
    type: property?.type || "",
    status: property?.status || "For Sale",
    featured: property?.featured || false,
    images: property?.images || [],
    floorPlan: property?.floorPlan || "",
    video: property?.video || "",
    virtualTour: property?.virtualTour || "",
    amenities: property?.amenities || {
      airConditioning: false,
      heating: false,
      internet: false,
      parking: false,
      garden: false,
      pool: false,
      security: false,
      balcony: false,
      elevator: false,
      furnished: false,
      petFriendly: false,
      storage: false
    },
    nearbyPlaces: property?.nearbyPlaces || {
      schools: "",
      hospitals: "",
      shopping: "",
      restaurants: "",
      transportation: "",
      beach: ""
    },
    contactInfo: property?.contactInfo || {
      agentName: "",
      agentPhone: "",
      agentEmail: ""
    },
    seo: property?.seo || {
      metaTitle: "",
      metaDescription: "",
      keywords: ""
    }
  })

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "bedrooms" || name === "bathrooms" || name === "area" || name === "landArea" || name === "yearBuilt"
        ? parseFloat(value) || "" 
        : value
    }))
  }, [])

  const handleNestedChange = useCallback((category: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }))
  }, [])

  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const handleCheckboxChange = useCallback((name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }, [])

  const handleAmenityChange = useCallback((amenity: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: checked
      }
    }))
  }, [])

  const handleImagesChange = useCallback((images: string[]) => {
    setFormData(prev => ({
      ...prev,
      images
    }))
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }, [formData, onSubmit])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Luxury Villa with Sea View"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the property..."
                  className="min-h-[120px]"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="price">Price (€)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 450000"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="type">Property Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Penthouse">Penthouse</SelectItem>
                    <SelectItem value="Duplex">Duplex</SelectItem>
                    <SelectItem value="Land">Land</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="For Sale">For Sale</SelectItem>
                    <SelectItem value="For Rent">For Rent</SelectItem>
                    <SelectItem value="Sold">Sold</SelectItem>
                    <SelectItem value="Reserved">Reserved</SelectItem>
                    <SelectItem value="Under Offer">Under Offer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("featured", checked as boolean)
                  }
                />
                <Label htmlFor="featured" className="cursor-pointer">Featured Property</Label>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="e.g. 3"
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="area">Living Area (m²)</Label>
                  <Input
                    id="area"
                    name="area"
                    type="number"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="e.g. 150"
                  />
                </div>
                <div>
                  <Label htmlFor="landArea">Land Area (m²)</Label>
                  <Input
                    id="landArea"
                    name="landArea"
                    type="number"
                    value={formData.landArea}
                    onChange={handleChange}
                    placeholder="e.g. 500"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="yearBuilt">Year Built</Label>
                <Input
                  id="yearBuilt"
                  name="yearBuilt"
                  type="number"
                  value={formData.yearBuilt}
                  onChange={handleChange}
                  placeholder="e.g. 2020"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="airConditioning"
                    checked={formData.amenities.airConditioning}
                    onCheckedChange={(checked) => 
                      handleAmenityChange("airConditioning", checked as boolean)
                    }
                  />
                  <Label htmlFor="airConditioning" className="cursor-pointer">Air Conditioning</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="heating"
                    checked={formData.amenities.heating}
                    onCheckedChange={(checked) => 
                      handleAmenityChange("heating", checked as boolean)
                    }
                  />
                  <Label htmlFor="heating" className="cursor-pointer">Heating</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="internet"
                    checked={formData.amenities.internet}
                    onCheckedChange={(checked) => 
                      handleAmenityChange("internet", checked as boolean)
                    }
                  />
                  <Label htmlFor="internet" className="cursor-pointer">Internet</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="parking"
                    checked={formData.amenities.parking}
                    onCheckedChange={(checked) => 
                      handleAmenityChange("parking", checked as boolean)
                    }
                  />
                  <Label htmlFor="parking" className="cursor-pointer">Parking</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="garden"
                    checked={formData.amenities.garden}
                    onCheckedChange={(checked) => 
                      handleAmenityChange("garden", checked as boolean)
                    }
                  />
                  <Label htmlFor="garden" className="cursor-pointer">Garden</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pool"
                    checked={formData.amenities.pool}
                    onCheckedChange={(checked) => 
                      handleAmenityChange("pool", checked as boolean)
                    }
                  />
                  <Label htmlFor="pool" className="cursor-pointer">Swimming Pool</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="security"
                    checked={formData.amenities.security}
                    onCheckedChange={(checked) => 
                      handleAmenityChange("security", checked as boolean)
                    }
                  />
                  <Label htmlFor="security" className="cursor-pointer">Security System</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="balcony"
                    checked={formData.amenities.balcony}
                    onCheckedChange={(checked) => 
                      handleAmenityChange("balcony", checked as boolean)
                    }
                  />
                  <Label htmlFor="balcony" className="cursor-pointer">Balcony</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="elevator"
                    checked={formData.amenities.elevator}
                    onCheckedChange={(checked) => 
                      handleAmenityChange("elevator", checked as boolean)
                    }
                  />
                  <Label htmlFor="elevator" className="cursor-pointer">Elevator</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="furnished"
                    checked={formData.amenities.furnished}
                    onCheckedChange={(checked) => 
                      handleAmenityChange("furnished", checked as boolean)
                    }
                  />
                  <Label htmlFor="furnished" className="cursor-pointer">Furnished</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="petFriendly"
                    checked={formData.amenities.petFriendly}
                    onCheckedChange={(checked) => 
                      handleAmenityChange("petFriendly", checked as boolean)
                    }
                  />
                  <Label htmlFor="petFriendly" className="cursor-pointer">Pet Friendly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="storage"
                    checked={formData.amenities.storage}
                    onCheckedChange={(checked) => 
                      handleAmenityChange("storage", checked as boolean)
                    }
                  />
                  <Label htmlFor="storage" className="cursor-pointer">Storage</Label>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Media Tab */}
        <TabsContent value="media" className="space-y-6">
          <div>
            <Label>Property Images</Label>
            <ImageUpload 
              images={formData.images} 
              onChange={handleImagesChange} 
              maxImages={10}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="floorPlan">Floor Plan URL</Label>
              <Input
                id="floorPlan"
                name="floorPlan"
                value={formData.floorPlan}
                onChange={handleChange}
                placeholder="URL to floor plan image"
              />
            </div>
            
            <div>
              <Label htmlFor="video">Video URL</Label>
              <Input
                id="video"
                name="video"
                value={formData.video}
                onChange={handleChange}
                placeholder="YouTube or Vimeo URL"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="virtualTour">Virtual Tour URL</Label>
            <Input
              id="virtualTour"
              name="virtualTour"
              value={formData.virtualTour}
              onChange={handleChange}
              placeholder="URL to virtual tour"
            />
          </div>
        </TabsContent>
        
        {/* Location Tab */}
        <TabsContent value="location" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">City</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => handleSelectChange("location", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Antalya">Antalya</SelectItem>
                    <SelectItem value="Alanya">Alanya</SelectItem>
                    <SelectItem value="Belek">Belek</SelectItem>
                    <SelectItem value="Kemer">Kemer</SelectItem>
                    <SelectItem value="Side">Side</SelectItem>
                    <SelectItem value="Kalkan">Kalkan</SelectItem>
                    <SelectItem value="Fethiye">Fethiye</SelectItem>
                    <SelectItem value="Bodrum">Bodrum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="neighborhood">Neighborhood</Label>
                <Input
                  id="neighborhood"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  placeholder="e.g. Lara Beach"
                />
              </div>
              
              <div>
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full property address"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>Nearby Places</Label>
              
              <div>
                <Label htmlFor="schools" className="text-sm">Schools</Label>
                <Input
                  id="schools"
                  value={formData.nearbyPlaces.schools}
                  onChange={(e) => handleNestedChange("nearbyPlaces", "schools", e.target.value)}
                  placeholder="e.g. 2 km to International School"
                />
              </div>
              
              <div>
                <Label htmlFor="hospitals" className="text-sm">Hospitals</Label>
                <Input
                  id="hospitals"
                  value={formData.nearbyPlaces.hospitals}
                  onChange={(e) => handleNestedChange("nearbyPlaces", "hospitals", e.target.value)}
                  placeholder="e.g. 5 km to City Hospital"
                />
              </div>
              
              <div>
                <Label htmlFor="shopping" className="text-sm">Shopping</Label>
                <Input
                  id="shopping"
                  value={formData.nearbyPlaces.shopping}
                  onChange={(e) => handleNestedChange("nearbyPlaces", "shopping", e.target.value)}
                  placeholder="e.g. 1 km to Mall of Antalya"
                />
              </div>
              
              <div>
                <Label htmlFor="beach" className="text-sm">Beach</Label>
                <Input
                  id="beach"
                  value={formData.nearbyPlaces.beach}
                  onChange={(e) => handleNestedChange("nearbyPlaces", "beach", e.target.value)}
                  placeholder="e.g. 500m to Lara Beach"
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Contact Information</Label>
              
              <div>
                <Label htmlFor="agentName" className="text-sm">Agent Name</Label>
                <Input
                  id="agentName"
                  value={formData.contactInfo.agentName}
                  onChange={(e) => handleNestedChange("contactInfo", "agentName", e.target.value)}
                  placeholder="e.g. John Smith"
                />
              </div>
              
              <div>
                <Label htmlFor="agentPhone" className="text-sm">Agent Phone</Label>
                <Input
                  id="agentPhone"
                  value={formData.contactInfo.agentPhone}
                  onChange={(e) => handleNestedChange("contactInfo", "agentPhone", e.target.value)}
                  placeholder="e.g. +90 555 123 4567"
                />
              </div>
              
              <div>
                <Label htmlFor="agentEmail" className="text-sm">Agent Email</Label>
                <Input
                  id="agentEmail"
                  value={formData.contactInfo.agentEmail}
                  onChange={(e) => handleNestedChange("contactInfo", "agentEmail", e.target.value)}
                  placeholder="e.g. agent@turqaestate.com"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>SEO Information</Label>
              
              <div>
                <Label htmlFor="metaTitle" className="text-sm">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.seo.metaTitle}
                  onChange={(e) => handleNestedChange("seo", "metaTitle", e.target.value)}
                  placeholder="SEO title for this property"
                />
              </div>
              
              <div>
                <Label htmlFor="metaDescription" className="text-sm">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.seo.metaDescription}
                  onChange={(e) => handleNestedChange("seo", "metaDescription", e.target.value)}
                  placeholder="SEO description for this property"
                />
              </div>
              
              <div>
                <Label htmlFor="keywords" className="text-sm">Keywords</Label>
                <Input
                  id="keywords"
                  value={formData.seo.keywords}
                  onChange={(e) => handleNestedChange("seo", "keywords", e.target.value)}
                  placeholder="e.g. luxury villa, sea view, antalya"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-[#003366]">
          {property ? "Update Property" : "Add Property"}
        </Button>
      </div>
    </form>
  )
} 