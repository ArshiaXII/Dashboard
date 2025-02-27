import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function GET() {
  const { data, error } = await supabase.from("blog_posts").select("*")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const newPost = await request.json()
  const { data, error } = await supabase.from("blog_posts").insert(newPost).select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}

export async function PUT(request: Request) {
  const updatedPost = await request.json()
  const { data, error } = await supabase.from("blog_posts").update(updatedPost).eq("id", updatedPost.id).select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Blog post deleted" })
}

