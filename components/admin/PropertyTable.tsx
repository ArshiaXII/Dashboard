"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, ChevronDown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useSupabaseRealtime } from "@/hooks/useSupabase"
import { supabase } from "@/utils/supabase"

interface Property {
  id: number
  title: string
  price: number
  location: string
  status: string
  created_at: string
}

export default function PropertyTable() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProperties, setSelectedProperties] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  const itemsPerPage = 10

  // Subscribe to realtime updates
  useSupabaseRealtime("properties", "*", (payload) => {
    if (payload.eventType === "INSERT") {
      setProperties((prev) => [payload.new as Property, ...prev])
    } else if (payload.eventType === "UPDATE") {
      setProperties((prev) =>
        prev.map((property) => (property.id === payload.new.id ? (payload.new as Property) : property)),
      )
    } else if (payload.eventType === "DELETE") {
      setProperties((prev) => prev.filter((property) => property.id !== payload.old.id))
    }
  })

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("id, title, price, location, status, created_at")
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)

      if (error) throw error
      setProperties(data || [])
    } catch (error) {
      console.error("Error fetching properties:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const togglePropertySelection = (id: number) => {
    setSelectedProperties((prev) => (prev.includes(id) ? prev.filter((propId) => propId !== id) : [...prev, id]))
  }

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedProperties.length} properties?`)) {
      try {
        for (const id of selectedProperties) {
          await supabase.from("properties").delete().eq("id", id)
        }
        setSelectedProperties([])
        fetchProperties()
      } catch (error) {
        console.error("Error deleting properties:", error)
      }
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mb-4">
          <div className="flex items-center">
            <Checkbox
              checked={selectedProperties.length === filteredProperties.length && filteredProperties.length > 0}
              onCheckedChange={(checked) => {
                setSelectedProperties(checked ? filteredProperties.map((p) => p.id) : [])
              }}
            />
            <span className="ml-2 text-sm text-gray-500">{selectedProperties.length} selected</span>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[200px] sm:w-[300px]"
              />
            </div>
            {selectedProperties.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Bulk Actions <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleBulkDelete}>Delete Selected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Loading properties...
                  </TableCell>
                </TableRow>
              ) : filteredProperties.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No properties found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProperties.includes(property.id)}
                        onCheckedChange={() => togglePropertySelection(property.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>{property.price.toLocaleString()} €</TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell>{property.status}</TableCell>
                    <TableCell>{new Date(property.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => (window.location.href = `/admin/properties/edit/${property.id}`)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => (window.location.href = `/property/${property.id}`)}>
                            View
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={async () => {
                              if (window.confirm("Are you sure you want to delete this property?")) {
                                await supabase.from("properties").delete().eq("id", property.id)
                                fetchProperties()
                              }
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

