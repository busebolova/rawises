"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, ShoppingCart, User, Menu, X, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { CartSidebar } from "@/components/cart-sidebar"
import { useCartStore } from "@/lib/cart-store"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { totalItems } = useCartStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.dispatchEvent(new CustomEvent("searchProducts", { detail: { query: searchQuery } }))
    } else {
      window.dispatchEvent(new CustomEvent("clearSearch"))
    }
  }

  const handleCategoryClick = (category: string, subcategory?: string, csvCategory?: string) => {
    window.dispatchEvent(
      new CustomEvent("categoryFilter", {
        detail: { category, subcategory, csvCategory: csvCategory || subcategory || category },
      }),
    )
    setIsMobileMenuOpen(false)
  }

  const clearSearch = () => {
    setSearchQuery("")
    window.dispatchEvent(new CustomEvent("clearSearch"))
  }

  // Mobil menü kapatma
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      {/* Top Bar - Sadece desktop */}
      <div className="hidden lg:block bg-rawises-50 border-b border-rawises-100">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-rawises-700">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+90 507 302 73 13</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@rawises.com</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/musteri-hizmetleri" className="hover:text-rawises-900 transition-colors">
                Müşteri Hizmetleri
              </Link>
              <Link href="/sss" className="hover:text-rawises-900 transition-colors">
                SSS
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-rawises-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/rawises-logo.png"
                alt="Rawises"
                width={120}
                height={40}
                className="h-8 lg:h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="flex w-full">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Ürün, marka veya kategori ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-rawises-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rawises-500 focus:border-transparent"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600 rounded-l-none px-6"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Mobile Search */}
            <div className="flex-1 lg:hidden">
              <form onSubmit={handleSearch} className="flex">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-rawises-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rawises-500"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-gradient-to-r from-rawises-600 to-brand-500 rounded-l-none px-3"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Desktop User Menu */}
              <div className="hidden lg:block">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-rawises-50 data-[state=open]:bg-rawises-50">
                        <User className="w-4 h-4 mr-2" />
                        Hesabım
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-48 p-2">
                          <Link
                            href="/auth/login"
                            className="block px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                          >
                            Giriş Yap
                          </Link>
                          <Link
                            href="/auth/register"
                            className="block px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                          >
                            Üye Ol
                          </Link>
                          <div className="border-t border-rawises-100 my-2"></div>
                          <Link
                            href="/hesabim"
                            className="block px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                          >
                            Hesabım
                          </Link>
                          <Link
                            href="/siparislerim"
                            className="block px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                          >
                            Siparişlerim
                          </Link>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              {/* Mobile User Button */}
              <Button variant="ghost" size="sm" className="lg:hidden p-2">
                <User className="w-5 h-5" />
              </Button>

              {/* Cart Button */}
              <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(true)} className="relative p-2">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-accent-500 hover:bg-accent-600 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0">
                    {totalItems}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block border-t border-rawises-100">
          <div className="container mx-auto px-4">
            <div className="relative">
              <NavigationMenu className="max-w-none">
                <NavigationMenuList className="flex-nowrap justify-start gap-0 overflow-x-auto">
                  {/* Anne & Bebek */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-rawises-50 data-[state=open]:bg-rawises-50 whitespace-nowrap text-sm px-3">
                      Anne & Bebek
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-56 p-3 bg-white">
                        <button
                          onClick={() => handleCategoryClick("Anne & Bebek", "Bebek Bakım")}
                          className="block w-full text-left px-3 py-2.5 text-sm hover:bg-rawises-50 rounded-md transition-colors duration-200 focus:bg-rawises-100 focus:outline-none"
                        >
                          Bebek Bakım
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Anne & Bebek", "Emzik & Biberon")}
                          className="block w-full text-left px-3 py-2.5 text-sm hover:bg-rawises-50 rounded-md transition-colors duration-200 focus:bg-rawises-100 focus:outline-none"
                        >
                          Emzik & Biberon
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Anne & Bebek")}
                          className="block w-full text-left px-3 py-2.5 text-sm hover:bg-rawises-50 rounded-md transition-colors duration-200 focus:bg-rawises-100 focus:outline-none font-medium border-t border-rawises-100 mt-2 pt-2"
                        >
                          Tüm Anne & Bebek
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Ağız Bakım */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-rawises-50 data-[state=open]:bg-rawises-50 whitespace-nowrap text-sm px-3">
                      Ağız Bakım
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-56 p-3 bg-white">
                        <button
                          onClick={() => handleCategoryClick("Ağız Bakım", "Diş Fırçası")}
                          className="block w-full text-left px-3 py-2.5 text-sm hover:bg-rawises-50 rounded-md transition-colors duration-200 focus:bg-rawises-100 focus:outline-none"
                        >
                          Diş Fırçaları
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Ağız Bakım", "Diş Macunu")}
                          className="block w-full text-left px-3 py-2.5 text-sm hover:bg-rawises-50 rounded-md transition-colors duration-200 focus:bg-rawises-100 focus:outline-none"
                        >
                          Diş Macunları
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Ağız Bakım", "Ağız Suyu")}
                          className="block w-full text-left px-3 py-2.5 text-sm hover:bg-rawises-50 rounded-md transition-colors duration-200 focus:bg-rawises-100 focus:outline-none"
                        >
                          Ağız Suları
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Ağız Bakım")}
                          className="block w-full text-left px-3 py-2.5 text-sm hover:bg-rawises-50 rounded-md transition-colors duration-200 focus:bg-rawises-100 focus:outline-none font-medium border-t border-rawises-100 mt-2 pt-2"
                        >
                          Tüm Ağız Bakım
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Cilt Bakımı */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-rawises-50 data-[state=open]:bg-rawises-50 whitespace-nowrap text-sm px-3">
                      Cilt Bakımı
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-48 p-2">
                        <button
                          onClick={() => handleCategoryClick("Cilt Bakımı", "Yüz Bakımı")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Yüz Bakımı
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Cilt Bakımı", "Vücut Bakımı")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Vücut Bakımı
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Cilt Bakımı", "Güneş")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Güneş Ürünleri
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Cilt Bakımı")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors font-medium border-t border-rawises-100 mt-2 pt-2"
                        >
                          Tüm Cilt Bakımı
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Kişisel Bakım */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-rawises-50 data-[state=open]:bg-rawises-50 whitespace-nowrap text-sm px-3">
                      Kişisel Bakım
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-48 p-2">
                        <button
                          onClick={() => handleCategoryClick("Kişisel Bakım", "Tırnak")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Tırnak Bakımı
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Kişisel Bakım", "Banyo")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Banyo & Vücut
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Kişisel Bakım")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors font-medium border-t border-rawises-100 mt-2 pt-2"
                        >
                          Tüm Kişisel Bakım
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Parfüm & Deodorant */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-rawises-50 data-[state=open]:bg-rawises-50 whitespace-nowrap text-sm px-3">
                      Parfüm & Deodorant
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-48 p-2">
                        <button
                          onClick={() => handleCategoryClick("Parfüm", "Kadın Deodorant")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Kadın Deodorant
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Parfüm", "Erkek Deodorant")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Erkek Deodorant
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Parfüm", "Parfüm")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Parfüm
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Parfüm")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors font-medium border-t border-rawises-100 mt-2 pt-2"
                        >
                          Tüm Parfüm & Deodorant
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Saç Bakımı */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-rawises-50 data-[state=open]:bg-rawises-50 whitespace-nowrap text-sm px-3">
                      Saç Bakımı
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-48 p-2">
                        <button
                          onClick={() => handleCategoryClick("Saç", "Şampuan")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Şampuan
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Saç", "Fırça")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Saç Fırçaları
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Saç", "Krem")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Saç Kremi
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Saç")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors font-medium border-t border-rawises-100 mt-2 pt-2"
                        >
                          Tüm Saç Bakımı
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Makyaj */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-rawises-50 data-[state=open]:bg-rawises-50 whitespace-nowrap text-sm px-3">
                      Makyaj
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-48 p-2">
                        <button
                          onClick={() => handleCategoryClick("Makyaj", "Ruj")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Ruj
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Makyaj", "Maskara")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Maskara
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Makyaj", "Fondöten")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Fondöten
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Makyaj", "Allık")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Allık
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Makyaj")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors font-medium border-t border-rawises-100 mt-2 pt-2"
                        >
                          Tüm Makyaj
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Erkek Bakım */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-rawises-50 data-[state=open]:bg-rawises-50 whitespace-nowrap text-sm px-3">
                      Erkek Bakım
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-48 p-2">
                        <button
                          onClick={() => handleCategoryClick("Erkek", "Tıraş")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Tıraş Ürünleri
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Erkek", "Sakal")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors"
                        >
                          Sakal Bakımı
                        </button>
                        <button
                          onClick={() => handleCategoryClick("Erkek")}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-rawises-50 rounded-md transition-colors font-medium border-t border-rawises-100 mt-2 pt-2"
                        >
                          Tüm Erkek Bakım
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-rawises-100 bg-white">
            <div className="container mx-auto px-4 py-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                {/* User Menu Mobile */}
                <div className="border-b border-rawises-100 pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-rawises-600" />
                    <span className="font-medium text-rawises-800">Hesabım</span>
                  </div>
                  <div className="space-y-2 ml-7">
                    <Link
                      href="/auth/login"
                      className="block text-sm text-rawises-600 hover:text-rawises-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Giriş Yap
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block text-sm text-rawises-600 hover:text-rawises-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Üye Ol
                    </Link>
                  </div>
                </div>

                {/* Categories Mobile */}
                <div className="space-y-3">
                  {/* Anne & Bebek */}
                  <div>
                    <button
                      onClick={() => handleCategoryClick("Anne & Bebek")}
                      className="flex items-center justify-between w-full text-left font-medium text-rawises-800 py-2"
                    >
                      Anne & Bebek
                    </button>
                    <div className="ml-4 space-y-2">
                      <button
                        onClick={() => handleCategoryClick("Anne & Bebek", "Bebek Bakım")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Bebek Bakım
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Anne & Bebek", "Emzik & Biberon")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Emzik & Biberon
                      </button>
                    </div>
                  </div>

                  {/* Ağız Bakım */}
                  <div>
                    <button
                      onClick={() => handleCategoryClick("Ağız Bakım")}
                      className="flex items-center justify-between w-full text-left font-medium text-rawises-800 py-2"
                    >
                      Ağız Bakım
                    </button>
                    <div className="ml-4 space-y-2">
                      <button
                        onClick={() => handleCategoryClick("Ağız Bakım", "Diş Fırçası")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Diş Fırçaları
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Ağız Bakım", "Diş Macunu")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Diş Macunları
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Ağız Bakım", "Ağız Suyu")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Ağız Suları
                      </button>
                    </div>
                  </div>

                  {/* Cilt Bakımı */}
                  <div>
                    <button
                      onClick={() => handleCategoryClick("Cilt Bakımı")}
                      className="flex items-center justify-between w-full text-left font-medium text-rawises-800 py-2"
                    >
                      Cilt Bakımı
                    </button>
                    <div className="ml-4 space-y-2">
                      <button
                        onClick={() => handleCategoryClick("Cilt Bakımı", "Yüz Bakımı")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Yüz Bakımı
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Cilt Bakımı", "Vücut Bakımı")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Vücut Bakımı
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Cilt Bakımı", "Güneş")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Güneş Ürünleri
                      </button>
                    </div>
                  </div>

                  {/* Makyaj */}
                  <div>
                    <button
                      onClick={() => handleCategoryClick("Makyaj")}
                      className="flex items-center justify-between w-full text-left font-medium text-rawises-800 py-2"
                    >
                      Makyaj
                    </button>
                    <div className="ml-4 space-y-2">
                      <button
                        onClick={() => handleCategoryClick("Makyaj", "Ruj")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Ruj
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Makyaj", "Maskara")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Maskara
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Makyaj", "Fondöten")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Fondöten
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Makyaj", "Allık")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Allık
                      </button>
                    </div>
                  </div>

                  {/* Saç Bakımı */}
                  <div>
                    <button
                      onClick={() => handleCategoryClick("Saç")}
                      className="flex items-center justify-between w-full text-left font-medium text-rawises-800 py-2"
                    >
                      Saç Bakımı
                    </button>
                    <div className="ml-4 space-y-2">
                      <button
                        onClick={() => handleCategoryClick("Saç", "Şampuan")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Şampuan
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Saç", "Fırça")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Saç Fırçaları
                      </button>
                    </div>
                  </div>

                  {/* Erkek Bakım */}
                  <div>
                    <button
                      onClick={() => handleCategoryClick("Erkek")}
                      className="flex items-center justify-between w-full text-left font-medium text-rawises-800 py-2"
                    >
                      Erkek Bakım
                    </button>
                    <div className="ml-4 space-y-2">
                      <button
                        onClick={() => handleCategoryClick("Erkek", "Tıraş")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Tıraş Ürünleri
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Erkek", "Sakal")}
                        className="block text-sm text-rawises-600 hover:text-rawises-800"
                      >
                        Sakal Bakımı
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Contact Info */}
                <div className="border-t border-rawises-100 pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-rawises-600">
                    <Phone className="w-4 h-4" />
                    <span>+90 507 302 73 13</span>
                  </div>
                  <Link
                    href="/musteri-hizmetleri"
                    className="block text-sm text-rawises-600 hover:text-rawises-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Müşteri Hizmetleri
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
