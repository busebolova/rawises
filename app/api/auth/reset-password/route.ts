import { type NextRequest, NextResponse } from "next/server"
import { updateUserPassword } from "@/lib/auth"

// Import token functions from forgot-password route
const resetTokens: Record<string, { email: string; expires: Date }> = {}

function getResetToken(token: string) {
  const tokenData = resetTokens[token]
  if (!tokenData || tokenData.expires < new Date()) {
    return null
  }
  return tokenData
}

function deleteResetToken(token: string) {
  delete resetTokens[token]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = body

    if (!token || !password) {
      return NextResponse.json({ error: "Token ve şifre gereklidir" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Şifre en az 6 karakter olmalıdır" }, { status: 400 })
    }

    // Token'ı kontrol et
    const tokenData = getResetToken(token)
    if (!tokenData) {
      return NextResponse.json({ error: "Geçersiz veya süresi dolmuş token" }, { status: 400 })
    }

    // Şifreyi güncelle
    try {
      await updateUserPassword(tokenData.email, password)

      // Token'ı sil
      deleteResetToken(token)

      return NextResponse.json({
        message: "Şifre başarıyla güncellendi",
      })
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 })
  }
}
