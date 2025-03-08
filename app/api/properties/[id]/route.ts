import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { properties } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    
    const property = await db.select().from(properties).where(eq(properties.id, params.id)).get();
    
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    // Parse JSON fields
    return NextResponse.json({
      ...property,
      images: JSON.parse(property.images || '[]'),
      amenities: JSON.parse(property.amenities || '{}'),
      nearbyPlaces: JSON.parse(property.nearbyPlaces || '{}'),
      contactInfo: JSON.parse(property.contactInfo || '{}'),
      seo: JSON.parse(property.seo || '{}')
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    
    const body = await request.json();
    const now = new Date();
    
    const updateData = {
      ...body,
      images: JSON.stringify(body.images || []),
      amenities: JSON.stringify(body.amenities || {}),
      nearbyPlaces: JSON.stringify(body.nearbyPlaces || {}),
      contactInfo: JSON.stringify(body.contactInfo || {}),
      seo: JSON.stringify(body.seo || {}),
      updatedAt: now
    };
    
    await db.update(properties)
      .set(updateData)
      .where(eq(properties.id, params.id));
    
    const updatedProperty = await db.select().from(properties).where(eq(properties.id, params.id)).get();
    
    if (!updatedProperty) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    // Parse JSON fields
    return NextResponse.json({
      ...updatedProperty,
      images: JSON.parse(updatedProperty.images || '[]'),
      amenities: JSON.parse(updatedProperty.amenities || '{}'),
      nearbyPlaces: JSON.parse(updatedProperty.nearbyPlaces || '{}'),
      contactInfo: JSON.parse(updatedProperty.contactInfo || '{}'),
      seo: JSON.parse(updatedProperty.seo || '{}')
    });
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    
    // Get the property to check if it exists
    const property = await db.select().from(properties).where(eq(properties.id, params.id)).get();
    
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    // Delete the property
    await db.delete(properties).where(eq(properties.id, params.id));
    
    return NextResponse.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}

