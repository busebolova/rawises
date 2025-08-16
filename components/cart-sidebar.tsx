"use client"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { PaymentModal } from "@/components/payment-modal"
import { useState } from "react"
import Image from "next/image"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore()
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  if (!isOpen) return null

  const handleCheckout = () => {
    setIsPaymentModalOpen(true)
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Sepetim</h2>
              <Badge variant="secondary">{totalItems}</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Sepetiniz boş</p>
                <p className="text-sm text-gray-400">Ürün eklemek için alışverişe başlayın</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="object-cover rounded sm:w-[60px] sm:h-[60px]"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=50&width=50"
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs sm:text-sm font-medium line-clamp-2">{item.name}</h3>
                      <p className="text-xs text-gray-500 truncate">{item.brand}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-purple-600">{item.discountPrice} TL</span>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-6 sm:w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700 p-1"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Toplam:</span>
                <span className="text-xl font-bold text-purple-600">{totalPrice.toFixed(2)} TL</span>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600"
                  onClick={handleCheckout}
                >
                  Sepeti Onayla
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
                  Sepeti Temizle
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
    </>
  )
}
