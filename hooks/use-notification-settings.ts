"use client"

import { useState, useEffect } from "react"

interface NotificationSettings {
  soundEnabled: boolean
  toastEnabled: boolean
  orderNotifications: boolean
  inventoryNotifications: boolean
  systemNotifications: boolean
  emailNotifications: boolean
}

const defaultSettings: NotificationSettings = {
  soundEnabled: true,
  toastEnabled: true,
  orderNotifications: true,
  inventoryNotifications: true,
  systemNotifications: true,
  emailNotifications: false,
}

export function useNotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load settings from localStorage
    try {
      const saved = localStorage.getItem("notificationSettings")
      if (saved) {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) })
      }
    } catch (error) {
      console.log("[v0] Could not load notification settings:", error)
    }
    setIsLoaded(true)
  }, [])

  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)

    try {
      localStorage.setItem("notificationSettings", JSON.stringify(updated))
    } catch (error) {
      console.log("[v0] Could not save notification settings:", error)
    }
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    try {
      localStorage.removeItem("notificationSettings")
    } catch (error) {
      console.log("[v0] Could not reset notification settings:", error)
    }
  }

  return {
    settings,
    updateSettings,
    resetSettings,
    isLoaded,
  }
}
