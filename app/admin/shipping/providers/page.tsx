"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Settings, Save, TestTube, Truck } from "lucide-react"
import type { ShippingProvider } from "@/lib/shipping-types"
import { SHIPPING_PROVIDERS } from "@/lib/shipping-types"
import { useRouter } from "next/navigation"

// Mock provider configurations
const mockProviders: ShippingProvider[] = [
  {
    id: "mng",
    name: "MNG Kargo",
    logo: "/logos/mng.png",
    isActive: true,
    apiKey: "mng_test_key_123",
    testMode: true,
    supportedServices: [
      {
        id: "mng_standard",
        name: "Standart Kargo",
        description: "1-3 iş günü teslimat",
        maxWeight: 30,
        maxDimensions: { length: 100, width: 100, height: 100 },
        basePrice: 15,
        pricePerKg: 2,
        estimatedDays: 2,
      },
      {
        id: "mng_express",
        name: "Hızlı Kargo",
        description: "Aynı gün veya ertesi gün teslimat",
        maxWeight: 20,
        maxDimensions: { length: 80, width: 80, height: 80 },
        basePrice: 25,
        pricePerKg: 3,
        estimatedDays: 1,
      },
    ],
  },
  {
    id: "yurtici",
    name: "Yurtiçi Kargo",
    logo: "/logos/yurtici.png",
    isActive: true,
    apiKey: "yurtici_test_key_456",
    testMode: true,
    supportedServices: [
      {
        id: "yurtici_standard",
        name: "Standart Teslimat",
        description: "2-4 iş günü teslimat",
        maxWeight: 25,
        maxDimensions: { length: 90, width: 90, height: 90 },
        basePrice: 12,
        pricePerKg: 1.5,
        estimatedDays: 3,
      },
    ],
  },
  {
    id: "aras",
    name: "Aras Kargo",
    logo: "/logos/aras.png",
    isActive: false,
    testMode: true,
    supportedServices: [
      {
        id: "aras_standard",
        name: "Standart Kargo",
        description: "2-3 iş günü teslimat",
        maxWeight: 30,
        maxDimensions: { length: 100, width: 100, height: 100 },
        basePrice: 14,
        pricePerKg: 2,
        estimatedDays: 2,
      },
    ],
  },
]

export default function ShippingProvidersPage() {
  const router = useRouter()
  const [providers, setProviders] = useState<ShippingProvider[]>(mockProviders)
  const [selectedProvider, setSelectedProvider] = useState<ShippingProvider | null>(providers[0])
  const [saving, setSaving] = useState(false)

  const handleProviderToggle = (providerId: string, isActive: boolean) => {
    setProviders((prev) => prev.map((provider) => (provider.id === providerId ? { ...provider, isActive } : provider)))
  }

  const handleSaveProvider = async () => {
    if (!selectedProvider) return

    setSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setProviders((prev) => prev.map((provider) => (provider.id === selectedProvider.id ? selectedProvider : provider)))

    setSaving(false)
  }

  const handleTestConnection = async (providerId: string) => {
    // Simulate API test
    await new Promise((resolve) => setTimeout(resolve, 2000))
    alert(`${SHIPPING_PROVIDERS[providerId]} bağlantı testi başarılı!`)
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
          <h1 className="text-3xl font-bold text-foreground">Kargo Ayarları</h1>
          <p className="text-muted-foreground">Kargo firmalarını yapılandırın ve API ayarlarını yönetin</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Provider List */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kargo Firmaları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedProvider?.id === provider.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedProvider(provider)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <Truck className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{provider.name}</div>
                        <div className="text-xs text-muted-foreground">{provider.supportedServices.length} servis</div>
                      </div>
                    </div>
                    <Switch
                      checked={provider.isActive}
                      onCheckedChange={(checked) => handleProviderToggle(provider.id, checked)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={provider.isActive ? "default" : "secondary"} className="text-xs">
                      {provider.isActive ? "Aktif" : "Pasif"}
                    </Badge>
                    {provider.testMode && (
                      <Badge variant="outline" className="text-xs">
                        Test Modu
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Provider Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {selectedProvider && (
            <>
              {/* API Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    {selectedProvider.name} API Ayarları
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Anahtarı</Label>
                      <Input
                        id="apiKey"
                        type="password"
                        value={selectedProvider.apiKey || ""}
                        onChange={(e) =>
                          setSelectedProvider((prev) => (prev ? { ...prev, apiKey: e.target.value } : null))
                        }
                        placeholder="API anahtarınızı girin"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apiSecret">API Gizli Anahtarı</Label>
                      <Input
                        id="apiSecret"
                        type="password"
                        value={selectedProvider.apiSecret || ""}
                        onChange={(e) =>
                          setSelectedProvider((prev) => (prev ? { ...prev, apiSecret: e.target.value } : null))
                        }
                        placeholder="API gizli anahtarınızı girin"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="testMode">Test Modu</Label>
                      <p className="text-xs text-muted-foreground">
                        Test modunda gerçek kargo oluşturulmaz, sadı etiket test edilir
                      </p>
                    </div>
                    <Switch
                      id="testMode"
                      checked={selectedProvider.testMode}
                      onCheckedChange={(checked) =>
                        setSelectedProvider((prev) => (prev ? { ...prev, testMode: checked } : null))
                      }
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSaveProvider} disabled={saving}>
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? "Kaydediliyor..." : "Kaydet"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleTestConnection(selectedProvider.id)}
                      disabled={!selectedProvider.apiKey}
                    >
                      <TestTube className="h-4 w-4 mr-2" />
                      Bağlantıyı Test Et
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Desteklenen Servisler</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedProvider.supportedServices.map((service) => (
                      <div key={service.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {service.estimatedDays} gün
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Maks. Ağırlık:</span>
                            <div className="font-medium">{service.maxWeight} kg</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Maks. Boyut:</span>
                            <div className="font-medium">
                              {service.maxDimensions.length}x{service.maxDimensions.width}x
                              {service.maxDimensions.height} cm
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Başlangıç Fiyatı:</span>
                            <div className="font-medium">{service.basePrice} TL</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Kg Başına:</span>
                            <div className="font-medium">{service.pricePerKg} TL</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
