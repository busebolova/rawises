"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Product } from "@/lib/csv-parser"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [product, setProduct] = useState<Product | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    sku: "",
    barcode: "",
    categories: "",
    tags: "",
    salePrice: "",
    discountPrice: "",
    purchasePrice: "",
    stockMainWarehouse: "",
    stockAdana: "",
    metaTitle: "",
    metaDescription: "",
    isActive: true,
  })

  useEffect(() => {
    const loadProduct = async () => {
      try {
        console.log("[v0] Loading product with ID:", params.id)
        const response = await fetch(`/api/admin/products/${params.id}`)
        console.log("[v0] API response status:", response.status)

        const data = await response.json()
        console.log("[v0] API response data:", data)

        if (data.product) {
          const p = data.product
          console.log("[v0] Product found:", p)
          setProduct(p)
          setFormData({
            name: p.name || "",
            description: p.description || "",
            brand: p.brand || "",
            sku: p.sku || "",
            barcode: p.barcode || "",
            categories: p.categories || "",
            tags: p.tags || "",
            salePrice: p.salePrice?.toString() || "",
            discountPrice: p.discountPrice?.toString() || "",
            purchasePrice: p.purchasePrice?.toString() || "",
            stockMainWarehouse: p.stockMainWarehouse?.toString() || "",
            stockAdana: p.stockAdana?.toString() || "",
            metaTitle: p.metaTitle || "",
            metaDescription: p.metaDescription || "",
            isActive: p.isActive ?? true,
          })
          setImagePreview(p.imageUrl || "")
          console.log("[v0] Form data set:", formData)
        } else {
          console.log("[v0] No product found in response")
        }
        setLoading(false)
      } catch (error) {
        console.error("[v0] Error loading product:", error)
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      if (!formData.name || !formData.brand || !formData.sku || !formData.salePrice) {
        alert("Lütfen zorunlu alanları doldurun")
        setSaving(false)
        return
      }

      const productData = {
        ...formData,
        salePrice: Number.parseFloat(formData.salePrice) || 0,
        discountPrice: Number.parseFloat(formData.discountPrice) || 0,
        purchasePrice: Number.parseFloat(formData.purchasePrice) || 0,
        stockMainWarehouse: Number.parseInt(formData.stockMainWarehouse) || 0,
        stockAdana: Number.parseInt(formData.stockAdana) || 0,
        slug: formData.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
        imageUrl: imagePreview || "/placeholder.svg?height=200&width=200",
      }

      const response = await fetch(`/api/admin/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        alert("Ürün başarıyla güncellendi!")
        router.push("/admin/products")
      } else {
        throw new Error("Failed to update product")
      }
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Ürün güncellenirken hata oluştu")
    } finally {
      setSaving(false)
    }
  }

  const categories = [
    "Makyaj > Ruj",
    "Makyaj > Maskara",
    "Makyaj > Fondöten",
    "Cilt Bakımı > Nemlendirici",
    "Cilt Bakımı > Temizleyici",
    "Saç Bakımı > Şampuan",
    "Saç Bakımı > Saç Kremi",
    "Parfüm > Kadın",
    "Parfüm > Erkek",
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Ürün bulunamadı</p>
          <Button onClick={() => router.back()} className="mt-4">
            Geri Dön
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Geri Dön
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ürün Düzenle</h1>
          <p className="text-muted-foreground">{product.name} ürününü düzenleyin</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Temel Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Ürün Adı *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Ürün adını girin"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Marka *</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                    placeholder="Marka adını girin"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Ürün açıklamasını girin"
                  rows={4}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                    placeholder="SKU kodu"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="barcode">Barkod</Label>
                  <Input
                    id="barcode"
                    value={formData.barcode}
                    onChange={(e) => handleInputChange("barcode", e.target.value)}
                    placeholder="Barkod numarası"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categories">Kategori *</Label>
                  <Select value={formData.categories} onValueChange={(value) => handleInputChange("categories", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Etiketler</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  placeholder="Etiketleri virgülle ayırın"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Fiyatlandırma</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="purchasePrice">Alış Fiyatı</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={formData.purchasePrice}
                    onChange={(e) => handleInputChange("purchasePrice", e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salePrice">Satış Fiyatı *</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) => handleInputChange("salePrice", e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountPrice">İndirimli Fiyat</Label>
                  <Input
                    id="discountPrice"
                    type="number"
                    value={formData.discountPrice}
                    onChange={(e) => handleInputChange("discountPrice", e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stock */}
          <Card>
            <CardHeader>
              <CardTitle>Stok Bilgileri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="stockMainWarehouse">Ana Depo Stoku</Label>
                  <Input
                    id="stockMainWarehouse"
                    type="number"
                    value={formData.stockMainWarehouse}
                    onChange={(e) => handleInputChange("stockMainWarehouse", e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stockAdana">Adana Depo Stoku</Label>
                  <Input
                    id="stockAdana"
                    type="number"
                    value={formData.stockAdana}
                    onChange={(e) => handleInputChange("stockAdana", e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Başlık</Label>
                <Input
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                  placeholder="SEO için meta başlık"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Açıklama</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                  placeholder="SEO için meta açıklama"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>İşlemler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Ürün Aktif</Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Button onClick={handleSave} disabled={saving} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Güncelleniyor..." : "Güncelle"}
                </Button>
                <Button variant="outline" onClick={() => router.back()} className="w-full">
                  İptal
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Ürün Görseli</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {imagePreview ? (
                <div className="relative">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <Image src={imagePreview || "/placeholder.svg"} alt="Ürün görseli" fill className="object-cover" />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setImagePreview("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Görsel yükleyin</p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span>Dosya Seç</span>
                    </Button>
                  </Label>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
