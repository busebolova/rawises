"use client"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LiveChat() {
  // Live chat disabled
  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 bg-gray-400 cursor-not-allowed opacity-50"
      disabled
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  )
}
