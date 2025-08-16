"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-rawises-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-rawises-800 mb-2">Sayfa Bulunamadı</h2>
          <p className="text-gray-600 mb-8">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-rawises-600 hover:bg-rawises-700">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Ana Sayfaya Dön
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri Dön
          </Button>
        </div>
      </div>
    </div>
  )
}
