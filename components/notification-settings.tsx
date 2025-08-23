"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Bell, Volume2, Mail, Package, ShoppingCart, Settings, RotateCcw } from "lucide-react"
import { useNotificationSettings } from "@/hooks/use-notification-settings"

export function NotificationSettings() {
  const { settings, updateSettings, resetSettings, isLoaded } = useNotificationSettings()

  if (!isLoaded) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Bildirim Ayarları
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* General Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Genel Ayarlar</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="sound" className="text-sm">
                Ses Bildirimleri
              </Label>
            </div>
            <Switch
              id="sound"
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => updateSettings({ soundEnabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="toast" className="text-sm">
                Pop-up Bildirimleri
              </Label>
            </div>
            <Switch
              id="toast"
              checked={settings.toastEnabled}
              onCheckedChange={(checked) => updateSettings({ toastEnabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="email" className="text-sm">
                E-posta Bildirimleri
              </Label>
            </div>
            <Switch
              id="email"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSettings({ emailNotifications: checked })}
            />
          </div>
        </div>

        {/* Category Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Bildirim Kategorileri</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-green-600" />
              <Label htmlFor="orders" className="text-sm">
                Sipariş Bildirimleri
              </Label>
            </div>
            <Switch
              id="orders"
              checked={settings.orderNotifications}
              onCheckedChange={(checked) => updateSettings({ orderNotifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-orange-600" />
              <Label htmlFor="inventory" className="text-sm">
                Stok Bildirimleri
              </Label>
            </div>
            <Switch
              id="inventory"
              checked={settings.inventoryNotifications}
              onCheckedChange={(checked) => updateSettings({ inventoryNotifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-purple-600" />
              <Label htmlFor="system" className="text-sm">
                Sistem Bildirimleri
              </Label>
            </div>
            <Switch
              id="system"
              checked={settings.systemNotifications}
              onCheckedChange={(checked) => updateSettings({ systemNotifications: checked })}
            />
          </div>
        </div>

        {/* Reset Button */}
        <div className="pt-4 border-t">
          <Button variant="outline" onClick={resetSettings} className="w-full bg-transparent">
            <RotateCcw className="h-4 w-4 mr-2" />
            Varsayılan Ayarlara Dön
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
