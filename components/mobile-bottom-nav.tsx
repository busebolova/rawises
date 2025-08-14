"use client"

import type React from "react"
import { useState } from "react"
import { Home, Search, Heart, User, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

interface CategoryData {
  name: string
  subcategories: string[]
}

export function MobileBottomNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Statik kategoriler - CSV analizine göre güncellenecek
  const categories: CategoryData[] = [
    {
      name: "Makyaj",
      subcategories: ["Yüz Makyajı", "Göz Makyajı", "Dudak Makyajı", "Kaş Makyajı", "Tırnak Bakımı"],
    },
    {
      name: "Cilt Bakım",
      subcategories: ["Temizlik", "Nemlendirici", "Serum", "Maske", "Güneş Koruyucu"],
    },
    {
      name: "Saç Bakım",
      subcategories: ["Şampuan", "Saç Kremi", "Saç Maskesi", "Styling"],
    },
    {
      name: "Parfüm",
      subcategories: ["Kadın Parfüm", "Erkek Parfüm", "Deodorant"],
    },
    {
      name: "Kişisel Bakım",
      subcategories: ["Vücut Bakımı", "El Bakımı", "Ağız Bakımı"],
    },
    {
      name: "Erkek Bakım",
      subcategories: ["Cilt Bakımı", "Saç Bakımı", "Tıraş"],
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log("Mobil arama yapılıyor:", searchQuery)
      const searchUrl = `/search?q=${encodeURIComponent(searchQuery.trim())}`
      window.location.href = searchUrl
      setIsSearchOpen(false)
    }
  }

  const handleCategoryClick = (category: string, subcategory?: string) => {
    console.log(`Mobil kategori seçildi: ${category}${subcategory ? ` > ${subcategory}` : ""}`)

    const categoryParam = encodeURIComponent(category.toLowerCase())
    const subcategoryParam = subcategory ? `&subcategory=${encodeURIComponent(subcategory.toLowerCase())}` : ""

    const categoryUrl = `/category?category=${categoryParam}${subcategoryParam}`
    window.location.href = categoryUrl
    setIsCategoriesOpen(false)
  }

  return (
    <>
      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="grid grid-cols-5 h-16">
          {/* Home */}
          <Link href="/">
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center h-full rounded-none hover:bg-rawises-50 w-full"
            >
              <Home className="w-5 h-5 text-rawises-600" />
              <span className="text-xs text-rawises-600 mt-1">Ana Sayfa</span>
            </Button>
          </Link>

          {/* Categories */}
          <Sheet open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center h-full rounded-none hover:bg-rawises-50 w-full"
              >
                <Grid3X3 className="w-5 h-5 text-rawises-600" />
                <span className="text-xs text-rawises-600 mt-1">Kategoriler</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b bg-rawises-50">
                  <h2 className="text-lg font-semibold text-rawises-800">Kategoriler</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {categories.map((category) => (
                    <div key={category.name} className="border-b">
                      <div
                        className="p-4 font-medium text-rawises-800 bg-gray-50 cursor-pointer hover:bg-rawises-50"
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        {category.name}
                      </div>
                      <div className="pb-2">
                        {category.subcategories.map((subcategory) => (
                          <div
                            key={subcategory}
                            className="px-6 py-3 text-sm text-rawises-600 hover:bg-rawises-50 cursor-pointer border-b border-gray-100"
                            onClick={() => handleCategoryClick(category.name, subcategory)}
                          >
                            {subcategory}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Search */}
          <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center h-full rounded-none hover:bg-rawises-50 w-full"
              >
                <Search className="w-5 h-5 text-rawises-600" />
                <span className="text-xs text-rawises-600 mt-1">Arama</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="h-auto p-0">
              <div className="p-4 bg-white">
                <h2 className="text-lg font-semibold text-rawises-800 mb-4">Ürün Ara</h2>
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Ürün, marka arayın..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-20 py-3 w-full border-rawises-200 focus:border-rawises-500 focus:ring-rawises-500 text-base"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-rawises-600 hover:bg-rawises-700"
                  >
                    Ara
                  </Button>
                </form>

                {/* Popular searches */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Popüler Aramalar</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Ruj", "Fondöten", "Maskara", "Parfüm", "Nemlendirici", "Şampuan", "Serum"].map((term) => (
                      <Button
                        key={term}
                        variant="outline"
                        size="sm"
                        className="text-xs border-rawises-200 text-rawises-600 hover:bg-rawises-50 bg-transparent"
                        onClick={() => {
                          setSearchQuery(term)
                          const searchUrl = `/search?q=${encodeURIComponent(term)}`
                          window.location.href = searchUrl
                          setIsSearchOpen(false)
                        }}
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Favorites */}
          <Link href="/favorites">
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center h-full rounded-none hover:bg-rawises-50 w-full"
            >
              <Heart className="w-5 h-5 text-rawises-600" />
              <span className="text-xs text-rawises-600 mt-1">Favoriler</span>
            </Button>
          </Link>

          {/* Profile */}
          <Link href="/profile">
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center h-full rounded-none hover:bg-rawises-50 w-full"
            >
              <User className="w-5 h-5 text-rawises-600" />
              <span className="text-xs text-rawises-600 mt-1">Profil</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="md:hidden h-16"></div>
    </>
  )
}
