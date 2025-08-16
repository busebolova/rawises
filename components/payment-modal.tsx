"use client"

import type React from "react"

import { useState } from "react"
import { X, CreditCard, Shield, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart-store"
import { generateOrderId } from "@/lib/sipay"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const { items, totalPrice, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
  })

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      const orderId = generateOrderId()
      const fullAddress = `${formData.address}, ${formData.district}/${formData.city} ${formData.postalCode}`

      const paymentRequest = {
        orderId,
        email: formData.email,
        amount: totalPrice,
        userName: formData.fullName,
        userAddress: fullAddress,
        userPhone: formData.phone,
        items: items.map((item) => ({
          name: item.name,
          price: item.discountPrice,
          quantity: item.quantity,
        })),
      }

      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentRequest),
      })

      const result = await response.json()

      if (result.success) {
        // Sipay ödeme formunu oluştur ve gönder
        const form = document.createElement("form")
        form.method = "POST"
        form.action = result.paymentUrl
        form.target = "_blank"

        Object.entries(result.paymentData).forEach(([key, value]) => {
          const input = document.createElement("input")
          input.type = "hidden"
          input.name = key
          input.value = value as string
          form.appendChild(input)
        })

        document.body.appendChild(form)
        form.submit()
        document.body.removeChild(form)

        // Sepeti temizle ve modal'ı kapat
        clearCart()
        onClose()
      } else {
        alert("Ödeme işlemi başlatılırken hata oluştu: " + result.error)
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Ödeme işlemi sırasında bir hata oluştu")
    } finally {
      setIsProcessing(false)
    }
  }

  const isFormValid =
    formData.email && formData.phone && formData.fullName && formData.address && formData.city && formData.district

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-rawises-800 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Ödeme Bilgileri
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Sipariş Özeti */}
              <div>
                <h3 className="text-lg font-semibold text-rawises-800 mb-4">Sipariş Özeti</h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex-1">
                          <p className="font-medium line-clamp-1">{item.name}</p>
                          <p className="text-gray-500">{item.quantity} adet</p>
                        </div>
                        <p className="font-semibold">{(item.discountPrice * item.quantity).toFixed(2)} TL</p>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Toplam:</span>
                    <span className="text-rawises-600">{totalPrice.toFixed(2)} TL</span>
                  </div>
                </div>

                {/* Güvenlik Bilgileri */}
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Güvenli Ödeme</span>
                  </div>
                  <div className="text-sm text-green-700 space-y-1">
                    <p className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      SSL sertifikası ile korumalı
                    </p>
                    <p>• 3D Secure güvenlik protokolü</p>
                    <p>• Kart bilgileriniz saklanmaz</p>
                  </div>
                </div>
              </div>

              {/* Müşteri Bilgileri */}
              <div>
                <h3 className="text-lg font-semibold text-rawises-800 mb-4">Müşteri Bilgileri</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Ad Soyad *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Adınız ve soyadınız"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-posta *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="05XX XXX XX XX"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Adres *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Mahalle, sokak, bina no"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="district">İlçe *</Label>
                      <Input
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        placeholder="İlçe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">İl *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="İl"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="postalCode">Posta Kodu</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="01000"
                    />
                  </div>
                </div>

                {/* Ödeme Butonu */}
                <div className="mt-6">
                  <Button
                    onClick={handlePayment}
                    disabled={!isFormValid || isProcessing}
                    className="w-full bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600 text-white py-3 text-lg font-semibold"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        İşleniyor...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Güvenli Ödeme ({totalPrice.toFixed(2)} TL)
                      </>
                    )}
                  </Button>

                  {/* Sipay Logo */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500 mb-2">Ödeme altyapısı</p>
                    <div className="flex justify-center items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">Sipay</span>
                      <div className="flex gap-1">
                        <div className="w-6 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                          <span className="text-white text-xs font-bold">V</span>
                        </div>
                        <div className="w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                          <span className="text-white text-xs font-bold">M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
