"use client"

import { useState } from "react"
import { X, CreditCard, User, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCartStore } from "@/lib/cart-store"
import { sipayService } from "@/lib/sipay-client"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  if (!isOpen) return null

  const totalAmount = totalPrice

  const handlePayment = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert("Lütfen tüm zorunlu alanları doldurun")
      return
    }

    setIsProcessing(true)

    try {
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const productNames = items.map((item) => `${item.name} (${item.quantity}x)`).join(", ")

      console.log("[v0] Starting payment process for order:", orderId)

      const paymentResult = await sipayService.createPayment({
        orderId,
        amount: totalAmount,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        productName: productNames,
        productDescription: `${items.length} ürün içeren sipariş`,
      })

      console.log("[v0] Payment result:", paymentResult)

      if (paymentResult.status === "success" && paymentResult.payment_url) {
        console.log("[v0] Payment successful, redirecting to:", paymentResult.payment_url)

        // Store order info in localStorage for success page
        localStorage.setItem(
          "currentOrder",
          JSON.stringify({
            orderId,
            items,
            totalAmount,
            customerInfo,
          }),
        )

        // Redirect to Sipay payment page
        window.location.href = paymentResult.payment_url
      } else {
        const errorMessage = paymentResult.error_message || "Ödeme işlemi başlatılamadı"
        console.error("[v0] Payment failed:", errorMessage)
        alert(`Ödeme Hatası: ${errorMessage}`)
      }
    } catch (error) {
      console.error("[v0] Payment error:", error)
      const errorMessage = error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu"
      alert(`Ödeme işlemi sırasında bir hata oluştu: ${errorMessage}`)
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
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-rawises-800">Ödeme Bilgileri</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-rawises-800 mb-3">Sipariş Özeti</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={`${item.id}-${item.quantity}`} className="flex justify-between text-sm">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>{((item.discountPrice || 0) * item.quantity).toFixed(2)} TL</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Toplam:</span>
                  <span className="text-rawises-600">{totalAmount.toFixed(2)} TL</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-rawises-800">Müşteri Bilgileri</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Ad Soyad *
                  </Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Ad Soyad"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    E-posta *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="ornek@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Telefon *
                  </Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="0555 123 45 67"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Adres
                  </Label>
                  <Input
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="Teslimat adresi"
                  />
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <div className="border-t pt-6">
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600"
                size="lg"
              >
                {isProcessing ? (
                  "İşleniyor..."
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Sipay ile Öde ({totalAmount.toFixed(2)} TL)
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-2">Güvenli ödeme Sipay altyapısı ile sağlanmaktadır</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
