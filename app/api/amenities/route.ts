import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function GET() {
  const { data, error } = await supabase.from("amenities").select("*").order("name")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const newAmenity = await request.json()

  const { data, error } = await supabase
    .from("amenities")
    .insert({
      name: newAmenity.name,
      created_at: new Date().toISOString(),
    })
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}

