import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function GET() {
  const { data, error } = await supabase.from("properties").select("*")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const newProperty = await request.json()
  const { data, error } = await supabase.from("properties").insert(newProperty).select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
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

