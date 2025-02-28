import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from("inquiries")
    .select(`
      *,
      properties (id, title)
    `)
    .eq("id", params.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const updatedInquiry = await request.json()

  const { data, error } = await supabase
    .from("inquiries")
    .update({
      status: updatedInquiry.status,
      // Only update other fields if they are provided
      ...(updatedInquiry.name && { name: updatedInquiry.name }),
      ...(updatedInquiry.email && { email: updatedInquiry.email }),
      ...(updatedInquiry.phone && { phone: updatedInquiry.phone }),
      ...(updatedInquiry.message && { message: updatedInquiry.message }),
    })
    .eq("id", params.id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { error } = await supabase.from("inquiries").delete().eq("id", params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Inquiry deleted successfully" })
}

