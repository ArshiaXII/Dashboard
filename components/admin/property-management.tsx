"use client"

import { useState, useEffect } from "react"
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
import { useToast } from "@/components/ui/use-toast"

export function PropertyManagement() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [addingProperty, setAddingProperty] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [viewingProperty, setViewingProperty] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/properties')
        const data = await response.json()
        setProperties(data)
      } catch (error) {
        console.error('Error fetching properties:', error)
        toast({
          title: "Error",
          description: "Failed to load properties",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [refreshKey])

  const handleAddProperty = async (propertyData) => {
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      })

      if (!response.ok) {
        throw new Error('Failed to add property')
      }

      setAddingProperty(false)
      setRefreshKey(prev => prev + 1)
      toast({
        title: "Success",
        description: "Property added successfully",
      })
    } catch (error) {
      console.error('Error adding property:', error)
      toast({
        title: "Error",
        description: "Failed to add property",
        variant: "destructive"
      })
    }
  }

  const handleUpdateProperty = async (propertyData) => {
    try {
      const response = await fetch(`/api/properties/${propertyData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      })

      if (!response.ok) {
        throw new Error('Failed to update property')
      }

      setEditingProperty(null)
      setRefreshKey(prev => prev + 1)
      toast({
        title: "Success",
        description: "Property updated successfully",
      })
    } catch (error) {
      console.error('Error updating property:', error)
      toast({
        title: "Error",
        description: "Failed to update property",
        variant: "destructive"
      })
    }
  }

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return
    }

    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete property')
      }

      setRefreshKey(prev => prev + 1)
      toast({
        title: "Success",
        description: "Property deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting property:', error)
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive"
      })
    }
  }

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === "all" || property.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-[#003366]">Property Management</h2>
        <Button onClick={() => setAddingProperty(true)} className="bg-[#003366]">
          <Plus className="mr-2 h-4 w-4" /> Add Property
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search properties..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {loading ? (
        <div className="text-center py-8">Loading properties...</div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No properties found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProperties.map((property) => (
                  <TableRow key={property._id}>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell>€{property.price.toLocaleString()}</TableCell>
                    <TableCell>{property.type}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          property.status === "For Sale"
                            ? "bg-blue-100 text-blue-800"
                            : property.status === "For Rent"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {property.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setViewingProperty(property)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingProperty(property)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProperty(property._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add Property Dialog */}
      <Dialog open={addingProperty} onOpenChange={setAddingProperty}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
          </DialogHeader>
          <PropertyForm
            onSubmit={handleAddProperty}
            onCancel={() => setAddingProperty(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Property Dialog */}
      <Dialog open={!!editingProperty} onOpenChange={() => setEditingProperty(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>
          {editingProperty && (
            <PropertyForm
              property={editingProperty}
              onSubmit={handleUpdateProperty}
              onCancel={() => setEditingProperty(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Property Dialog */}
      <Dialog open={!!viewingProperty} onOpenChange={() => setViewingProperty(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {viewingProperty && (
            <div>
              <DialogHeader>
                <DialogTitle>{viewingProperty.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-6 space-y-6">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  {viewingProperty.images && viewingProperty.images.length > 0 ? (
                    <img
                      src={viewingProperty.images[0]}
                      alt={viewingProperty.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">No image available</p>
                    </div>
                  )}
                  <Badge
                    className={`absolute top-4 left-4 ${
                      viewingProperty.status === "For Sale"
                        ? "bg-blue-100 text-blue-800"
                        : viewingProperty.status === "For Rent"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {viewingProperty.status}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Description</h3>
                  <p className="mt-2 text-gray-600">{viewingProperty.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Details</h3>
                  <div className="mt-2 grid grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Price</h4>
                      <p>€{viewingProperty.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Location</h4>
                      <p>{viewingProperty.location}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Type</h4>
                      <p>{viewingProperty.type}</p>
                    </div>
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
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" onClick={() => setEditingProperty(viewingProperty)} className="mr-2">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="destructive" onClick={() => {
                    handleDeleteProperty(viewingProperty._id);
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