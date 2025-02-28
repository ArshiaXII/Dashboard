import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", params.id).single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const updatedPost = await request.json()

  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      title: updatedPost.title,
      content: updatedPost.content,
      author: updatedPost.author,
      publish_date: updatedPost.publish_date,
      status: updatedPost.status,
      featured_image: updatedPost.featured_image,
      slug: updatedPost.slug,
      excerpt: updatedPost.excerpt,
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { error } = await supabase.from("blog_posts").delete().eq("id", params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Blog post deleted successfully" })
}

