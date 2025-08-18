import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Admin panel authentication check
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // For now, allow access - in production, add proper authentication
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
