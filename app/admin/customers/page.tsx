"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Eye, Edit, Trash2, Filter, Download, Mail, Phone } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  city: string
  totalOrders: number
  totalSpent: number
  status: "active" | "inactive"
  joinDate: string
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const customers: Customer[] = [
    {
      id: "1",
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      phone: "+90 555 123 4567",
      city: "İstanbul",
      totalOrders: 12,
      totalSpent: 2450,
      status: "active",
      joinDate: "2023-06-15",
    },
    {
      id: "2",
      name: "Fatma Kaya",
      email: "fatma@example.com",
      phone: "+90 555 234 5678",
      city: "Ankara",
      totalOrders: 8,
      totalSpent: 1680,
      status: "active",
      joinDate: "2023-08-22",
    },
    {
      id: "3",
      name: "Mehmet Demir",
      email: "mehmet@example.com",
      phone: "+90 555 345 6789",
      city: "İzmir",
      totalOrders: 5,
      totalSpent: 890,
      status: "inactive",
      joinDate: "2023-09-10",
    },
    {
      id: "4",
      name: "Ayşe Öz",
      email: "ayse@example.com",
      phone: "+90 555 456 7890",
      city: "Bursa",
      totalOrders: 15,
      totalSpent: 3200,
      status: "active",
      joinDate: "2023-05-03",
    },
    {
      id: "5",
      name: "Ali Çelik",
      email: "ali@example.com",
      phone: "+90 555 567 8901",
      city: "Adana",
      totalOrders: 3,
      totalSpent: 450,
      status: "active",
      joinDate: "2023-11-18",
    },
  ]

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getStatusText = (status: string) => {
    return status === "active" ? "Aktif" : "Pasif"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Müşteriler</h1>
          <p className="text-gray-600">Müşteri bilgilerini görüntüleyin ve yönetin</p>
        </div>
        <Button className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Müşteri
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Müşteri adı veya e-posta ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrele
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Dışa Aktar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Müşteri Listesi ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Müşteri</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">İletişim</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Şehir</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Siparişler</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Toplam Harcama</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Durum</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Kayıt Tarihi</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-500">ID: {customer.id}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{customer.city}</td>
                    <td className="py-4 px-4 text-gray-900">{customer.totalOrders}</td>
                    <td className="py-4 px-4 font-medium text-gray-900">₺{customer.totalSpent.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(customer.status)}>{getStatusText(customer.status)}</Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{customer.joinDate}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
