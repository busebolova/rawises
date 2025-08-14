"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Search, Menu, ShoppingCart, User, Heart, LogOut, Package, UserCircle } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { CartSidebar } from "./cart-sidebar"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const categories = [
  {
    name: "Yüz Makyajı",
    subcategories: ["Fondöten", "Kapatıcı", "Pudra", "Allık", "Bronzer", "Highlighter", "Primer"],
  },
  {
    name: "Göz Makyajı",
    subcategories: ["Maskara", "Eyeliner", "Göz Farı", "Kaş Ürünleri", "Göz Kalemi", "Takma Kirpik"],
  },
  {
    name: "Dudak Makyajı",
    subcategories: ["Ruj", "Lip Gloss", "Dudak Kalemi", "Dudak Balmı", "Liquid Lipstick"],
  },
  {
    name: "Cilt Bakımı",
    subcategories: ["Temizleyici", "Tonik", "Serum", "Nemlendirici", "Güneş Kremi", "Maske", "Peeling"],
  },
  {
    name: "Saç Bakımı",
    subcategories: ["Şampuan", "Saç Kremi", "Saç Maskesi", "Saç Serumu", "Saç Spreyi"],
  },
  {
    name: "Parfüm",
    subcategories: ["Kadın Parfümü", "Erkek Parfümü", "Unisex Parfüm", "Deodorant"],
  },
]

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { items } = useCartStore()
  const { data: session } = useSession()
  const router = useRouter()

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsSearchOpen(false)
      setTimeout(() => window.scrollTo(0, 0), 100)
    }
  }

  const handleCategoryClick = (category: string, subcategory?: string) => {
    const params = new URLSearchParams()
    params.set("category", category)
    if (subcategory) {
      params.set("subcategory", subcategory)
    }
    router.push(`/category?${params.toString()}`)
    setIsMobileMenuOpen(false)
    setTimeout(() => window.scrollTo(0, 0), 100)
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
    setTimeout(() => window.scrollTo(0, 0), 100)
  }

  const handleLogoClick = () => {
    router.push("/")
    window.scrollTo(0, 0)
  }

  const handleNavClick = (path: string) => {
    router.push(path)
    setTimeout(() => window.scrollTo(0, 0), 100)
  }

  return (
    <>
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-32 sm:h-36"></div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="py-4">
                  <h2 className="text-lg font-semibold mb-4">Kategoriler</h2>
                  <div className="space-y-4">
                    {categories.map((category) => (
                      <div key={category.name}>
                        <button
                          onClick={() => handleCategoryClick(category.name)}
                          className="font-medium text-left w-full py-2 hover:text-rawises-600"
                        >
                          {category.name}
                        </button>
                        <div className="ml-4 space-y-1">
                          {category.subcategories.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => handleCategoryClick(category.name, sub)}
                              className="block text-sm text-gray-600 hover:text-rawises-600 py-1"
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <div className="flex-1 md:flex-none flex justify-center md:justify-start">
              <button onClick={handleLogoClick} className="flex items-center">
                <Image src="/rawises-logo.png" alt="Rawises" width={120} height={40} className="h-8 sm:h-10 w-auto" />
              </button>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Input
                  type="search"
                  placeholder="Ürün ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Button type="submit" size="sm" variant="ghost" className="absolute right-0 top-0 h-full px-3">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              {/* Mobile Search */}
              <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Search className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="h-32">
                  <form onSubmit={handleSearch} className="relative mt-4">
                    <Input
                      type="search"
                      placeholder="Ürün ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                      autoFocus
                    />
                    <Button type="submit" size="sm" variant="ghost" className="absolute right-0 top-0 h-full px-3">
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>
                </SheetContent>
              </Sheet>

              {/* User Menu */}
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="h-5 w-5" />
                      <span className="hidden sm:ml-2 sm:inline">{session.user?.name || session.user?.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleNavClick("/profile")}>
                      <UserCircle className="mr-2 h-4 w-4" />
                      Profilim
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavClick("/orders")}>
                      <Package className="mr-2 h-4 w-4" />
                      Siparişlerim
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavClick("/favorites")}>
                      <Heart className="mr-2 h-4 w-4" />
                      Favorilerim
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Çıkış Yap
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => handleNavClick("/login")}>
                  <User className="h-5 w-5" />
                  <span className="hidden sm:ml-2 sm:inline">Giriş</span>
                </Button>
              )}

              {/* Cart */}
              <Button variant="ghost" size="sm" className="relative" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent-500">
                    {itemCount}
                  </Badge>
                )}
                <span className="hidden sm:ml-2 sm:inline">Sepet</span>
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block border-t border-gray-200">
            <NavigationMenu className="mx-auto">
              <NavigationMenuList className="flex space-x-8 py-4">
                {categories.map((category) => (
                  <NavigationMenuItem key={category.name}>
                    <NavigationMenuTrigger
                      className="text-sm font-medium hover:text-rawises-600"
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      {category.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-80 gap-3 p-4">
                        {category.subcategories.map((subcategory) => (
                          <button
                            key={subcategory}
                            onClick={() => handleCategoryClick(category.name, subcategory)}
                            className="block text-left text-sm hover:text-rawises-600 py-2 px-3 rounded hover:bg-gray-50"
                          >
                            {subcategory}
                          </button>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </header>
    </>
  )
}
