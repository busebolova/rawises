"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error("Auth callback error:", error)
        router.push("/auth/login?error=callback_error")
        return
      }

      if (data.session) {
        router.push("/")
      } else {
        router.push("/auth/login")
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rawises-600 mx-auto"></div>
        <p className="mt-4 text-rawises-600">Giriş yapılıyor...</p>
      </div>
    </div>
  )
}
