import { type NextRequest, NextResponse } from "next/server"
import { getAllUsers } from "@/lib/auth"

// Basit in-memory token store (production'da database kullanın)
const resetTokens: Record<string, { email: string; expires: Date }> = {}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "E-posta adresi gereklidir" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta adresi girin" }, { status: 400 })
    }

    // Kullanıcının var olup olmadığını kontrol et
    const users = getAllUsers()
    const user = users.find((u) => u.email === email)

    // Güvenlik için, kullanıcı bulunamasa bile başarılı mesaj döndür
    // (Bu, email adresi keşfini önler)

    if (user) {
      // Reset token oluştur
      const token = Math.random().toString(36).substring(2) + Date.now().toString(36)
      const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 saat

      resetTokens[token] = {
        email: user.email,
        expires,
      }

      // Gerçek uygulamada burada email gönderilir
      console.log(`Password reset link: http://localhost:3000/reset-password?token=${token}`)
      console.log(`Token expires at: ${expires}`)
    }

    return NextResponse.json({
      message: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 })
  }
}

// Token'ları kontrol etmek için export et
export function getResetToken(token: string) {
  const tokenData = resetTokens[token]
  if (!tokenData || tokenData.expires < new Date()) {
    return null
  }
  return tokenData
}

// Token'ı sil
export function deleteResetToken(token: string) {
  delete resetTokens[token]
}
