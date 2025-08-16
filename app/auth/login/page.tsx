"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    // Basit validasyon
    const newErrors: { email?: string; password?: string; general?: string } = {}

    if (!email) {
      newErrors.email = "E-posta adresi gereklidir"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz"
    }

    if (!password) {
      newErrors.password = "Şifre gereklidir"
    } else if (password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Simulated login - gerçek uygulamada API çağrısı yapılacak
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulated API call

      // Demo için basit kontrol
      if (email === "demo@rawises.com" && password === "123456") {
        // Başarılı giriş
        localStorage.setItem("user", JSON.stringify({ email, name: "Demo Kullanıcı" }))
        router.push("/")
      } else {
        setErrors({ general: "E-posta veya şifre hatalı" })
      }
    } catch (error) {
      setErrors({ general: "Giriş yapılırken bir hata oluştu" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Google OAuth simülasyonu
    console.log("Google ile giriş yapılıyor...")
    // Gerçek uygulamada Google OAuth entegrasyonu yapılacak
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
            <CardTitle className="text-2xl font-bold text-rawises-800">Hoş Geldiniz</CardTitle>
            <p className="text-rawises-600 mt-2">Hesabınıza giriş yapın</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Message */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            {/* Demo Info */}
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
              <p className="font-medium mb-1">Demo Hesap:</p>
              <p>E-posta: demo@rawises.com</p>
              <p>Şifre: 123456</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
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
                    className={`pl-10 border-rawises-200 focus:border-rawises-500 focus:ring-rawises-500 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-rawises-800">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rawises-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Şifrenizi giriniz"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 pr-10 border-rawises-200 focus:border-rawises-500 focus:ring-rawises-500 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-rawises-400 hover:text-rawises-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label htmlFor="remember" className="text-sm text-rawises-700">
                    Beni hatırla
                  </label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-rawises-600 hover:text-rawises-800">
                  Şifremi unuttum
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600 text-white font-medium py-3"
                disabled={isLoading}
              >
                {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex justify-center">
                <span className="bg-white px-2 text-sm text-rawises-500">veya</span>
              </div>
            </div>

            {/* Google Login */}
            <Button
              type="button"
              variant="outline"
              className="w-full border-rawises-200 hover:bg-rawises-50 py-3 bg-transparent"
              onClick={handleGoogleLogin}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google ile Giriş Yap
            </Button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-rawises-600">
                Hesabınız yok mu?{" "}
                <Link href="/auth/register" className="text-rawises-700 hover:text-rawises-900 font-medium">
                  Üye Ol
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
