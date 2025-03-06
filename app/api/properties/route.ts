import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"
import dbConnect from '@/lib/mongodb'
import Property from '@/models/Property'

export async function GET(request: Request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit
    const featured = searchParams.get("featured") === "true"
    const propertyType = searchParams.get("propertyType")
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : null
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null
    const bedrooms = searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : null
    const bathrooms = searchParams.get("bathrooms") ? Number(searchParams.get("bathrooms")) : null
    const city = searchParams.get("city")
    const status = searchParams.get('status')
    const location = searchParams.get('location')

    let query: any = {}

    if (featured) {
      query.featured = true
    }

    if (propertyType) {
      query.property_type = propertyType
    }

    if (minPrice) {
      query.price = { $gte: minPrice }
    }

    if (maxPrice) {
      query.price = { $lte: maxPrice }
    }

    if (bedrooms) {
      query.bedrooms = { $gte: bedrooms }
    }

    if (bathrooms) {
      query.bathrooms = { $gte: bathrooms }
    }

    if (city) {
      query.city = { $regex: city, $options: 'i' }
    }

    if (status) {
      query.status = status
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' }
    }

    const properties = await Property.find(query).sort({ createdAt: -1 })

    return NextResponse.json(properties)
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const property = await Property.create(body)
    
    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const updatedProperty = await request.json()
  const { data, error } = await supabase
    .from("properties")
    .update(updatedProperty)
    .eq("id", updatedProperty.id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  const { error } = await supabase.from("properties").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Property deleted" })
}

