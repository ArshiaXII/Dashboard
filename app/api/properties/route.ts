import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { properties } from '@/lib/db/schema'
import { eq, like, desc } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: NextRequest) {
  try {
    const db = await getDb()
    
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const location = searchParams.get('location')
    
    let query = db.select().from(properties)
    
    if (featured === 'true') {
      query = query.where(eq(properties.featured, true))
    }
    
    if (type) {
      query = query.where(eq(properties.type, type))
    }
    
    if (status) {
      query = query.where(eq(properties.status, status))
    }
    
    if (location) {
      query = query.where(like(properties.location, `%${location}%`))
    }
    
    const result = await query.orderBy(desc(properties.createdAt))
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDb()
    
    const body = await request.json()
    const now = new Date()
    
    const newProperty = {
      id: uuidv4(),
      ...body,
      images: JSON.stringify(body.images || []),
      amenities: JSON.stringify(body.amenities || {}),
      nearbyPlaces: JSON.stringify(body.nearbyPlaces || {}),
      contactInfo: JSON.stringify(body.contactInfo || {}),
      seo: JSON.stringify(body.seo || {}),
      createdAt: now,
      updatedAt: now
    }
    
    await db.insert(properties).values(newProperty)
    
    return NextResponse.json(newProperty, { status: 201 })
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

