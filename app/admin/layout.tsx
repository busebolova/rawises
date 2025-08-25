"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Warehouse,
  Truck,
  BarChart3,
  Settings,
  LogOut,
  User,
  Percent,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NotificationCenter } from "@/components/notification-center"
import { useNotificationSettings } from "@/hooks/use-notification-settings"

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Ürünler", href: "/admin/products" },
  { icon: ShoppingCart, label: "Siparişler", href: "/admin/orders" },
  { icon: Warehouse, label: "Stok", href: "/admin/stock" },
  { icon: Truck, label: "Kargo", href: "/admin/shipping" },
  { icon: Percent, label: "İndirimler", href: "/admin/discounts" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Ayarlar", href: "/admin/settings" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { settings } = useNotificationSettings()

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (typeof window !== "undefined") {
          const adminAuth = localStorage.getItem("adminAuth")
          const adminAuthTime = localStorage.getItem("adminAuthTime")

          console.log("[v0] Checking auth:", { adminAuth, adminAuthTime })

          if (adminAuth === "true" && adminAuthTime) {
            const authTime = Number.parseInt(adminAuthTime)
            const now = Date.now()
            const twentyFourHours = 24 * 60 * 60 * 1000

            if (now - authTime <= twentyFourHours && authTime <= now) {
              document.cookie = `adminAuth=true; path=/; max-age=${60 * 60 * 24}`
              document.cookie = `adminAuthTime=${authTime}; path=/; max-age=${60 * 60 * 24}`

              console.log("[v0] Auth successful, setting authenticated state")
              setIsAuthenticated(true)
              setIsLoading(false)
              return
            } else {
              console.log("[v0] Auth expired or invalid timestamp")
              localStorage.removeItem("adminAuth")
              localStorage.removeItem("adminAuthTime")
            }
          } else {
            console.log("[v0] No valid auth found")
          }

          if (pathname !== "/admin/login") {
            handleLogout()
          } else {
            setIsLoading(false)
          }
        }
      } catch (error) {
        console.error("[v0] Auth check error:", error)
        if (pathname !== "/admin/login") {
          handleLogout()
        } else {
          setIsLoading(false)
        }
      }
    }

    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.log("[v0] Auth check timeout")
        if (pathname !== "/admin/login") {
          handleLogout()
        } else {
          setIsLoading(false)
        }
      }
    }, 5000)

    checkAuthentication()

    return () => clearTimeout(timeoutId)
  }, [router, isLoading, pathname])

  const handleLogout = () => {
    console.log("[v0] Logging out")
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminAuth")
      localStorage.removeItem("adminAuthTime")
      document.cookie = "adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      document.cookie = "adminAuthTime=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
    setIsLoading(false)
    setIsAuthenticated(false)
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Kimlik doğrulanıyor...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Giriş sayfasına yönlendiriliyor...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && pathname === "/admin/login") {
    return <div className="min-h-screen bg-background">{children}</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top header with logo and user info */}
      <header className="sticky top-0 z-30 bg-background border-b">
        <div className="flex h-16 items-center justify-between px-6">
          <h1 className="text-xl font-bold text-foreground">Rawises Admin</h1>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Online
            </Badge>

            <NotificationCenter showToasts={settings.toastEnabled} playSound={settings.soundEnabled} />

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@rawises.com</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Çıkış Yap</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="border-b bg-muted/30">
          <div className="flex items-center px-6 overflow-x-auto">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap border-b-2
                    ${
                      isActive
                        ? "border-primary text-primary bg-background"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
                    }
                  `}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="p-6">{children}</main>
    </div>
  )
}
