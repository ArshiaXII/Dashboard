import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If trying to access admin pages without auth, redirect to login
  if (req.nextUrl.pathname.startsWith("/admin") && !session) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  // If trying to access login page with auth, redirect to admin dashboard
  if (req.nextUrl.pathname === "/admin/login" && session) {
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*", "/admin/login"],
}

