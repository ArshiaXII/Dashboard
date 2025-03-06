"use client"

import { useState } from "react"
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { PropertyForm } from "@/components/admin/property-form"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"

// Sample property data
const sampleProperties = [
  {
    id: "1",
    title: "Luxury Villa with Sea View",
    location: "Antalya",
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    type: "Villa",
    status: "For Sale",
    featured: true,
    createdAt: "2023-10-15"
  },
  {
    id: "2",
    title: "Modern Apartment in City Center",
    location: "Alanya",
    price: 180000,
    bedrooms: 2,
    bathrooms: 1,
    area: 120,
    type: "Apartment",
    status: "For Sale",
    featured: false,
    createdAt: "2023-11-02"
  },
  {
    id: "3",
    title: "Beachfront Penthouse",
    location: "Kemer",
    price: 650000,
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    type: "Penthouse",
    status: "For Sale",
    featured: true,
    createdAt: "2023-09-28"
  }
]

export function PropertyManagement() {
  const [properties, setProperties] = useState(sampleProperties)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddingProperty, setIsAddingProperty] = useState(false)
  const [editingProperty, setEditingProperty] = useState<any>(null)
  const [viewingProperty, setViewingProperty] = useState<any>(null)

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === "all" || property.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const handleAddProperty = (newProperty: any) => {
    setProperties([
      ...properties,
      {
        ...newProperty,
        id: (properties.length + 1).toString(),
        createdAt: new Date().toISOString().split('T')[0]
      }
    ])
    setIsAddingProperty(false)
  }

  const handleEditProperty = (updatedProperty: any) => {
    setProperties(properties.map(property => 
      property.id === updatedProperty.id ? updatedProperty : property
    ))
    setEditingProperty(null)
  }

  const handleDeleteProperty = (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      setProperties(properties.filter(property => property.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#003366]">Property Management</h2>
        <Button onClick={() => setIsAddingProperty(true)} className="bg-[#003366]">
          <Plus className="mr-2 h-4 w-4" /> Add Property
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="For Sale">For Sale</SelectItem>
            <SelectItem value="For Rent">For Rent</SelectItem>
            <SelectItem value="Sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price (€)</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.title}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.price.toLocaleString()}</TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>
                    <Badge variant={property.status === "For Sale" ? "default" : property.status === "For Rent" ? "secondary" : "outline"}>
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{property.featured ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setViewingProperty(property)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setEditingProperty(property)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteProperty(property.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  No properties found. Try adjusting your search or filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Property Dialog */}
      <Dialog open={isAddingProperty} onOpenChange={setIsAddingProperty}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
          </DialogHeader>
          <PropertyForm onSubmit={handleAddProperty} onCancel={() => setIsAddingProperty(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Property Dialog */}
      <Dialog open={!!editingProperty} onOpenChange={(open) => !open && setEditingProperty(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>
          {editingProperty && (
            <PropertyForm 
              property={editingProperty} 
              onSubmit={handleEditProperty} 
              onCancel={() => setEditingProperty(null)} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Property Dialog */}
      <Dialog open={!!viewingProperty} onOpenChange={(open) => !open && setViewingProperty(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
          </DialogHeader>
          {viewingProperty && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                  Property Image Placeholder
                </div>
                <h3 className="text-xl font-bold">{viewingProperty.title}</h3>
                <p className="text-gray-500">{viewingProperty.location}</p>
                <div className="mt-4">
                  <Badge variant="outline" className="mr-2">{viewingProperty.type}</Badge>
                  <Badge>{viewingProperty.status}</Badge>
                  {viewingProperty.featured && <Badge variant="secondary" className="ml-2">Featured</Badge>}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Price</h4>
                  <p className="text-lg font-bold">€{viewingProperty.price.toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Bedrooms</h4>
                    <p>{viewingProperty.bedrooms}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Bathrooms</h4>
                    <p>{viewingProperty.bathrooms}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Area</h4>
                    <p>{viewingProperty.area} m²</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Created At</h4>
                  <p>{viewingProperty.createdAt}</p>
                </div>
                <div className="pt-4">
                  <Button variant="outline" onClick={() => setEditingProperty(viewingProperty)} className="mr-2">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="destructive" onClick={() => {
                    handleDeleteProperty(viewingProperty.id);
                    setViewingProperty(null);
                  }}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 