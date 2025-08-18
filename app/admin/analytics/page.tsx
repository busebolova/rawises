"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, TrendingDown, Users, ShoppingCart, Package, DollarSign, Download } from "lucide-react"

// Mock data for analytics
const salesData = [
  { month: "Oca", revenue: 45231, orders: 156, customers: 89 },
  { month: "Şub", revenue: 52847, orders: 189, customers: 112 },
  { month: "Mar", revenue: 48392, orders: 167, customers: 95 },
  { month: "Nis", revenue: 61205, orders: 234, customers: 134 },
  { month: "May", revenue: 58934, orders: 198, customers: 118 },
  { month: "Haz", revenue: 67821, orders: 267, customers: 156 },
]

const topProducts = [
  { name: "Nemlendirici Krem", sales: 234, revenue: 23400, growth: 12.5 },
  { name: "Vitamin C Serum", sales: 189, revenue: 18900, growth: 8.3 },
  { name: "Güneş Kremi", sales: 156, revenue: 15600, growth: -2.1 },
  { name: "Temizleme Jeli", sales: 134, revenue: 13400, growth: 15.7 },
  { name: "Anti-Aging Krem", sales: 112, revenue: 11200, growth: 5.4 },
]

const categoryData = [
  { name: "Cilt Bakımı", value: 45, color: "#0ea5e9" },
  { name: "Makyaj", value: 25, color: "#8b5cf6" },
  { name: "Saç Bakımı", value: 20, color: "#10b981" },
  { name: "Parfüm", value: 10, color: "#f59e0b" },
]

const recentOrders = [
  { id: "#12345", customer: "Ayşe Yılmaz", amount: 234, status: "Tamamlandı", date: "2 saat önce" },
  { id: "#12346", customer: "Mehmet Kaya", amount: 156, status: "Kargoda", date: "4 saat önce" },
  { id: "#12347", customer: "Fatma Demir", amount: 89, status: "Hazırlanıyor", date: "6 saat önce" },
  { id: "#12348", customer: "Ali Özkan", amount: 345, status: "Beklemede", date: "8 saat önce" },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  const metrics = [
    {
      title: "Toplam Gelir",
      value: "₺67,821",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Toplam Sipariş",
      value: "267",
      change: "+8.3%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Aktif Müşteri",
      value: "156",
      change: "+15.7%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Ürün Satışı",
      value: "1,234",
      change: "-2.1%",
      trend: "down",
      icon: Package,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">İşletmenizin performansını takip edin</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Son 7 gün</SelectItem>
              <SelectItem value="30d">Son 30 gün</SelectItem>
              <SelectItem value="90d">Son 3 ay</SelectItem>
              <SelectItem value="1y">Son 1 yıl</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${metric.color}`}>
                  <metric.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="sales">Satış Analizi</TabsTrigger>
          <TabsTrigger value="products">Ürün Performansı</TabsTrigger>
          <TabsTrigger value="customers">Müşteri Analizi</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Gelir Trendi</CardTitle>
                <CardDescription>Son 6 aylık gelir performansı</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₺${value.toLocaleString()}`, "Gelir"]} />
                    <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kategori Dağılımı</CardTitle>
                <CardDescription>Satış kategorilerine göre dağılım</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`%${value}`, "Oran"]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-4">
                  {categoryData.map((category) => (
                    <div key={category.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                      <span className="text-sm">{category.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>En Çok Satan Ürünler</CardTitle>
                <CardDescription>Bu ay en çok satılan ürünler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.sales} satış</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₺{product.revenue.toLocaleString()}</p>
                        <div className="flex items-center">
                          {product.growth > 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                          )}
                          <span className={`text-xs ${product.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                            {product.growth > 0 ? "+" : ""}
                            {product.growth}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Son Siparişler</CardTitle>
                <CardDescription>En son gelen siparişler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₺{order.amount}</p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              order.status === "Tamamlandı"
                                ? "default"
                                : order.status === "Kargoda"
                                  ? "secondary"
                                  : order.status === "Hazırlanıyor"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {order.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{order.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Satış Performansı</CardTitle>
              <CardDescription>Aylık satış ve sipariş trendi</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#0ea5e9" name="Gelir (₺)" />
                  <Bar dataKey="orders" fill="#8b5cf6" name="Sipariş Sayısı" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ürün Performans Analizi</CardTitle>
              <CardDescription>Ürünlerin satış performansı ve trend analizi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{product.name}</h4>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Satış</p>
                        <p className="font-medium">{product.sales} adet</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Gelir</p>
                        <p className="font-medium">₺{product.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Büyüme</p>
                        <div className="flex items-center">
                          {product.growth > 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                          )}
                          <span className={`font-medium ${product.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                            {product.growth > 0 ? "+" : ""}
                            {product.growth}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Müşteri Analizi</CardTitle>
              <CardDescription>Müşteri davranışları ve demografik analiz</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="customers" stroke="#10b981" strokeWidth={2} name="Yeni Müşteri" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
