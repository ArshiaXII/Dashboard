import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const offset = (page - 1) * limit
  const status = searchParams.get("status")

  let query = supabase.from("blog_posts").select("*", { count: "exact" })

  if (status) {
    query = query.eq("status", status)
  }

  const { data, error, count } = await query
    .order("publish_date", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    posts: data,
    totalCount: count,
    page,
    limit,
  })
}

export async function POST(request: Request) {
  const newPost = await request.json()

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      title: newPost.title,
      content: newPost.content,
      author: newPost.author,
      publish_date: newPost.publish_date || new Date().toISOString(),
      status: newPost.status || "draft",
      featured_image: newPost.featured_image,
      slug: newPost.slug,
      excerpt: newPost.excerpt,
      created_at: new Date().toISOString(),
    })
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}

