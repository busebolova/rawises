"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function PaymentReturnPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const status = searchParams.get("status")
    const orderId = searchParams.get("merchant_oid")

    setTimeout(() => {
      if (status === "success") {
        router.push(`/payment/success?orderId=${orderId}`)
      } else {
        router.push(`/payment/failed?orderId=${orderId}`)
      }
    }, 2000)
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Ödeme İşleniyor</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Ödemeniz işleniyor, lütfen bekleyiniz...</p>
        </CardContent>
      </Card>
    </div>
  )
}
