"use client"

import type React from "react"

import { useState } from "react"
import { Mail, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import Image from "next/image"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("E-posta adresi gereklidir")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Geçerli bir e-posta adresi girin")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Bir hata oluştu")
      } else {
        setSent(true)
      }
    } catch (error) {
      console.error("Forgot password error:", error)
      setError("Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card className="shadow-lg border-0">
              <CardHeader className="text-center pb-6">
                <div className="mb-4">
                  <Image
                    src="/rawises-logo.png"
                    alt="Rawises"
                    width={120}
                    height={40}
                    className="h-10 w-auto mx-auto"
                  />
                </div>
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-rawises-800">E-posta Gönderildi</CardTitle>
                <p className="text-gray-600 text-sm">Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                  <p className="text-sm text-blue-700 mb-2">
                    <strong>{email}</strong> adresine şifre sıfırlama bağlantısı gönderildi.
                  </p>
                  <p className="text-xs text-blue-600">E-postayı görmüyorsanız spam klasörünüzü kontrol edin.</p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      setSent(false)
                      setEmail("")
                    }}
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    Tekrar Gönder
                  </Button>

                  <Link href="/login">
                    <Button className="w-full bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Giriş Sayfasına Dön
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
        <MobileBottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <div className="mb-4">
                <Image src="/rawises-logo.png" alt="Rawises" width={120} height={40} className="h-10 w-auto mx-auto" />
              </div>
              <CardTitle className="text-2xl font-bold text-rawises-800">Şifremi Unuttum</CardTitle>
              <p className="text-gray-600 text-sm">
                E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresi</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-gray-300 focus:border-rawises-500 focus:ring-rawises-500"
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600 text-white py-3 text-base font-semibold"
                  disabled={loading}
                >
                  {loading ? "Gönderiliyor..." : "Şifre Sıfırlama Bağlantısı Gönder"}
                </Button>
              </form>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-rawises-600 hover:underline flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Giriş sayfasına dön
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
