import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Property from "@/models/Property"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    
    const property = await Property.findById(params.id)
    
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }
    
    return NextResponse.json(property)
  } catch (error) {
    console.error("Error fetching property:", error)
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    
    const body = await request.json()
    body.updatedAt = new Date()
    
    const property = await Property.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })
    
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }
    
    return NextResponse.json(property)
  } catch (error) {
    console.error("Error updating property:", error)
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    
    const property = await Property.findByIdAndDelete(params.id)
    
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }
    
    return NextResponse.json({ message: "Property deleted successfully" })
  } catch (error) {
    console.error("Error deleting property:", error)
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 })
  }
}

