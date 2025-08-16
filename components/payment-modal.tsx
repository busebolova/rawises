"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { X, CreditCard, Truck, Shield, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart-store"
import { generateOrderId, createSipayPaymentData, type CartItem } from "@/lib/sipay"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const { items, totalPrice, totalPriceWithoutVAT, vatAmount, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
  })

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const orderId = generateOrderId()
      const userName = `${formData.firstName} ${formData.lastName}`
      const userAddress = `${formData.address}, ${formData.district}, ${formData.city} ${formData.postalCode}`

      // Sepet ürünlerini Sipay formatına çevir
      const cartItems: CartItem[] = items.map((item) => ({
        name: item.name,
        price: item.discountPrice,
        quantity: item.quantity,
      }))

      // Sipay ödeme verilerini oluştur
      const paymentData = createSipayPaymentData({
        orderId,
        email: formData.email,
        amount: totalPriceWithoutVAT, // KDV hariç tutar gönderiliyor
        userName,
        userAddress,
        userPhone: formData.phone,
        items: cartItems,
      })

      // Ödeme API'sine istek gönder
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...paymentData,
          customerInfo: formData,
        }),
      })

      const result = await response.json()

      if (result.success && result.paymentUrl) {
        // Sepeti temizle
        clearCart()
        // Ödeme sayfasına yönlendir
        window.location.href = result.paymentUrl
      } else {
        throw new Error(result.error || "Ödeme işlemi başlatılamadı")
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              <h2 className="text-lg lg:text-xl font-semibold">Ödeme Bilgileri</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-4 lg:p-6">
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Sipariş Özeti
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Ürün Toplamı ({items.length} ürün):</span>
                    <span>{(totalPriceWithoutVAT || 0).toFixed(2)} TL</span>
                  </div>
                  <div className="flex justify-between text-orange-600">
                    <span>KDV (%20):</span>
                    <span>{(vatAmount || 0).toFixed(2)} TL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kargo:</span>
                    <span className="text-green-600">Ücretsiz</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Toplam:</span>
                    <span className="text-purple-600">{(totalPrice || 0).toFixed(2)} TL</span>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Müşteri Bilgileri</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Ad *</Label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rawises-500 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Soyad *</Label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rawises-500 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-posta *</Label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rawises-500 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon *</Label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="05XX XXX XX XX"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rawises-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Teslimat Adresi
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Adres *</Label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rawises-500 text-sm resize-none"
                      placeholder="Mahalle, sokak, bina no, daire no"
                    />
                  </div>
                  <div>
                    <Label htmlFor="district">İlçe *</Label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rawises-500 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">İl *</Label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rawises-500 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Posta Kodu</Label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rawises-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Güvenli Ödeme</span>
                </div>
                <div className="text-sm text-green-700 space-y-1">
                  <p>• 256-bit SSL şifreleme ile korunmaktadır</p>
                  <p>• 3D Secure ile güvenli ödeme</p>
                  <p>• Kredi kartı bilgileriniz saklanmaz</p>
                </div>
              </div>

              {/* Payment Button */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600 py-3 text-base"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      İşleminiz Hazırlanıyor...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Güvenli Ödeme ({(totalPrice || 0).toFixed(2)} TL)
                    </>
                  )}
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Ödeme butonuna tıklayarak{" "}
                  <Link href="/kullanim-kosullari" className="text-rawises-600 hover:underline">
                    Kullanım Koşulları
                  </Link>{" "}
                  ve{" "}
                  <Link href="/gizlilik-politikasi" className="text-rawises-600 hover:underline">
                    Gizlilik Politikası
                  </Link>
                  'nı kabul etmiş olursunuz.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
