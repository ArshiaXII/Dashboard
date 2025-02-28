import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const offset = (page - 1) * limit
  const status = searchParams.get("status")

  let query = supabase.from("inquiries").select(
    `
      *,
      properties (id, title)
    `,
    { count: "exact" },
  )

  if (status) {
    query = query.eq("status", status)
  }

  const { data, error, count } = await query.order("created_at", { ascending: false }).range(offset, offset + limit - 1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    inquiries: data,
    totalCount: count,
    page,
    limit,
  })
}

export async function POST(request: Request) {
  const newInquiry = await request.json()

  const { data, error } = await supabase
    .from("inquiries")
    .insert({
      name: newInquiry.name,
      email: newInquiry.email,
      phone: newInquiry.phone,
      message: newInquiry.message,
      property_id: newInquiry.property_id,
      status: "new",
      created_at: new Date().toISOString(),
    })
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}

