import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname
  
  // Check if the path is protected (starts with /admin but is not /admin/login)
  const isProtectedRoute = path.startsWith('/admin') && path !== '/admin/login'
  
  // Get the token from cookies
  const token = request.cookies.get('auth-token')?.value
  
  // If the route is protected and there's no token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  
  // If the path is /admin/login and there's a token, redirect to admin dashboard
  if (path === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
  
  return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ['/admin/:path*']
}

