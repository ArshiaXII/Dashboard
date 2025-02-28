import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function GET() {
  const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const newUser = await request.json()

  // Check if user already exists in auth
  const { data: existingUser, error: checkError } = await supabase
    .from("users")
    .select("*")
    .eq("email", newUser.email)
    .maybeSingle()

  if (checkError) {
    return NextResponse.json({ error: checkError.message }, { status: 500 })
  }

  if (existingUser) {
    return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
  }

  // Create auth user
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email: newUser.email,
    password: newUser.password,
    email_confirm: true,
  })

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 })
  }

  // Create user record
  const { data, error } = await supabase
    .from("users")
    .insert({
      id: authUser.user.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role || "user",
      created_at: new Date().toISOString(),
    })
    .select()

  if (error) {
    // Rollback auth user creation if user record creation fails
    await supabase.auth.admin.deleteUser(authUser.user.id)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}

