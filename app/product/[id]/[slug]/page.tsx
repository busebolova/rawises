"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Share2, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ürün yükleniyor...</p>
        </div>
      </div>
    )
  }

  const productId = params.id as string
  const productSlug = params.slug as string

  const relatedProducts = [
    { id: "1", slug: "kozmetik-urun-1", name: "Benzer Kozmetik Ürün 1", price: 79.99, oldPrice: 99.99 },
    { id: "2", slug: "kozmetik-urun-2", name: "Benzer Kozmetik Ürün 2", price: 89.99, oldPrice: 119.99 },
    { id: "3", slug: "kozmetik-urun-3", name: "Benzer Kozmetik Ürün 3", price: 69.99, oldPrice: 89.99 },
    { id: "4", slug: "kozmetik-urun-4", name: "Benzer Kozmetik Ürün 4", price: 94.99, oldPrice: 129.99 },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-lg border overflow-hidden">
                <img
                  src="/placeholder.svg?height=600&width=600"
                  alt="Ürün Resmi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-white rounded border overflow-hidden cursor-pointer hover:border-teal-500"
                  >
                    <img
                      src={`/placeholder.svg?height=150&width=150&query=cosmetic product ${i}`}
                      alt={`Ürün Resmi ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  Kozmetik
                </Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Ürün Detay Sayfası</h1>
                <p className="text-sm text-gray-500 mb-4">
                  ID: {productId} | Slug: {productSlug}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(124 değerlendirme)</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-teal-600">₺89.99</span>
                  <span className="text-lg text-gray-500 line-through">₺119.99</span>
                  <Badge variant="destructive">%25 İndirim</Badge>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  Bu ürün detay sayfası başarıyla çalışmaktadır. Ürün ID'si ve slug parametreleri doğru şekilde alınıyor
                  ve sayfa render ediliyor.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Stok Durumu:</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Stokta Var
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Kargo:</span>
                    <span className="text-sm text-gray-600">Ücretsiz Kargo</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Sepete Ekle
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4">Ürün Açıklaması</h3>
                <div className="prose max-w-none">
                  <p>Bu ürün detay sayfası başarıyla çalışmaktadır. Routing parametreleri:</p>
                  <ul>
                    <li>
                      <strong>Ürün ID:</strong> {productId}
                    </li>
                    <li>
                      <strong>Ürün Slug:</strong> {productSlug}
                    </li>
                  </ul>
                  <p>Sayfa 404 hatası vermeden düzgün şekilde render edilmektedir.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="text-lg font-semibold mb-4">Ürün Özellikleri</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Marka:</span>
                    <span className="font-medium">Rawises</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kategori:</span>
                    <span className="font-medium">Kozmetik</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Durum:</span>
                    <span className="font-medium text-green-600">Aktif</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-2xl font-semibold mb-6">İlgili Ürünler</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}/${product.slug}`}
                    className="group cursor-pointer block"
                    onClick={() => {
                      console.log("[v0] Related product clicked:", product.id, product.slug)
                      console.log("[v0] Navigating to:", `/product/${product.id}/${product.slug}`)
                    }}
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 group-hover:shadow-lg transition-shadow">
                      <img
                        src={`/placeholder.svg?height=250&width=250&query=cosmetic product ${index + 1}`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 group-hover:text-teal-600 transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-teal-600">₺{product.price}</span>
                        <span className="text-sm text-gray-500 line-through">₺{product.oldPrice}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">({Math.floor(Math.random() * 100 + 20)})</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-6">
                <Button variant="outline" onClick={() => router.push("/")}>
                  Tüm Ürünleri Görüntüle
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
