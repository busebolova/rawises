import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Package, ShoppingCart, TrendingUp, Eye, UserPlus, ShoppingBag, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Toplam Müşteri",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Toplam Ürün",
      value: "856",
      change: "+5%",
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Toplam Sipariş",
      value: "2,341",
      change: "+18%",
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Toplam Gelir",
      value: "₺45,678",
      change: "+23%",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const recentOrders = [
    {
      id: "#12345",
      customer: "Ahmet Yılmaz",
      product: "Maybelline Kapatıcı",
      amount: "₺495",
      status: "Tamamlandı",
      date: "2024-01-15",
    },
    {
      id: "#12346",
      customer: "Fatma Kaya",
      product: "Morfose Hair Spray",
      amount: "₺95",
      status: "Kargoda",
      date: "2024-01-15",
    },
    {
      id: "#12347",
      customer: "Mehmet Demir",
      product: "Marmara Barber Kolonya",
      amount: "₺90",
      status: "Hazırlanıyor",
      date: "2024-01-14",
    },
    {
      id: "#12348",
      customer: "Ayşe Öz",
      product: "Deotak Deodorant",
      amount: "₺165",
      status: "Tamamlandı",
      date: "2024-01-14",
    },
  ]

  const topProducts = [
    {
      name: "Maybelline Kapatıcı",
      sales: 156,
      revenue: "₺77,220",
      stock: 23,
    },
    {
      name: "Morfose Hair Spray",
      sales: 134,
      revenue: "₺12,730",
      stock: 45,
    },
    {
      name: "Marmara Barber Kolonya",
      sales: 98,
      revenue: "₺8,820",
      stock: 67,
    },
    {
      name: "Deotak Deodorant",
      sales: 87,
      revenue: "₺14,355",
      stock: 12,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Tamamlandı":
        return "bg-green-100 text-green-800"
      case "Kargoda":
        return "bg-blue-100 text-blue-800"
      case "Hazırlanıyor":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Rawises e-ticaret yönetim paneline hoş geldiniz</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change} bu ay</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Son Siparişler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{order.id}</span>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              En Çok Satan Ürünler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} satış</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{product.revenue}</p>
                    <p className="text-sm text-gray-500">{product.stock} stok</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <UserPlus className="h-6 w-6 text-blue-600" />
              <span className="font-medium text-blue-900">Yeni Müşteri</span>
            </button>
            <button className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <Package className="h-6 w-6 text-green-600" />
              <span className="font-medium text-green-900">Ürün Ekle</span>
            </button>
            <button className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <ShoppingCart className="h-6 w-6 text-purple-600" />
              <span className="font-medium text-purple-900">Siparişler</span>
            </button>
            <button className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <Eye className="h-6 w-6 text-orange-600" />
              <span className="font-medium text-orange-900">Raporlar</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
