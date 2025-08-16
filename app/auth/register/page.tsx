"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptMarketing, setAcceptMarketing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ad gereklidir"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Soyad gereklidir"
    }

    if (!formData.email) {
      newErrors.email = "E-posta adresi gereklidir"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz"
    }

    if (!formData.phone) {
      newErrors.phone = "Telefon numarası gereklidir"
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Geçerli bir telefon numarası giriniz"
    }

    if (!formData.password) {
      newErrors.password = "Şifre gereklidir"
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Şifre tekrarı gereklidir"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor"
    }

    if (!acceptTerms) {
      newErrors.terms = "Kullanım koşullarını kabul etmelisiniz"
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setIsLoading(false)
      return
    }

    // Simulated registration
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Başarılı kayıt
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
        }),
      )

      router.push("/auth/login?registered=true")
    } catch (error) {
      setErrors({ general: "Kayıt olurken bir hata oluştu" })
    } finally {
      setIsLoading(false)
    }
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
            <CardTitle className="text-2xl font-bold text-rawises-800">Üye Ol</CardTitle>
            <p className="text-rawises-600 mt-2">Yeni hesap oluşturun</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Message */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-rawises-800">
                    Ad
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rawises-400 w-4 h-4" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Adınız"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`pl-10 border-rawises-200 focus:border-rawises-500 focus:ring-rawises-500 ${
                        errors.firstName ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-rawises-800">
                    Soyad
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Soyadınız"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={`border-rawises-200 focus:border-rawises-500 focus:ring-rawises-500 ${
                      errors.lastName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                </div>
              </div>

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
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 border-rawises-200 focus:border-rawises-500 focus:ring-rawises-500 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-rawises-800">
                  Telefon Numarası
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rawises-400 w-4 h-4" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="05XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`pl-10 border-rawises-200 focus:border-rawises-500 focus:ring-rawises-500 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 gap-4">
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
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
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

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-rawises-800">
                    Şifre Tekrarı
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rawises-400 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Şifrenizi tekrar giriniz"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`pl-10 pr-10 border-rawises-200 focus:border-rawises-500 focus:ring-rawises-500 ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-rawises-400 hover:text-rawises-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Terms and Marketing */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className={errors.terms ? "border-red-500" : ""}
                  />
                  <label htmlFor="terms" className="text-sm text-rawises-700 leading-tight">
                    <Link href="/terms" className="text-rawises-600 hover:text-rawises-800 underline">
                      Kullanım Koşulları
                    </Link>{" "}
                    ve{" "}
                    <Link href="/privacy" className="text-rawises-600 hover:text-rawises-800 underline">
                      Gizlilik Politikası
                    </Link>
                    'nı kabul ediyorum
                  </label>
                </div>
                {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketing"
                    checked={acceptMarketing}
                    onCheckedChange={(checked) => setAcceptMarketing(checked as boolean)}
                  />
                  <label htmlFor="marketing" className="text-sm text-rawises-700 leading-tight">
                    Kampanya ve fırsatlardan haberdar olmak istiyorum
                  </label>
                </div>
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600 text-white font-medium py-3"
                disabled={isLoading}
              >
                {isLoading ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-rawises-600">
                Zaten hesabınız var mı?{" "}
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
