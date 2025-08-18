"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, Truck, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    // URL parametrelerinden sipariş bilgilerini al
    const merchantOid = searchParams.get("merchant_oid")
    const totalAmount = searchParams.get("total_amount")
    const paymentType = searchParams.get("payment_type")

    if (merchantOid) {
      setOrderDetails({
        orderId: merchantOid,
        amount: totalAmount ? (Number.parseInt(totalAmount) / 100).toFixed(2) : "0.00",
        paymentType: paymentType || "Kredi Kartı",
        date: new Date().toLocaleDateString("tr-TR"),
        time: new Date().toLocaleTimeString("tr-TR"),
      })
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ödemeniz Başarıyla Tamamlandı!</h1>
          <p className="text-gray-600">
            Siparişiniz alındı ve işleme konuldu. Kısa süre içinde kargo hazırlığına başlanacak.
          </p>
        </div>

        {orderDetails && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Sipariş Detayları</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Sipariş Numarası</p>
                  <p className="font-semibold">{orderDetails.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Toplam Tutar</p>
                  <p className="font-semibold">{orderDetails.amount} TL</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ödeme Yöntemi</p>
                  <p className="font-semibold">{orderDetails.paymentType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tarih & Saat</p>
                  <p className="font-semibold">
                    {orderDetails.date} {orderDetails.time}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Ödeme Tamamlandı
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Truck className="h-6 w-6 text-blue-500" />
                <h3 className="font-semibold">Kargo Bilgileri</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Siparişiniz 1-2 iş günü içinde kargoya verilecek.</p>
              <p className="text-sm text-gray-600">Kargo takip numaranız e-posta ile gönderilecek.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <CreditCard className="h-6 w-6 text-green-500" />
                <h3 className="font-semibold">Fatura Bilgileri</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">E-faturanız e-posta adresinize gönderildi.</p>
              <p className="text-sm text-gray-600">Hesabım bölümünden faturalarınızı görüntüleyebilirsiniz.</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/siparislerim">Siparişlerimi Görüntüle</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Alışverişe Devam Et</Link>
            </Button>
          </div>

          <div className="pt-6 border-t">
            <p className="text-sm text-gray-600 mb-2">
              Sorularınız için müşteri hizmetlerimizle iletişime geçebilirsiniz:
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://wa.me/905073027313?text=Merhaba, sipariş numaramı: {orderDetails?.orderId}"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 text-sm"
              >
                WhatsApp Destek
              </a>
              <a href="tel:+905073027313" className="text-blue-600 hover:text-blue-700 text-sm">
                +90 507 302 73 13
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
