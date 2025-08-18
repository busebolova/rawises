"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Package, MapPin, User, Phone, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { SHIPPING_PROVIDERS } from "@/lib/shipping-types"

export default function CreateShipmentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    orderId: "",
    provider: "",
    serviceName: "",
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    recipientStreet: "",
    recipientDistrict: "",
    recipientCity: "",
    recipientPostalCode: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    insuranceValue: "",
    notes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate tracking number
    const trackingNumber = `${formData.provider.toUpperCase()}${Date.now()}`

    console.log("Creating shipment:", { ...formData, trackingNumber })

    setLoading(false)
    router.push("/admin/shipping")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Geri Dön
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Yeni Gönderi Oluştur</h1>
          <p className="text-muted-foreground">Yeni bir kargo gönderisi oluşturun</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Gönderi Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="orderId">Sipariş No *</Label>
                  <Input
                    id="orderId"
                    value={formData.orderId}
                    onChange={(e) => handleInputChange("orderId", e.target.value)}
                    placeholder="ORD-2024-001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider">Kargo Firması *</Label>
                  <Select onValueChange={(value) => handleInputChange("provider", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kargo firması seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SHIPPING_PROVIDERS).map(([provider, name]) => (
                        <SelectItem key={provider} value={provider}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceName">Servis Türü</Label>
                <Input
                  id="serviceName"
                  value={formData.serviceName}
                  onChange={(e) => handleInputChange("serviceName", e.target.value)}
                  placeholder="Hızlı Kargo, Standart Kargo, vb."
                />
              </div>
            </CardContent>
          </Card>

          {/* Recipient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Alıcı Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Ad Soyad *</Label>
                  <Input
                    id="recipientName"
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange("recipientName", e.target.value)}
                    placeholder="Alıcının adı soyadı"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientPhone">Telefon *</Label>
                  <Input
                    id="recipientPhone"
                    value={formData.recipientPhone}
                    onChange={(e) => handleInputChange("recipientPhone", e.target.value)}
                    placeholder="0532 123 4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientEmail">E-posta</Label>
                <Input
                  id="recipientEmail"
                  type="email"
                  value={formData.recipientEmail}
                  onChange={(e) => handleInputChange("recipientEmail", e.target.value)}
                  placeholder="ornek@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientStreet">Adres *</Label>
                <Textarea
                  id="recipientStreet"
                  value={formData.recipientStreet}
                  onChange={(e) => handleInputChange("recipientStreet", e.target.value)}
                  placeholder="Sokak, cadde, apartman no, daire no"
                  rows={3}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="recipientDistrict">İlçe *</Label>
                  <Input
                    id="recipientDistrict"
                    value={formData.recipientDistrict}
                    onChange={(e) => handleInputChange("recipientDistrict", e.target.value)}
                    placeholder="İlçe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientCity">İl *</Label>
                  <Input
                    id="recipientCity"
                    value={formData.recipientCity}
                    onChange={(e) => handleInputChange("recipientCity", e.target.value)}
                    placeholder="İl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientPostalCode">Posta Kodu</Label>
                  <Input
                    id="recipientPostalCode"
                    value={formData.recipientPostalCode}
                    onChange={(e) => handleInputChange("recipientPostalCode", e.target.value)}
                    placeholder="34000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Package Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Paket Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Ağırlık (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="1.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Uzunluk (cm)</Label>
                  <Input
                    id="length"
                    type="number"
                    value={formData.length}
                    onChange={(e) => handleInputChange("length", e.target.value)}
                    placeholder="20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Genişlik (cm)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={formData.width}
                    onChange={(e) => handleInputChange("width", e.target.value)}
                    placeholder="15"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Yükseklik (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="insuranceValue">Sigorta Değeri (TL)</Label>
                <Input
                  id="insuranceValue"
                  type="number"
                  step="0.01"
                  value={formData.insuranceValue}
                  onChange={(e) => handleInputChange("insuranceValue", e.target.value)}
                  placeholder="100.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notlar</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Özel talimatlar veya notlar"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>İşlemler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <Button onClick={handleSave} disabled={loading} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Oluşturuluyor..." : "Gönderi Oluştur"}
                </Button>
                <Button variant="outline" onClick={() => router.back()} className="w-full">
                  İptal
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Bilgi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Gönderici: Rawises Kozmetik</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>Tel: 0212 555 0123</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@rawises.com</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
