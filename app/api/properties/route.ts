import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function GET(request: Request) {
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

  let query = supabase.from("properties").select(
    `
      *,
      images (url, is_primary),
      property_amenities (
        amenities (id, name)
      )
    `,
    { count: "exact" },
  )

  // Apply filters
  if (featured) {
    query = query.eq("featured", true)
  }

  if (propertyType) {
    query = query.eq("property_type", propertyType)
  }

  if (minPrice) {
    query = query.gte("price", minPrice)
  }

  if (maxPrice) {
    query = query.lte("price", maxPrice)
  }

  if (bedrooms) {
    query = query.gte("bedrooms", bedrooms)
  }

  if (bathrooms) {
    query = query.gte("bathrooms", bathrooms)
  }

  if (city) {
    query = query.ilike("city", `%${city}%`)
  }

  // Apply pagination
  const { data, error, count } = await query.range(offset, offset + limit - 1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    properties: data,
    totalCount: count,
    page,
    limit,
  })
}

export async function POST(request: Request) {
  const newProperty = await request.json()

  // Start a transaction
  const { data: property, error: propertyError } = await supabase
    .from("properties")
    .insert({
      title: newProperty.title,
      description: newProperty.description,
      price: newProperty.price,
      location: newProperty.location,
      address: newProperty.address,
      city: newProperty.city,
      country: newProperty.country,
      postal_code: newProperty.postal_code,
      latitude: newProperty.latitude,
      longitude: newProperty.longitude,
      bedrooms: newProperty.bedrooms,
      bathrooms: newProperty.bathrooms,
      area: newProperty.area,
      year_built: newProperty.year_built,
      property_type: newProperty.property_type,
      status: newProperty.status || "available",
      featured: newProperty.featured || false,
    })
    .select()
    .single()

  if (propertyError) {
    return NextResponse.json({ error: propertyError.message }, { status: 500 })
  }

  // Insert images if provided
  if (newProperty.images && newProperty.images.length > 0) {
    const imagesData = newProperty.images.map((url: string, index: number) => ({
      property_id: property.id,
      url,
      is_primary: index === 0,
    }))

    const { error: imagesError } = await supabase.from("images").insert(imagesData)

    if (imagesError) {
      return NextResponse.json({ error: imagesError.message }, { status: 500 })
    }
  }

  // Insert amenities if provided
  if (newProperty.amenities && newProperty.amenities.length > 0) {
    const amenitiesData = newProperty.amenities.map((amenityId: number) => ({
      property_id: property.id,
      amenity_id: amenityId,
    }))

    const { error: amenitiesError } = await supabase.from("property_amenities").insert(amenitiesData)

    if (amenitiesError) {
      return NextResponse.json({ error: amenitiesError.message }, { status: 500 })
    }
  }

  return NextResponse.json(property, { status: 201 })
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

