"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Package, Heart, Settings, Edit, Save, X } from "lucide-react"
import Image from "next/image"

interface UserProfile {
  id: string
  email: string
  name: string
  phone?: string
  address?: string
  city?: string
  postalCode?: string
  birthDate?: string
  gender?: string
}

interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: Array<{
    id: string
    name: string
    image: string
    price: number
    quantity: number
  }>
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [favorites, setFavorites] = useState<any[]>([])

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/login")
      return
    }

    loadUserData()
  }, [session, status, router])

  const loadUserData = async () => {
    try {
      // Kullanıcı profil bilgilerini yükle
      const profileResponse = await fetch("/api/user/profile")
      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        setProfile(profileData.profile)
      }

      // Siparişleri yükle
      const ordersResponse = await fetch("/api/user/orders")
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json()
        setOrders(ordersData.orders)
      }

      // Favorileri yükle
      const favoritesResponse = await fetch("/api/user/favorites")
      if (favoritesResponse.ok) {
        const favoritesData = await favoritesResponse.json()
        setFavorites(favoritesData.favorites)
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleProfileUpdate = async (updatedProfile: UserProfile) => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      })

      if (response.ok) {
        const data = await response.json()
        setProfile(data.profile)
        setEditMode(false)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Beklemede"
      case "processing":
        return "Hazırlanıyor"
      case "shipped":
        return "Kargoda"
      case "delivered":
        return "Teslim Edildi"
      case "cancelled":
        return "İptal Edildi"
      default:
        return status
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="md:col-span-2 h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
        <MobileBottomNav />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-rawises-800 mb-2">Hesabım</h1>
          <p className="text-gray-600">Hoş geldiniz, {session.user?.name}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-rawises-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image || "/placeholder.svg"}
                        alt={session.user.name || "User"}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="w-10 h-10 text-rawises-600" />
                    )}
                  </div>
                  <h3 className="font-semibold text-rawises-800">{session.user?.name}</h3>
                  <p className="text-sm text-gray-600">{session.user?.email}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Toplam Sipariş</span>
                    <span className="font-semibold">{orders.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Favoriler</span>
                    <span className="font-semibold">{favorites.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Üyelik</span>
                    <Badge variant="secondary" className="bg-rawises-100 text-rawises-700">
                      Premium
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profil</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">Siparişler</span>
                </TabsTrigger>
                <TabsTrigger value="favorites" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span className="hidden sm:inline">Favoriler</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Ayarlar</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Kişisel Bilgiler</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditMode(!editMode)}
                      className="bg-transparent"
                    >
                      {editMode ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                      {editMode ? "İptal" : "Düzenle"}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <ProfileForm
                      profile={profile}
                      editMode={editMode}
                      onSave={handleProfileUpdate}
                      onCancel={() => setEditMode(false)}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Siparişlerim</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Henüz siparişiniz bulunmuyor</p>
                        <Button className="mt-4 bg-rawises-600 hover:bg-rawises-700" onClick={() => router.push("/")}>
                          Alışverişe Başla
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <p className="font-semibold">Sipariş #{order.id}</p>
                                <p className="text-sm text-gray-600">{order.date}</p>
                              </div>
                              <div className="text-right">
                                <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                                <p className="font-semibold mt-1">{order.total.toFixed(2)} TL</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    width={40}
                                    height={40}
                                    className="rounded object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{item.name}</p>
                                    <p className="text-xs text-gray-600">
                                      {item.quantity} adet × {item.price} TL
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Favorites Tab */}
              <TabsContent value="favorites">
                <Card>
                  <CardHeader>
                    <CardTitle>Favorilerim</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {favorites.length === 0 ? (
                      <div className="text-center py-8">
                        <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Henüz favori ürününüz bulunmuyor</p>
                        <Button className="mt-4 bg-rawises-600 hover:bg-rawises-700" onClick={() => router.push("/")}>
                          Ürünleri Keşfet
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {favorites.map((product) => (
                          <div key={product.id} className="border rounded-lg p-4">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={150}
                              height={150}
                              className="w-full h-32 object-cover rounded mb-3"
                            />
                            <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                            <p className="text-rawises-600 font-bold">{product.price} TL</p>
                            <Button size="sm" className="w-full mt-3 bg-rawises-600 hover:bg-rawises-700">
                              Sepete Ekle
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hesap Ayarları</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">E-posta Bildirimleri</h4>
                          <p className="text-sm text-gray-600">Kampanya ve promosyon bilgileri</p>
                        </div>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">SMS Bildirimleri</h4>
                          <p className="text-sm text-gray-600">Sipariş durumu güncellemeleri</p>
                        </div>
                        <input type="checkbox" className="toggle" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Güvenlik</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Şifre Değiştir
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        İki Faktörlü Doğrulama
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}

// Profile Form Component
function ProfileForm({
  profile,
  editMode,
  onSave,
  onCancel,
}: {
  profile: UserProfile | null
  editMode: boolean
  onSave: (profile: UserProfile) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<UserProfile>(
    profile || {
      id: "",
      email: "",
      name: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      birthDate: "",
      gender: "",
    },
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!editMode) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-rawises-600" />
            <div>
              <p className="text-sm text-gray-600">Ad Soyad</p>
              <p className="font-medium">{profile?.name || "Belirtilmemiş"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-rawises-600" />
            <div>
              <p className="text-sm text-gray-600">E-posta</p>
              <p className="font-medium">{profile?.email || "Belirtilmemiş"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-rawises-600" />
            <div>
              <p className="text-sm text-gray-600">Telefon</p>
              <p className="font-medium">{profile?.phone || "Belirtilmemiş"}</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-rawises-600 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Adres</p>
              <p className="font-medium">
                {profile?.address ? `${profile.address}, ${profile.city} ${profile.postalCode}` : "Belirtilmemiş"}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border-gray-300 focus:border-rawises-500 focus:ring-rawises-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border-gray-300 focus:border-rawises-500 focus:ring-rawises-500"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="border-gray-300 focus:border-rawises-500 focus:ring-rawises-500"
            placeholder="0555 123 45 67"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Doğum Tarihi</label>
          <Input
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleInputChange}
            className="border-gray-300 focus:border-rawises-500 focus:ring-rawises-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
          <Input
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="border-gray-300 focus:border-rawises-500 focus:ring-rawises-500"
            placeholder="Mahalle, Sokak, No"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
          <Input
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="border-gray-300 focus:border-rawises-500 focus:ring-rawises-500"
            placeholder="İstanbul"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Posta Kodu</label>
          <Input
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            className="border-gray-300 focus:border-rawises-500 focus:ring-rawises-500"
            placeholder="34000"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="bg-rawises-600 hover:bg-rawises-700 text-white">
          <Save className="w-4 h-4 mr-2" />
          Kaydet
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="bg-transparent">
          İptal
        </Button>
      </div>
    </form>
  )
}
