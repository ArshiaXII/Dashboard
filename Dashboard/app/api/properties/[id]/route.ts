import { NextResponse } from "next/server"

// This is a mock database. In a real application, you would use a real database.
const properties = [
  {
    id: "1",
    title: "Luxury Villa",
    description: "A beautiful luxury villa with sea view",
    price: 500000,
    location: "Antalya",
    status: "Active",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
  },
  {
    id: "2",
    title: "City Apartment",
    description: "Modern apartment in the heart of the city",
    price: 250000,
    location: "Istanbul",
    status: "Pending",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: 100,
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === params.id)
  if (!property) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 })
  }
  return NextResponse.json(property)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const updatedProperty = await request.json()
  const index = properties.findIndex((p) => p.id === params.id)
  if (index === -1) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 })
  }
  properties[index] = { ...properties[index], ...updatedProperty }
  return NextResponse.json(properties[index])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const index = properties.findIndex((p) => p.id === params.id)
  if (index === -1) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 })
  }
  properties.splice(index, 1)
  return NextResponse.json({ message: "Property deleted" })
}

