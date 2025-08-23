import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    // Check for admin authentication
    const adminAuth = request.cookies.get("adminAuth")?.value
    const adminAuthTime = request.cookies.get("adminAuthTime")?.value

    if (!adminAuth || adminAuth !== "true") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    // Check if auth is expired (24 hours)
    if (adminAuthTime) {
      const authTime = Number.parseInt(adminAuthTime)
      const now = Date.now()
      const twentyFourHours = 24 * 60 * 60 * 1000

      if (now - authTime > twentyFourHours) {
        const response = NextResponse.redirect(new URL("/admin/login", request.url))
        response.cookies.delete("adminAuth")
        response.cookies.delete("adminAuthTime")
        return response
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
