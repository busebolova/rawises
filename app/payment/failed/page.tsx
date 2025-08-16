"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { XCircle, RefreshCw, CreditCard, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PaymentFailedPage() {
  const searchParams = useSearchParams()
  const [failureDetails, setFailureDetails] = useState<any>(null)

  useEffect(() => {
    // URL parametrelerinden hata bilgilerini al
    const merchantOid = searchParams.get("merchant_oid")
    const failedReasonCode = searchParams.get("failed_reason_code")
    const failedReasonMsg = searchParams.get("failed_reason_msg")

    setFailureDetails({
      orderId: merchantOid,
      reasonCode: failedReasonCode,
      reasonMsg: failedReasonMsg || "Ödeme işlemi tamamlanamadı",
      date: new Date().toLocaleDateString("tr-TR"),
      time: new Date().toLocaleTimeString("tr-TR"),
    })
  }, [searchParams])

  const getErrorMessage = (code: string) => {
    const errorMessages: { [key: string]: string } = {
      "01": "Kartınız onaylanmadı. Bankanızla iletişime geçin.",
      "02": "Yetersiz bakiye. Lütfen farklı bir kart deneyin.",
      "03": "Kart numarası hatalı. Lütfen kontrol edin.",
      "04": "Kart son kullanma tarihi geçmiş.",
      "05": "CVC kodu hatalı. Lütfen kontrol edin.",
      "06": "İşlem limiti aşıldı. Bankanızla iletişime geçin.",
      "07": "3D Secure doğrulama başarısız.",
      "08": "Kart bloke durumda. Bankanızla iletişime geçin.",
      "09": "İşlem zaman aşımına uğradı. Tekrar deneyin.",
      "10": "Sistem hatası. Lütfen tekrar deneyin.",
    }
    return errorMessages[code] || "Bilinmeyen hata oluştu."
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ödeme İşlemi Başarısız</h1>
          <p className="text-gray-600">Ödemeniz tamamlanamadı. Lütfen bilgilerinizi kontrol edip tekrar deneyin.</p>
        </div>

        {failureDetails && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>İşlem Detayları</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {failureDetails.orderId && (
                  <div>
                    <p className="text-sm text-gray-600">Sipariş Numarası</p>
                    <p className="font-semibold">{failureDetails.orderId}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Hata Açıklaması</p>
                  <p className="font-semibold text-red-600">
                    {failureDetails.reasonCode ? getErrorMessage(failureDetails.reasonCode) : failureDetails.reasonMsg}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tarih & Saat</p>
                  <p className="font-semibold">
                    {failureDetails.date} {failureDetails.time}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Badge variant="destructive">Ödeme Başarısız</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Çözüm Önerileri</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Kart bilgilerinizi (numara, son kullanma tarihi, CVC) kontrol edin</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Kartınızda yeterli bakiye olduğundan emin olun</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>İnternet bağlantınızı kontrol edin</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Farklı bir kart ile deneyebilirsiniz</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Sorun devam ederse bankanızla iletişime geçin</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/sepet">
                <RefreshCw className="h-4 w-4 mr-2" />
                Tekrar Dene
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Alışverişe Devam Et</Link>
            </Button>
          </div>

          <div className="pt-6 border-t">
            <p className="text-sm text-gray-600 mb-2">
              Yardıma mı ihtiyacınız var? Müşteri hizmetlerimizle iletişime geçin:
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://wa.me/905073027313?text=Merhaba, ödeme işlemimde sorun yaşıyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 text-sm flex items-center space-x-1"
              >
                <Phone className="h-4 w-4" />
                <span>WhatsApp Destek</span>
              </a>
              <a
                href="tel:+905073027313"
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
              >
                <Phone className="h-4 w-4" />
                <span>+90 507 302 73 13</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
