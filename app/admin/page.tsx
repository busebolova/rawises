"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Eye, EyeOff } from "lucide-react"

export default function AdminDashboard() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const adminPassword = "Rawises1234" // Changed from rawises2024

    if (password === adminPassword) {
      setIsAuthenticated(true)
      console.log("[v0] Admin authentication successful")
    } else {
      setError("Yanlış şifre. Lütfen tekrar deneyin.")
      console.log("[v0] Admin authentication failed")
    }

    setIsLoading(false)
  }

  if (isAuthenticated) {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-6 rounded-lg border">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">🎉 Admin Paneline Hoş Geldiniz!</h1>
            <p className="text-muted-foreground">
              Başarıyla giriş yaptınız. Admin panel özellikleri yakında eklenecek.
            </p>
          </div>
        </div>

        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Lock className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Giriş Başarılı</h2>
              <p className="text-muted-foreground">
                Admin panel özellikleri geliştirme aşamasında. Yakında tüm yönetim araçları burada olacak.
              </p>
              <Button onClick={() => setIsAuthenticated(false)} variant="outline" className="w-full">
                Çıkış Yap
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Admin Paneli</CardTitle>
            <p className="text-muted-foreground mt-2">Yönetim paneline erişmek için şifrenizi girin</p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin şifresini girin"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{error}</div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading || !password.trim()}>
              {isLoading ? "Kontrol ediliyor..." : "Giriş Yap"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">Rawises E-Ticaret Yönetim Sistemi</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
