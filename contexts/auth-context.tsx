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
  signInWithGoogle: () => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = () => {
      try {
        console.log("[v0] Initializing auth context...")

        const supabase = createClient()

        supabase.auth
          .getSession()
          .then(({ data: { session }, error }) => {
            if (error) {
              console.log("[v0] Session error:", error)
            }
            setUser(session?.user ?? null)
            console.log("[v0] Auth initialized successfully")
          })
          .catch((error) => {
            console.log("[v0] Auth client error:", error)
            setUser(null)
          })
          .finally(() => {
            setLoading(false)
          })

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
          console.log("[v0] Auth state changed:", event)
          setUser(session?.user ?? null)
        })

        return () => subscription?.unsubscribe()
      } catch (error) {
        console.log("[v0] Auth initialization error:", error)
        setUser(null)
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log("[v0] Auth: Attempting sign in for:", email)
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.log("[v0] Auth: Sign in error:", error.message)
      } else {
        console.log("[v0] Auth: Sign in successful for user:", data.user?.email)
      }

      return { error }
    } catch (error) {
      console.log("[v0] Auth: Sign in exception:", error)
      return { error }
    }
  }

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      console.log("[v0] Auth: Attempting sign up for:", email)
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.log("[v0] Auth: Sign up error:", error.message)
      } else {
        console.log("[v0] Auth: Sign up successful, confirmation email sent to:", email)
      }

      return { error }
    } catch (error) {
      console.log("[v0] Auth: Sign up exception:", error)
      return { error }
    }
  }

  const signOut = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch (error) {
      console.log("[v0] Auth: Sign out error:", error)
    }
  }

  const signInWithGoogle = async () => {
    try {
      console.log("[v0] Auth: Attempting Google sign in")
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.log("[v0] Auth: Google sign in error:", error.message)
      }

      return { error }
    } catch (error) {
      console.log("[v0] Auth: Google sign in exception:", error)
      return { error }
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
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
