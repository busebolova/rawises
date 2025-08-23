"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getSession = async () => {
      try {
        console.log("[v0] Initializing Supabase auth...")

        // Add timeout to prevent hanging
        const sessionPromise = supabase.auth.getSession()
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Auth timeout")), 5000))

        const {
          data: { session },
        } = (await Promise.race([sessionPromise, timeoutPromise])) as any
        setUser(session?.user ?? null)
        console.log("[v0] Auth initialized successfully")
      } catch (error) {
        console.log("[v0] Auth initialization failed:", error)
        setUser(null) // Fallback to no user
      } finally {
        setLoading(false)
      }
    }

    getSession()

    let subscription: any
    try {
      const {
        data: { subscription: authSubscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("[v0] Auth state changed:", event)
        setUser(session?.user ?? null)
        setLoading(false)
      })
      subscription = authSubscription
    } catch (error) {
      console.log("[v0] Failed to set up auth listener:", error)
      setLoading(false)
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [supabase.auth])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      console.log("[v0] Sign in error:", error)
      return { error }
    }
  }

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
        },
      })
      return { error }
    } catch (error) {
      console.log("[v0] Sign up error:", error)
      return { error }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.log("[v0] Sign out error:", error)
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
