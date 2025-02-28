import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function GET() {
  try {
    // Get total properties count
    const { count: propertiesCount, error: propertiesError } = await supabase
      .from("properties")
      .select("*", { count: "exact", head: true })

    if (propertiesError) throw propertiesError

    // Get total blog posts count
    const { count: postsCount, error: postsError } = await supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true })

    if (postsError) throw postsError

    // Get total inquiries count
    const { count: inquiriesCount, error: inquiriesError } = await supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true })

    if (inquiriesError) throw inquiriesError

    // Get new inquiries count (last 7 days)
    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)

    const { count: newInquiriesCount, error: newInquiriesError } = await supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true })
      .gte("created_at", lastWeek.toISOString())

    if (newInquiriesError) throw newInquiriesError

    // Get recent properties (last 5)
    const { data: recentProperties, error: recentPropertiesError } = await supabase
      .from("properties")
      .select(`
        id, 
        title, 
        price, 
        location, 
        created_at,
        images (url, is_primary)
      `)
      .order("created_at", { ascending: false })
      .limit(5)

    if (recentPropertiesError) throw recentPropertiesError

    // Get recent blog posts (last 5)
    const { data: recentPosts, error: recentPostsError } = await supabase
      .from("blog_posts")
      .select("id, title, author, publish_date, status")
      .order("created_at", { ascending: false })
      .limit(5)

    if (recentPostsError) throw recentPostsError

    return NextResponse.json({
      stats: {
        totalProperties: propertiesCount,
        totalPosts: postsCount,
        totalInquiries: inquiriesCount,
        newInquiries: newInquiriesCount,
      },
      recentProperties,
      recentPosts,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard statistics" }, { status: 500 })
  }
}

