"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, ShoppingCart, User, Menu, X, Phone, Mail, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CartSidebar } from "@/components/cart-sidebar"
import { useCartStore } from "@/lib/cart-store"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const { totalItems } = useCartStore()
  const { user, signOut, loading } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Header: Search submitted with query:", searchQuery)
    if (searchQuery.trim()) {
      window.dispatchEvent(new CustomEvent("searchProducts", { detail: { query: searchQuery } }))
    } else {
      window.dispatchEvent(new CustomEvent("clearSearch"))
    }
  }

  const handleCategoryClick = (category: string, subcategory?: string, csvCategory?: string) => {
    console.log("[v0] Header: Category clicked:", { category, subcategory, csvCategory })
    window.dispatchEvent(
      new CustomEvent("categoryFilter", {
        detail: { category, subcategory, csvCategory: csvCategory || subcategory || category },
      }),
    )
    setIsMobileMenuOpen(false)
    setOpenDropdown(null)
  }

  const clearSearch = () => {
    setSearchQuery("")
    window.dispatchEvent(new CustomEvent("clearSearch"))
  }

  const handleLogout = async () => {
    try {
      await signOut()
      setIsMobileMenuOpen(false)
      setUserDropdownOpen(false)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const toggleDropdown = (dropdownName: string) => {
    console.log("[v0] Header: Toggling dropdown:", dropdownName)
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
        setOpenDropdown(null)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest(".dropdown-container")) {
        setOpenDropdown(null)
        setUserDropdownOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    document.addEventListener("click", handleClickOutside)
    return () => {
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const DropdownMenu = ({
    trigger,
    children,
    isOpen,
    onToggle,
  }: {
    trigger: React.ReactNode
    children: React.ReactNode
    isOpen: boolean
    onToggle: () => void
  }) => (
    <div className="relative dropdown-container">
      <button
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
        className="flex items-center gap-1 px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
      >
        {trigger}
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-pink-200 rounded-lg shadow-lg z-50 min-w-48">
          {children}
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Top Bar - Sadece desktop */}
      <div className="hidden lg:block bg-pink-50 border-b border-pink-100">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-pink-700">
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
              <Link href="/musteri-hizmetleri" className="hover:text-pink-900 transition-colors">
                Müşteri Hizmetleri
              </Link>
              <Link href="/sss" className="hover:text-pink-900 transition-colors">
                SSS
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-pink-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img
                src="/rawises-logo.png"
                alt="Rawises"
                className="h-8 lg:h-10 w-auto object-contain"
                onError={(e) => {
                  // Fallback to text logo if image fails to load
                  e.currentTarget.style.display = "none"
                  e.currentTarget.nextElementSibling.style.display = "flex"
                }}
              />
              <div
                className="h-8 lg:h-10 w-auto bg-gradient-to-r from-pink-600 to-purple-500 rounded text-white font-bold text-lg lg:text-xl items-center justify-center px-4 hidden"
                style={{ display: "none" }}
              >
                RAWISES
              </div>
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
                    className="w-full px-4 py-2 border border-pink-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                  className="bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-700 hover:to-purple-600 rounded-l-none px-6"
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
                    className="w-full px-3 py-2 text-sm border border-pink-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                  className="bg-gradient-to-r from-pink-600 to-purple-500 rounded-l-none px-3"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Mobile User Button */}
              <Button variant="ghost" size="sm" className="lg:hidden p-2">
                <User className="w-5 h-5" />
              </Button>

              {/* Cart Button */}
              <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(true)} className="relative p-2">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-blue-500 hover:bg-blue-600 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0">
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
        <div className="hidden lg:block border-t border-pink-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1 py-2">
              {/* Anne & Bebek */}
              <DropdownMenu
                trigger="Anne & Bebek"
                isOpen={openDropdown === "anne-bebek"}
                onToggle={() => toggleDropdown("anne-bebek")}
              >
                <div className="p-2">
                  <button
                    onClick={() => handleCategoryClick("Anne & Bebek", "Bebek Bakım")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Bebek Bakım
                  </button>
                  <button
                    onClick={() => handleCategoryClick("Anne & Bebek", "Emzik & Biberon")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Emzik & Biberon
                  </button>
                  <div className="border-t border-pink-100 my-2"></div>
                  <button
                    onClick={() => handleCategoryClick("Anne & Bebek")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors font-medium"
                  >
                    Tüm Anne & Bebek
                  </button>
                </div>
              </DropdownMenu>

              {/* Ağız Bakım */}
              <DropdownMenu
                trigger="Ağız Bakım"
                isOpen={openDropdown === "agiz-bakim"}
                onToggle={() => toggleDropdown("agiz-bakim")}
              >
                <div className="p-2">
                  <button
                    onClick={() => handleCategoryClick("Ağız Bakım", "Diş Fırçası")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Diş Fırçaları
                  </button>
                  <button
                    onClick={() => handleCategoryClick("Ağız Bakım", "Diş Macunu")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Diş Macunları
                  </button>
                  <button
                    onClick={() => handleCategoryClick("Ağız Bakım", "Ağız Suyu")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Ağız Suları
                  </button>
                  <div className="border-t border-pink-100 my-2"></div>
                  <button
                    onClick={() => handleCategoryClick("Ağız Bakım")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors font-medium"
                  >
                    Tüm Ağız Bakım
                  </button>
                </div>
              </DropdownMenu>

              {/* Cilt Bakımı */}
              <DropdownMenu
                trigger="Cilt Bakımı"
                isOpen={openDropdown === "cilt-bakimi"}
                onToggle={() => toggleDropdown("cilt-bakimi")}
              >
                <div className="p-2">
                  <button
                    onClick={() => handleCategoryClick("Cilt Bakımı", "Yüz Bakımı")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Yüz Bakımı
                  </button>
                  <button
                    onClick={() => handleCategoryClick("Cilt Bakımı", "Vücut Bakımı")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Vücut Bakımı
                  </button>
                  <button
                    onClick={() => handleCategoryClick("Cilt Bakımı", "Güneş")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Güneş Ürünleri
                  </button>
                  <div className="border-t border-pink-100 my-2"></div>
                  <button
                    onClick={() => handleCategoryClick("Cilt Bakımı")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors font-medium"
                  >
                    Tüm Cilt Bakımı
                  </button>
                </div>
              </DropdownMenu>

              {/* Kişisel Bakım */}
              <DropdownMenu
                trigger="Kişisel Bakım"
                isOpen={openDropdown === "kisisel-bakim"}
                onToggle={() => toggleDropdown("kisisel-bakim")}
              >
                <div className="p-2">
                  <button
                    onClick={() => handleCategoryClick("Kişisel Bakım", "Tırnak")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Tırnak Bakımı
                  </button>
                  <button
                    onClick={() => handleCategoryClick("Kişisel Bakım", "Banyo")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Banyo & Vücut
                  </button>
                  <div className="border-t border-pink-100 my-2"></div>
                  <button
                    onClick={() => handleCategoryClick("Kişisel Bakım")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors font-medium"
                  >
                    Tüm Kişisel Bakım
                  </button>
                </div>
              </DropdownMenu>

              {/* Parfüm & Deodorant */}
              <DropdownMenu
                trigger="Parfüm & Deodorant"
                isOpen={openDropdown === "parfum-deodorant"}
                onToggle={() => toggleDropdown("parfum-deodorant")}
              >
                <div className="p-2">
                  <button
                    onClick={() => handleCategoryClick("Parfüm", "Kadın Deodorant")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Kadın Deodorant
                  </button>
                  <button
                    onClick={() => handleCategoryClick("Parfüm", "Erkek Deodorant")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Erkek Deodorant
                  </button>
                  <button
                    onClick={() => handleCategoryClick("Parfüm", "Parfüm")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Parfüm
                  </button>
                  <div className="border-t border-pink-100 my-2"></div>
                  <button
                    onClick={() => handleCategoryClick("Parfüm")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors font-medium"
                  >
                    Tüm Parfüm & Deodorant
                  </button>
                </div>
              </DropdownMenu>

              {/* Saç Bakımı */}
              <DropdownMenu
                trigger="Saç Bakımı"
                isOpen={openDropdown === "sac-bakimi"}
                onToggle={() => toggleDropdown("sac-bakimi")}
              >
                <div className="p-2">
                  <button
                    onClick={() => handleCategoryClick("Saç", "Şampuan")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Şampuan
                  </button>
                  <button
                    onClick={() => handleCategoryClick("Saç", "Fırça")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Saç Fırçaları
                  </button>
                  <div className="border-t border-pink-100 my-2"></div>
                  <button
                    onClick={() => handleCategoryClick("Saç")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors font-medium"
                  >
                    Tüm Saç Bakımı
                  </button>
                </div>
              </DropdownMenu>

              {/* Makyaj */}
              <DropdownMenu
                trigger="Makyaj"
                isOpen={openDropdown === "makyaj"}
                onToggle={() => toggleDropdown("makyaj")}
              >
                <div className="p-2">
                  <button
                    onClick={() => handleCategoryClick("Makyaj", "Ruj")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Ruj
                  </button>
                  <button
                    onClick={() => handleCategoryClick("Makyaj", "Maskara")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Maskara
                  </button>
                  <button
                    onClick={() => handleCategoryClick("Makyaj", "Fondöten")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Fondöten
                  </button>
                  <button
                    onClick={() => handleCategoryClick("Makyaj", "Allık")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Allık
                  </button>
                  <div className="border-t border-pink-100 my-2"></div>
                  <button
                    onClick={() => handleCategoryClick("Makyaj")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors font-medium"
                  >
                    Tüm Makyaj
                  </button>
                </div>
              </DropdownMenu>

              {/* Erkek Bakım */}
              <DropdownMenu
                trigger="Erkek Bakım"
                isOpen={openDropdown === "erkek-bakim"}
                onToggle={() => toggleDropdown("erkek-bakim")}
              >
                <div className="p-2">
                  <button
                    onClick={() => handleCategoryClick("Erkek", "Tıraş")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Tıraş Ürünleri
                  </button>
                  <button
                    onClick={() => handleCategoryClick("Erkek", "Sakal")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                  >
                    Sakal Bakımı
                  </button>
                  <div className="border-t border-pink-100 my-2"></div>
                  <button
                    onClick={() => handleCategoryClick("Erkek")}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors font-medium"
                  >
                    Tüm Erkek Bakım
                  </button>
                </div>
              </DropdownMenu>

              {/* Desktop User Menu */}
              <div className="ml-auto">
                {!loading && (
                  <>
                    {user ? (
                      <DropdownMenu
                        trigger={
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {user.email?.split("@")[0] || "Hesabım"}
                          </div>
                        }
                        isOpen={userDropdownOpen}
                        onToggle={() => setUserDropdownOpen(!userDropdownOpen)}
                      >
                        <div className="p-2">
                          <Link
                            href="/hesabim"
                            className="block px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            Hesabım
                          </Link>
                          <Link
                            href="/siparislerim"
                            className="block px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            Siparişlerim
                          </Link>
                          <div className="border-t border-pink-100 my-2"></div>
                          <Link
                            href="/admin"
                            className="block px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors text-pink-700 font-medium"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            Admin Panel
                          </Link>
                          <div className="border-t border-pink-100 my-2"></div>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-3 py-2 text-sm hover:bg-pink-50 rounded-md transition-colors text-red-600"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Çıkış Yap
                          </button>
                        </div>
                      </DropdownMenu>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Link href="/auth/login">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                          >
                            Giriş Yap
                          </Button>
                        </Link>
                        <Link href="/auth/register">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-700 hover:to-purple-600"
                          >
                            Üye Ol
                          </Button>
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-pink-100 bg-white">
            <div className="container mx-auto px-4 py-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                {/* User Menu Mobile */}
                <div className="border-b border-pink-100 pb-4">
                  {!loading && (
                    <>
                      {user ? (
                        <>
                          <div className="flex items-center gap-2 mb-3">
                            <User className="w-5 h-5 text-pink-600" />
                            <span className="font-medium text-pink-800">{user.email?.split("@")[0] || "Hesabım"}</span>
                          </div>
                          <div className="space-y-2 ml-7">
                            <Link
                              href="/hesabim"
                              className="block text-sm text-pink-600 hover:text-pink-800"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Hesabım
                            </Link>
                            <Link
                              href="/siparislerim"
                              className="block text-sm text-pink-600 hover:text-pink-800"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Siparişlerim
                            </Link>
                            <Link
                              href="/admin"
                              className="block text-sm text-pink-600 hover:text-pink-800 font-medium"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Admin Panel
                            </Link>
                            <button onClick={handleLogout} className="block text-sm text-red-600 hover:text-red-800">
                              Çıkış Yap
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 mb-3">
                            <User className="w-5 h-5 text-pink-600" />
                            <span className="font-medium text-pink-800">Giriş & Üyelik</span>
                          </div>
                          <div className="space-y-2 ml-7">
                            <Link
                              href="/auth/login"
                              className="block text-sm text-pink-600 hover:text-pink-800"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Giriş Yap
                            </Link>
                            <Link
                              href="/auth/register"
                              className="block text-sm text-pink-600 hover:text-pink-800"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Üye Ol
                            </Link>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* Categories Mobile */}
                <div className="space-y-3">
                  {/* Anne & Bebek */}
                  <div>
                    <button
                      onClick={() => handleCategoryClick("Anne & Bebek")}
                      className="flex items-center justify-between w-full text-left font-medium text-pink-800 py-2"
                    >
                      Anne & Bebek
                    </button>
                    <div className="ml-4 space-y-2">
                      <button
                        onClick={() => handleCategoryClick("Anne & Bebek", "Bebek Bakım")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Bebek Bakım
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Anne & Bebek", "Emzik & Biberon")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Emzik & Biberon
                      </button>
                    </div>
                  </div>

                  {/* Ağız Bakım */}
                  <div>
                    <button
                      onClick={() => handleCategoryClick("Ağız Bakım")}
                      className="flex items-center justify-between w-full text-left font-medium text-pink-800 py-2"
                    >
                      Ağız Bakım
                    </button>
                    <div className="ml-4 space-y-2">
                      <button
                        onClick={() => handleCategoryClick("Ağız Bakım", "Diş Fırçası")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Diş Fırçaları
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Ağız Bakım", "Diş Macunu")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Diş Macunları
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Ağız Bakım", "Ağız Suyu")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Ağız Suları
                      </button>
                    </div>
                  </div>

                  {/* Cilt Bakımı */}
                  <div>
                    <button
                      onClick={() => handleCategoryClick("Cilt Bakımı")}
                      className="flex items-center justify-between w-full text-left font-medium text-pink-800 py-2"
                    >
                      Cilt Bakımı
                    </button>
                    <div className="ml-4 space-y-2">
                      <button
                        onClick={() => handleCategoryClick("Cilt Bakımı", "Yüz Bakımı")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Yüz Bakımı
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Cilt Bakımı", "Vücut Bakımı")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Vücut Bakımı
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Cilt Bakımı", "Güneş")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Güneş Ürünleri
                      </button>
                    </div>
                  </div>

                  {/* Makyaj */}
                  <div>
                    <button
                      onClick={() => handleCategoryClick("Makyaj")}
                      className="flex items-center justify-between w-full text-left font-medium text-pink-800 py-2"
                    >
                      Makyaj
                    </button>
                    <div className="ml-4 space-y-2">
                      <button
                        onClick={() => handleCategoryClick("Makyaj", "Ruj")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Ruj
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Makyaj", "Maskara")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Maskara
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Makyaj", "Fondöten")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Fondöten
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Makyaj", "Allık")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Allık
                      </button>
                    </div>
                  </div>

                  {/* Saç Bakımı */}
                  <div>
                    <button
                      onClick={() => handleCategoryClick("Saç")}
                      className="flex items-center justify-between w-full text-left font-medium text-pink-800 py-2"
                    >
                      Saç Bakımı
                    </button>
                    <div className="ml-4 space-y-2">
                      <button
                        onClick={() => handleCategoryClick("Saç", "Şampuan")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Şampuan
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Saç", "Fırça")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Saç Fırçaları
                      </button>
                    </div>
                  </div>

                  {/* Erkek Bakım */}
                  <div>
                    <button
                      onClick={() => handleCategoryClick("Erkek")}
                      className="flex items-center justify-between w-full text-left font-medium text-pink-800 py-2"
                    >
                      Erkek Bakım
                    </button>
                    <div className="ml-4 space-y-2">
                      <button
                        onClick={() => handleCategoryClick("Erkek", "Tıraş")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Tıraş Ürünleri
                      </button>
                      <button
                        onClick={() => handleCategoryClick("Erkek", "Sakal")}
                        className="block text-sm text-pink-600 hover:text-pink-800"
                      >
                        Sakal Bakımı
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Contact Info */}
                <div className="border-t border-pink-100 pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-pink-600">
                    <Phone className="w-4 h-4" />
                    <span>+90 507 302 73 13</span>
                  </div>
                  <Link
                    href="/musteri-hizmetleri"
                    className="block text-sm text-pink-600 hover:text-pink-800"
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
