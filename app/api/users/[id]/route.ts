import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase.from("users").select("*").eq("id", params.id).single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const updatedUser = await request.json()

  const { data, error } = await supabase
    .from("users")
    .update({
      name: updatedUser.name,
      role: updatedUser.role,
    })
    .eq("id", params.id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Update email if provided
  if (updatedUser.email) {
    const { error: authError } = await supabase.auth.admin.updateUserById(params.id, { email: updatedUser.email })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 })
    }

    // Update email in users table
    await supabase.from("users").update({ email: updatedUser.email }).eq("id", params.id)
  }

  // Update password if provided
  if (updatedUser.password) {
    const { error: passwordError } = await supabase.auth.admin.updateUserById(params.id, {
      password: updatedUser.password,
    })

    if (passwordError) {
      return NextResponse.json({ error: passwordError.message }, { status: 500 })
    }
  }

  return NextResponse.json(data[0])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // Delete auth user
  const { error: authError } = await supabase.auth.admin.deleteUser(params.id)

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 })
  }

  // Delete user record
  const { error } = await supabase.from("users").delete().eq("id", params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "User deleted successfully" })
}

