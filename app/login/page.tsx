"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    acceptTerms: false,
    acceptMarketing: false,
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "E-posta adresi gereklidir"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin"
    }

    if (!formData.password) {
      newErrors.password = "Şifre gereklidir"
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır"
    }

    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = "Ad gereklidir"
      }
      if (!formData.lastName) {
        newErrors.lastName = "Soyad gereklidir"
      }
      if (!formData.phone) {
        newErrors.phone = "Telefon numarası gereklidir"
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Şifreler eşleşmiyor"
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = "Kullanım şartlarını kabul etmelisiniz"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      if (isLogin) {
        // Login with credentials
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (result?.error) {
          setErrors({ general: "E-posta veya şifre hatalı" })
        } else {
          setMessage("Giriş başarılı! Yönlendiriliyorsunuz...")
          setTimeout(() => {
            window.location.href = "/"
          }, 1500)
        }
      } else {
        // Register new user
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          setErrors({ general: data.error })
        } else {
          setMessage("Hesap başarıyla oluşturuldu! Giriş yapabilirsiniz.")
          setIsLogin(true)
          setFormData({
            email: formData.email,
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            phone: "",
            acceptTerms: false,
            acceptMarketing: false,
          })
        }
      }
    } catch (error) {
      console.error("Auth error:", error)
      setErrors({ general: "Bir hata oluştu. Lütfen tekrar deneyin." })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: false,
      })

      if (result?.error) {
        setErrors({ general: "Google ile giriş yapılamadı" })
      } else if (result?.url) {
        window.location.href = result.url
      }
    } catch (error) {
      console.error("Google login error:", error)
      setErrors({ general: "Google ile giriş sırasında bir hata oluştu" })
    } finally {
      setLoading(false)
    }
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
              <CardTitle className="text-2xl font-bold text-rawises-800">
                {isLogin ? "Giriş Yap" : "Kayıt Ol"}
              </CardTitle>
              <p className="text-gray-600 text-sm">
                {isLogin
                  ? "Hesabınıza giriş yapın ve alışverişe devam edin"
                  : "Yeni hesap oluşturun ve avantajlardan yararlanın"}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Success/Error Messages */}
              {message && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                  {message}
                </div>
              )}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="pl-10 border-gray-300 focus:border-rawises-500 focus:ring-rawises-500"
                            placeholder="Adınız"
                          />
                        </div>
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="pl-10 border-gray-300 focus:border-rawises-500 focus:ring-rawises-500"
                            placeholder="Soyadınız"
                          />
                        </div>
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10 border-gray-300 focus:border-rawises-500 focus:ring-rawises-500"
                          placeholder="0555 123 45 67"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 border-gray-300 focus:border-rawises-500 focus:ring-rawises-500"
                      placeholder="ornek@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 border-gray-300 focus:border-rawises-500 focus:ring-rawises-500"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Şifre Tekrar</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 border-gray-300 focus:border-rawises-500 focus:ring-rawises-500"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                )}

                {!isLogin && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-rawises-600 border-gray-300 rounded focus:ring-rawises-500"
                      />
                      <label className="text-sm text-gray-600">
                        <Link href="/terms" className="text-rawises-600 hover:underline">
                          Kullanım Şartları
                        </Link>{" "}
                        ve{" "}
                        <Link href="/privacy" className="text-rawises-600 hover:underline">
                          Gizlilik Politikası
                        </Link>
                        'nı okudum ve kabul ediyorum.
                      </label>
                    </div>
                    {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms}</p>}

                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        name="acceptMarketing"
                        checked={formData.acceptMarketing}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-rawises-600 border-gray-300 rounded focus:ring-rawises-500"
                      />
                      <label className="text-sm text-gray-600">
                        Kampanya ve promosyon bilgilerini e-posta ile almak istiyorum.
                      </label>
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-rawises-600 border-gray-300 rounded focus:ring-rawises-500"
                      />
                      <label className="text-sm text-gray-600">Beni hatırla</label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-rawises-600 hover:underline">
                      Şifremi unuttum
                    </Link>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600 text-white py-3 text-base font-semibold"
                  disabled={loading}
                >
                  {loading ? "İşleniyor..." : isLogin ? "Giriş Yap" : "Kayıt Ol"}
                </Button>
              </form>

              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">veya</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 py-3 bg-transparent"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google ile {isLogin ? "Giriş Yap" : "Kayıt Ol"}
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin)
                      setErrors({})
                      setMessage("")
                    }}
                    className="text-rawises-600 hover:underline font-medium"
                  >
                    {isLogin ? "Kayıt Ol" : "Giriş Yap"}
                  </button>
                </p>
              </div>

              {/* Demo Credentials */}
              {isLogin && (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
                  <p className="text-xs text-blue-700 font-medium mb-1">Demo Hesap:</p>
                  <p className="text-xs text-blue-600">E-posta: demo@rawises.com</p>
                  <p className="text-xs text-blue-600">Şifre: password123</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
