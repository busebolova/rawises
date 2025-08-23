"use client"

import { useState, useEffect } from "react"
import { X, CreditCard, User, Mail, Phone, MapPin, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCartStore } from "@/lib/cart-store"
import { useRealtime } from "@/hooks/use-realtime"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, totalPrice, memberDiscount, memberDiscountAmount, finalTotal, clearCart, isHydrated } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState<"customer" | "payment">("customer")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardHolderName: "",
  })

  const [user, setUser] = useState<any>(null)

  const { addNotification } = useRealtime()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  if (!isOpen) return null

  const totalAmount = isHydrated ? finalTotal || totalPrice : 0

  const handleProceedToPayment = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert("Lütfen tüm zorunlu alanları doldurun")
      return
    }
    setStep("payment")
  }

  const handlePayment = async () => {
    alert("handlePayment çağrıldı - başlangıç testi")

    setIsProcessing(true)

    try {
      console.log("[v0] Starting payment process")

      // Validate required fields
      if (
        !cardInfo.cardNumber ||
        !cardInfo.expiryMonth ||
        !cardInfo.expiryYear ||
        !cardInfo.cvv ||
        !cardInfo.cardHolderName
      ) {
        alert("Lütfen tüm kredi kartı bilgilerini doldurun")
        return
      }

      if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
        alert("Lütfen tüm müşteri bilgilerini doldurun")
        return
      }

      // Generate order ID
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Prepare product names
      const productNames = items.map((item) => `${item.name} (${item.quantity}x)`).join(", ")

      console.log("[v0] Calling payment API with order:", orderId)

      addNotification({
        type: "order",
        message: `Yeni sipariş oluşturuluyor: #${orderId} - ₺${totalAmount.toFixed(2)}`,
        orderId: orderId,
      })

      // Call payment API
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          amount: totalAmount,
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone,
          productName: productNames,
          productDescription: `${items.length} ürün içeren sipariş`,
          cardNumber: cardInfo.cardNumber.replace(/\s/g, ""),
          expiryMonth: cardInfo.expiryMonth,
          expiryYear: cardInfo.expiryYear,
          cvv: cardInfo.cvv,
          cardHolderName: cardInfo.cardHolderName,
        }),
      })

      console.log("[v0] Payment API response status:", response.status)

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const result = await response.json()
      console.log("[v0] Payment API result:", result)

      if (result.status === "success" && result.payment_html) {
        console.log("[v0] Processing payment HTML")

        addNotification({
          type: "order",
          message: `Ödeme işlemi başlatıldı: #${orderId}`,
          orderId: orderId,
        })

        // Create a temporary div to hold the HTML
        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = result.payment_html

        // Find the form in the HTML
        const form = tempDiv.querySelector("form")
        if (form) {
          console.log("[v0] Found payment form, submitting to Sipay")

          // Add form to document body (hidden)
          form.style.display = "none"
          document.body.appendChild(form)

          // Submit form - this will redirect to Sipay for 3D Secure
          form.submit()

          // Close modal since we're redirecting
          onClose()
        } else {
          throw new Error("Payment form not found in response")
        }
      } else {
        throw new Error(result.message || "Payment initialization failed")
      }
    } catch (error) {
      console.error("[v0] Payment error:", error)

      addNotification({
        type: "order",
        message: `Ödeme hatası: ${error instanceof Error ? error.message : String(error)}`,
        orderId: "error",
      })

      alert("Ödeme işlemi sırasında hata: " + (error instanceof Error ? error.message : String(error)))
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
            <div className="flex items-center gap-3">
              {step === "payment" && (
                <Button variant="ghost" size="sm" onClick={() => setStep("customer")}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <h2 className="text-lg font-semibold text-rawises-800">
                {step === "customer" ? "Müşteri Bilgileri" : "Ödeme Bilgileri"}
              </h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-rawises-800 mb-3">Sipariş Özeti</h3>
              {!isHydrated ? (
                <div className="text-center py-4 text-gray-500">Yükleniyor...</div>
              ) : (
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.quantity}`} className="flex justify-between text-sm">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>{((item.discountPrice || 0) * item.quantity).toFixed(2)} TL</span>
                    </div>
                  ))}

                  {user && memberDiscount > 0 && (
                    <>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Ara Toplam:</span>
                        <span>{(totalPrice - totalPrice * 0.2).toFixed(2)} TL</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Üye İndirimi (-%{memberDiscount}):</span>
                        <span>-{memberDiscountAmount.toFixed(2)} TL</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>KDV (%20):</span>
                        <span>{(totalAmount - totalAmount / 1.2).toFixed(2)} TL</span>
                      </div>
                    </>
                  )}

                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Toplam:</span>
                    <span className="text-rawises-600">{totalAmount.toFixed(2)} TL</span>
                  </div>

                  {user && memberDiscount > 0 && (
                    <div className="text-xs text-green-600 text-center">
                      ✓ {memberDiscountAmount.toFixed(2)} TL tasarruf ettiniz!
                    </div>
                  )}
                </div>
              )}
            </div>

            {step === "customer" ? (
              <>
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

                {/* Proceed Button */}
                <div className="border-t pt-6">
                  <Button
                    onClick={handleProceedToPayment}
                    disabled={!isHydrated || totalAmount <= 0}
                    className="w-full bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600"
                    size="lg"
                  >
                    {!isHydrated ? "Yükleniyor..." : "Ödemeye Geç"}
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Credit Card Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-rawises-800">Kredi Kartı Bilgileri</h3>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardHolderName" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Kart Üzerindeki İsim *
                      </Label>
                      <Input
                        id="cardHolderName"
                        value={cardInfo.cardHolderName}
                        onChange={(e) => setCardInfo((prev) => ({ ...prev, cardHolderName: e.target.value }))}
                        placeholder="JOHN DOE"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Kart Numarası *
                      </Label>
                      <Input
                        id="cardNumber"
                        value={cardInfo.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ")
                          if (value.replace(/\s/g, "").length <= 16) {
                            setCardInfo((prev) => ({ ...prev, cardNumber: value }))
                          }
                        }}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryMonth">Ay *</Label>
                        <Input
                          id="expiryMonth"
                          value={cardInfo.expiryMonth}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "")
                            if (
                              value.length <= 2 &&
                              (value === "" || (Number.parseInt(value) >= 1 && Number.parseInt(value) <= 12))
                            ) {
                              setCardInfo((prev) => ({ ...prev, expiryMonth: value }))
                            }
                          }}
                          placeholder="MM"
                          maxLength={2}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expiryYear">Yıl *</Label>
                        <Input
                          id="expiryYear"
                          value={cardInfo.expiryYear}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "")
                            if (value.length <= 2) {
                              setCardInfo((prev) => ({ ...prev, expiryYear: value }))
                            }
                          }}
                          placeholder="YY"
                          maxLength={2}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          value={cardInfo.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "")
                            if (value.length <= 3) {
                              setCardInfo((prev) => ({ ...prev, cvv: value }))
                            }
                          }}
                          placeholder="123"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <div className="border-t pt-6">
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing || !isHydrated || totalAmount <= 0}
                    className="w-full bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600"
                    size="lg"
                  >
                    {isProcessing ? (
                      "İşleniyor..."
                    ) : !isHydrated ? (
                      "Yükleniyor..."
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Ödemeyi Tamamla ({totalAmount.toFixed(2)} TL)
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-2">
                    Güvenli ödeme Sipay altyapısı ile sağlanmaktadır
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
