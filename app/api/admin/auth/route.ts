import { type NextRequest, NextResponse } from "next/server"

// Demo admin credentials
const ADMIN_CREDENTIALS = {
  email: "admin@rawises.com",
  password: "admin123",
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // In production, use proper JWT tokens
      const response = NextResponse.json({
        success: true,
        message: "Giriş başarılı",
        user: {
          id: "admin-1",
          email: email,
          name: "Admin",
          role: "admin",
        },
      })

      // Set admin session cookie
      response.cookies.set("admin-session", "admin-authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return response
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Geçersiz e-posta veya şifre",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Admin auth error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Giriş yapılırken bir hata oluştu",
      },
      { status: 500 },
    )
  }
}
