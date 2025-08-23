"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Percent, Users, Settings, Save } from "lucide-react"

export default function AdminDiscountsPage() {
  const [discountSettings, setDiscountSettings] = useState({
    memberDiscountEnabled: true,
    memberDiscountRate: 15,
    minimumOrderAmount: 0,
    description: "Üye müşterilere özel indirim",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<string | null>(null)

  useEffect(() => {
    // Load discount settings from localStorage
    const saved = localStorage.getItem("adminDiscountSettings")
    if (saved) {
      setDiscountSettings(JSON.parse(saved))
    }
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Save to localStorage (in real app, this would be API call)
      localStorage.setItem("adminDiscountSettings", JSON.stringify(discountSettings))
      setLastSaved(new Date().toLocaleString("tr-TR"))

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Error saving discount settings:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-rawises-800">İndirim Ayarları</h1>
          <p className="text-rawises-600">Üye müşteri indirimlerini yönetin</p>
        </div>
        <Badge variant={discountSettings.memberDiscountEnabled ? "default" : "secondary"}>
          {discountSettings.memberDiscountEnabled ? "Aktif" : "Pasif"}
        </Badge>
      </div>

      <div className="grid gap-6">
        {/* Member Discount Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Üye İndirimi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Enable/Disable Switch */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Üye İndirimi</Label>
                <p className="text-sm text-gray-600">Kayıtlı üye müşterilere özel indirim uygula</p>
              </div>
              <Switch
                checked={discountSettings.memberDiscountEnabled}
                onCheckedChange={(checked) =>
                  setDiscountSettings((prev) => ({ ...prev, memberDiscountEnabled: checked }))
                }
              />
            </div>

            {/* Discount Rate */}
            <div className="space-y-2">
              <Label htmlFor="discountRate" className="flex items-center gap-2">
                <Percent className="w-4 h-4" />
                İndirim Oranı (%)
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="discountRate"
                  type="number"
                  min="0"
                  max="50"
                  value={discountSettings.memberDiscountRate}
                  onChange={(e) =>
                    setDiscountSettings((prev) => ({
                      ...prev,
                      memberDiscountRate: Math.min(50, Math.max(0, Number(e.target.value))),
                    }))
                  }
                  className="w-24"
                  disabled={!discountSettings.memberDiscountEnabled}
                />
                <span className="text-sm text-gray-600">%</span>
              </div>
              <p className="text-xs text-gray-500">Maksimum %50 indirim uygulanabilir</p>
            </div>

            {/* Minimum Order Amount */}
            <div className="space-y-2">
              <Label htmlFor="minimumAmount">Minimum Sipariş Tutarı (TL)</Label>
              <Input
                id="minimumAmount"
                type="number"
                min="0"
                value={discountSettings.minimumOrderAmount}
                onChange={(e) =>
                  setDiscountSettings((prev) => ({
                    ...prev,
                    minimumOrderAmount: Math.max(0, Number(e.target.value)),
                  }))
                }
                className="w-32"
                disabled={!discountSettings.memberDiscountEnabled}
              />
              <p className="text-xs text-gray-500">İndirim için minimum sipariş tutarı (0 = sınır yok)</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">İndirim Açıklaması</Label>
              <Input
                id="description"
                value={discountSettings.description}
                onChange={(e) => setDiscountSettings((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="İndirim açıklaması"
                disabled={!discountSettings.memberDiscountEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Önizleme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-green-800">{discountSettings.description}</h3>
                  <p className="text-sm text-green-600">
                    {discountSettings.memberDiscountEnabled
                      ? `%${discountSettings.memberDiscountRate} indirim`
                      : "İndirim pasif"}
                    {discountSettings.minimumOrderAmount > 0 && ` (Min. ${discountSettings.minimumOrderAmount} TL)`}
                  </p>
                </div>
                <Badge variant={discountSettings.memberDiscountEnabled ? "default" : "secondary"}>
                  {discountSettings.memberDiscountEnabled ? "Aktif" : "Pasif"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">{lastSaved && `Son kaydedilme: ${lastSaved}`}</div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Kaydediliyor..." : "Ayarları Kaydet"}
          </Button>
        </div>
      </div>
    </div>
  )
}
