import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SSSSayfasiLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Skeleton className="h-16 w-full" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Hero Section Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-[600px] mx-auto mb-8" />
          <Skeleton className="h-12 w-80 mx-auto" />
        </div>

        {/* Quick Contact Skeleton */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6 text-center">
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto mb-4" />
                <Skeleton className="h-10 w-28 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Categories Skeleton */}
        <div className="space-y-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-8 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="p-4 border rounded-lg">
                      <Skeleton className="h-5 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section Skeleton */}
        <Card className="mt-12">
          <CardContent className="p-8 text-center">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-5 w-96 mx-auto mb-6" />
            <div className="flex gap-4 justify-center">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-24" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Skeleton */}
      <div className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  )
}
