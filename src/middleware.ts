// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname
  const { pathname } = request.nextUrl
  
  // Avoid processing public routes or auth routes to prevent redirect loops
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api/auth') ||
    pathname === '/login' || 
    pathname === '/register' || 
    pathname === '/verification'
  ) {
    return NextResponse.next()
  }
  
  // Check if it's a protected route
  const isProtectedRoute = 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/affiliate') ||
    pathname.startsWith('/orders');
  
  // Get the session cookie
  const sessionCookie = request.cookies.get('session')?.value
  
  // Redirect to login if it's a protected route and there's no session
  if (isProtectedRoute && !sessionCookie) {
    const url = new URL('/login', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/affiliate/:path*',
    '/orders/:path*',
  ],
}