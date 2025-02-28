import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from("properties")
    .select(`
      *,
      images (id, url, is_primary),
      property_amenities (
        id,
        amenities (id, name)
      )
    `)
    .eq("id", params.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const updatedProperty = await request.json()

  // Update the property
  const { data, error } = await supabase
    .from("properties")
    .update({
      title: updatedProperty.title,
      description: updatedProperty.description,
      price: updatedProperty.price,
      location: updatedProperty.location,
      address: updatedProperty.address,
      city: updatedProperty.city,
      country: updatedProperty.country,
      postal_code: updatedProperty.postal_code,
      latitude: updatedProperty.latitude,
      longitude: updatedProperty.longitude,
      bedrooms: updatedProperty.bedrooms,
      bathrooms: updatedProperty.bathrooms,
      area: updatedProperty.area,
      year_built: updatedProperty.year_built,
      property_type: updatedProperty.property_type,
      status: updatedProperty.status,
      featured: updatedProperty.featured,
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Update images if provided
  if (updatedProperty.images) {
    // First delete existing images
    const { error: deleteError } = await supabase.from("images").delete().eq("property_id", params.id)

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    // Then insert new images
    if (updatedProperty.images.length > 0) {
      const imagesData = updatedProperty.images.map((url: string, index: number) => ({
        property_id: params.id,
        url,
        is_primary: index === 0,
      }))

      const { error: imagesError } = await supabase.from("images").insert(imagesData)

      if (imagesError) {
        return NextResponse.json({ error: imagesError.message }, { status: 500 })
      }
    }
  }

  // Update amenities if provided
  if (updatedProperty.amenities) {
    // First delete existing property_amenities
    const { error: deleteError } = await supabase.from("property_amenities").delete().eq("property_id", params.id)

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    // Then insert new property_amenities
    if (updatedProperty.amenities.length > 0) {
      const amenitiesData = updatedProperty.amenities.map((amenityId: number) => ({
        property_id: params.id,
        amenity_id: amenityId,
      }))

      const { error: amenitiesError } = await supabase.from("property_amenities").insert(amenitiesData)

      if (amenitiesError) {
        return NextResponse.json({ error: amenitiesError.message }, { status: 500 })
      }
    }
  }

  return NextResponse.json(data[0])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // Delete related records first (images and property_amenities)
  const { error: imagesError } = await supabase.from("images").delete().eq("property_id", params.id)

  if (imagesError) {
    return NextResponse.json({ error: imagesError.message }, { status: 500 })
  }

  const { error: amenitiesError } = await supabase.from("property_amenities").delete().eq("property_id", params.id)

  if (amenitiesError) {
    return NextResponse.json({ error: amenitiesError.message }, { status: 500 })
  }

  // Delete the property
  const { error } = await supabase.from("properties").delete().eq("id", params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Property deleted successfully" })
}

