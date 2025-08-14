"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Table } from 'lucide-react'
import { useState, useEffect } from "react"

interface ProductSortFilterProps {
  totalProducts: number;
}

export function ProductSortFilter({ totalProducts }: ProductSortFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const currentSort = searchParams.get("sortBy") || "date-desc" // Default to "Son eklenen"
  const currentView = searchParams.get("view") || "grid-4" // Default to 4-column grid

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sortBy", newSort)
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleViewChange = (newView: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("view", newView)
    router.push(`${pathname}?${params.toString()}`)
  }

  const sortOptions = [
    { label: "Fiyat artan", value: "price-asc" },
    { label: "Fiyat azalan", value: "price-desc" },
    { label: "İndirim oranı artan", value: "discount-asc" },
    { label: "İndirim oranı azalan", value: "discount-desc" },
    { label: "İlk eklenen", value: "date-asc" },
    { label: "Son eklenen", value: "date-desc" },
  ]

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 p-3 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
        <span className="font-medium">Toplam Ürün:</span>
        <span>{totalProducts}</span>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-start gap-2 flex-1">
        {sortOptions.map((option) => (
          <Button
            key={option.value}
            variant={currentSort === option.value ? "secondary" : "ghost"}
            size="sm"
            className={`text-xs sm:text-sm px-3 py-1.5 rounded-md ${
              currentSort === option.value
                ? "bg-rawises-600 text-white hover:bg-rawises-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleSortChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <div className="flex gap-2 ml-auto">
        <Button
          variant={currentView === "grid-4" ? "secondary" : "ghost"}
          size="sm"
          className={`p-2 h-8 w-8 ${
            currentView === "grid-4"
              ? "bg-rawises-600 text-white hover:bg-rawises-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleViewChange("grid-4")}
        >
          <LayoutGrid className="w-4 h-4" />
        </Button>
        <Button
          variant={currentView === "grid-2" ? "secondary" : "ghost"}
          size="sm"
          className={`p-2 h-8 w-8 ${
            currentView === "grid-2"
              ? "bg-rawises-600 text-white hover:bg-rawises-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleViewChange("grid-2")}
        >
          <Table className="w-4 h-4 rotate-90" /> {/* Table icon rotated for 2-column view */}
        </Button>
      </div>
    </div>
  )
}
