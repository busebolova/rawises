"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, UserIcon, ShoppingCart, ChevronDown, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CartSidebar } from "./cart-sidebar"
import { useCartStore } from "@/lib/cart-store"
import Image from "next/image"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface MenuStructure {
  [key: string]: string[]
}

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState<{ email: string; name: string; phone?: string } | null>(null)

  // Zustand store'dan totalItems'ı doğru şekilde al
  const totalItems = useCartStore((state) => state.totalItems)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // CSV'deki kategorilere göre menü yapısı
  const menuStructure: MenuStructure = {
    "Anne & Bebek": ["Bebek Bakım", "Emzik & Biberon", "Anne Bakım", "Bebek Gıda"],
    "Ağız Bakım": ["Diş Fırçaları", "Diş Macunları", "Ağız Suları", "Diş İpi"],
    "Cilt Bakımı": ["Yüz Bakımı", "Vücut Bakımı", "Güneş Ürünleri", "Epilasyon", "Nemlendirici", "Temizlik"],
    "Kişisel Bakım": ["Tırnak Makası / El Bakımı", "Banyo & Vücut", "Hijyen", "Kişisel Temizlik"],
    "Parfüm & Deodorant": ["Kadın Deodorant Roll-On", "Erkek Deodorant", "Parfüm", "Kolonya"],
    "Saç Bakımı": ["Şampuan", "Fırçalar / Taraklar", "Saç Kremi", "Saç Maskesi", "Saç Spreyi"],
    Makyaj: ["Ruj", "Maskara", "Fondöten", "Allık", "Göz Farı", "Kaş Kalemi", "Eyeliner"],
    "Erkek Bakım": ["Tıraş Ürünleri", "Sakal Bakımı", "Erkek Cilt Bakımı", "After Shave"],
    "Ev & Temizlik": ["Kolonyalar", "Hijyen Ürünleri", "Temizlik", "Dezenfektan"],
  }

  const handleCategoryClick = (category: string, subcategory?: string) => {
    // Kategori filtreleme için event dispatch et - CSV kategorilerine göre
    const filterEvent = new CustomEvent("categoryFilter", {
      detail: {
        category: category,
        subcategory: subcategory,
        // CSV'deki kategori alanına göre filtreleme
        csvCategory: subcategory || category,
      },
    })
    window.dispatchEvent(filterEvent)

    // Mobil menüyü kapat
    setIsMobileMenuOpen(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Arama için event dispatch et
      const searchEvent = new CustomEvent("searchProducts", {
        detail: { query: searchQuery.trim() },
      })
      window.dispatchEvent(searchEvent)
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)

    // Gerçek zamanlı arama
    if (e.target.value.trim()) {
      const searchEvent = new CustomEvent("searchProducts", {
        detail: { query: e.target.value.trim() },
      })
      window.dispatchEvent(searchEvent)
    } else {
      // Arama temizlendiğinde tüm ürünleri göster
      const clearEvent = new CustomEvent("clearSearch")
      window.dispatchEvent(clearEvent)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.location.reload()
  }

  return (
    <>
      <header className="w-full font-poppins sticky top-0 z-50 bg-white">
        {/* Top promotional banner */}
        <div className="bg-gradient-to-r from-rawises-400 to-rawises-600 text-white text-center py-2 text-sm font-medium">
          500 TL ÜZERİ ÜCRETSİZ KARGO
        </div>

        {/* Main header */}
        <div className="border-b bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-2 lg:gap-4">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>

              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/rawises-logo.png"
                  alt="Rawises"
                  width={100}
                  height={32}
                  className="h-8 w-auto lg:h-10"
                  priority
                />
              </Link>

              {/* Search bar - hidden on mobile */}
              <div className="hidden md:flex flex-1 max-w-md mx-4">
                <form onSubmit={handleSearch} className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Ürün, marka arayın..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="pl-10 pr-12 py-2 w-full border-rawises-200 focus:border-rawises-500 focus:ring-rawises-500"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-rawises-600 hover:bg-rawises-700 h-8"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </form>
              </div>

              {/* User actions */}
              <div className="flex items-center gap-1 lg:gap-2">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="hover:bg-rawises-50 hover:text-rawises-700">
                        <UserIcon className="w-4 h-4 mr-1 lg:mr-2" />
                        <span className="hidden lg:inline">{user.name.split(" ")[0]}</span>
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem className="flex flex-col items-start">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-gray-500">{user.email}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserIcon className="w-4 h-4 mr-2" />
                        Hesabım
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Siparişlerim
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        Çıkış Yap
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="hover:bg-rawises-50 hover:text-rawises-700">
                        <UserIcon className="w-4 h-4 mr-1 lg:mr-2" />
                        <span className="hidden lg:inline">Hesap</span>
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem asChild>
                        <Link href="/auth/login">
                          <UserIcon className="w-4 h-4 mr-2" />
                          Giriş Yap
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/auth/register">
                          <UserIcon className="w-4 h-4 mr-2" />
                          Üye Ol
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative hover:bg-rawises-50 hover:text-rawises-700"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="w-4 h-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">Sepet</span>
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Ürün, marka arayın..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="pl-10 pr-12 py-2 w-full border-rawises-200 focus:border-rawises-500 focus:ring-rawises-500"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-rawises-600 hover:bg-rawises-700 h-8"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Navigation menu */}
        <div className="bg-white border-b relative z-40">
          <div className="container mx-auto px-4">
            {/* Desktop navigation */}
            <div className="hidden lg:flex justify-between items-center py-2">
              {Object.keys(menuStructure).map((mainCategory) => (
                <DropdownMenu key={mainCategory}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-xs xl:text-sm font-medium hover:text-rawises-600 data-[state=open]:text-rawises-600 flex items-center gap-1 px-2 xl:px-3 focus:outline-none focus:ring-0 focus:border-none"
                    >
                      <span className="truncate">{mainCategory}</span>
                      <ChevronDown className="w-3 h-3 flex-shrink-0" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuItem
                      className="hover:bg-rawises-50 hover:text-rawises-700 font-medium focus:outline-none focus:ring-0 cursor-pointer"
                      onClick={() => handleCategoryClick(mainCategory)}
                    >
                      Tüm {mainCategory}
                    </DropdownMenuItem>
                    {menuStructure[mainCategory].map((subCategory) => (
                      <DropdownMenuItem
                        key={subCategory}
                        className="hover:bg-rawises-50 hover:text-rawises-700 focus:outline-none focus:ring-0 cursor-pointer"
                        onClick={() => handleCategoryClick(mainCategory, subCategory)}
                      >
                        {subCategory}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </div>

            {/* Mobile navigation */}
            {isMobileMenuOpen && (
              <div className="lg:hidden border-t bg-white relative z-30">
                <div className="py-4 space-y-3 max-h-96 overflow-y-auto">
                  {!user && (
                    <div className="border-b border-gray-100 pb-3 mb-3">
                      <Link href="/auth/login">
                        <Button variant="ghost" className="w-full justify-start text-rawises-700">
                          <UserIcon className="w-4 h-4 mr-2" />
                          Giriş Yap / Üye Ol
                        </Button>
                      </Link>
                    </div>
                  )}
                  {Object.keys(menuStructure).map((mainCategory) => (
                    <div key={mainCategory} className="border-b border-gray-100 pb-3">
                      <Button
                        variant="ghost"
                        className="font-medium text-rawises-700 mb-2 px-2 w-full justify-start"
                        onClick={() => handleCategoryClick(mainCategory)}
                      >
                        {mainCategory}
                      </Button>
                      <div className="grid grid-cols-1 gap-1 pl-4">
                        {menuStructure[mainCategory].map((subCategory) => (
                          <Button
                            key={subCategory}
                            variant="ghost"
                            size="sm"
                            className="justify-start text-xs hover:bg-rawises-50 hover:text-rawises-700"
                            onClick={() => handleCategoryClick(mainCategory, subCategory)}
                          >
                            {subCategory}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
