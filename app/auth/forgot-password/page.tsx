"use client"

import type React from "react"

import { useState } from "react"
import { Mail, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!email) {
      setError("E-posta adresi gereklidir")
      setIsLoading(false)
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Geçerli bir e-posta adresi giriniz")
      setIsLoading(false)
      return
    }

    // Simulated password reset
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSuccess(true)
    } catch (error) {
      setError("Şifre sıfırlama e-postası gönderilirken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rawises-50 via-white to-brand-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardContent className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-rawises-800 mb-4">E-posta Gönderildi</h2>
              <p className="text-rawises-600 mb-6">
                Şifre sıfırlama bağlantısı <strong>{email}</strong> adresine gönderildi. E-postanızı kontrol edin.
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full bg-rawises-600 hover:bg-rawises-700">
                  <Link href="/auth/login">Giriş Sayfasına Dön</Link>
                </Button>
                <Button variant="outline" onClick={() => setIsSuccess(false)} className="w-full">
                  Tekrar Dene
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rawises-50 via-white to-brand-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-rawises-700 hover:bg-rawises-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Geri Dön
          </Button>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <Image src="/rawises-logo.png" alt="Rawises" width={120} height={40} className="h-10 w-auto" />
            </div>
            <CardTitle className="text-2xl font-bold text-rawises-800">Şifremi Unuttum</CardTitle>
            <p className="text-rawises-600 mt-2">E-posta adresinizi girin, şifre sıfırlama bağlantısı gönderelim</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-rawises-800">
                  E-posta Adresi
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rawises-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-rawises-200 focus:border-rawises-500 focus:ring-rawises-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600 text-white font-medium py-3"
                disabled={isLoading}
              >
                {isLoading ? "Gönderiliyor..." : "Şifre Sıfırlama Bağlantısı Gönder"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-rawises-600">
                Şifrenizi hatırladınız mı?{" "}
                <Link href="/auth/login" className="text-rawises-700 hover:text-rawises-900 font-medium">
                  Giriş Yap
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
