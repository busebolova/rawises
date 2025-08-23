import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function ProductNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-teal-600">404</h1>
          <h2 className="text-3xl font-semibold text-slate-800">Ürün Bulunamadı</h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Ana Sayfaya Dön
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ürünlere Gözat
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
