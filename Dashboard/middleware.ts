import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value

  // If trying to access admin pages without auth, redirect to login
  if (request.nextUrl.pathname.startsWith("/admin") && !authToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If trying to access login page with auth, redirect to admin dashboard
  if (request.nextUrl.pathname === "/login" && authToken) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}

