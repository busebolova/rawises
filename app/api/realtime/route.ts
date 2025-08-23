import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  console.log("[v0] Real-time status check")

  return Response.json({
    status: "connected",
    timestamp: new Date().toISOString(),
    message: "Real-time system active",
  })
}
