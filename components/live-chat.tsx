"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { MessageCircle, Send, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { realtimeClient, type ChatMessage } from "@/lib/realtime-client"
import { formatDistanceToNow } from "date-fns"
import { tr } from "date-fns/locale"

export function LiveChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleChatMessages = (newMessages: ChatMessage[]) => {
      setMessages(newMessages)
      scrollToBottom()
    }

    const handleNewMessage = (message: ChatMessage) => {
      if (message.sender === "support") {
        // Show notification for support messages
        if (Notification.permission === "granted" && !isOpen) {
          new Notification("Yeni Destek Mesajı", {
            body: message.message,
            icon: "/rawises-logo.png",
          })
        }
      }
      scrollToBottom()
    }

    realtimeClient.on("chatMessages", handleChatMessages)
    realtimeClient.on("chatMessage", handleNewMessage)

    // Load initial messages
    setMessages(realtimeClient.getChatMessages())

    return () => {
      realtimeClient.off("chatMessages", handleChatMessages)
      realtimeClient.off("chatMessage", handleNewMessage)
    }
  }, [isOpen])

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight
        }
      }
    }, 100)
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      realtimeClient.sendChatMessage(newMessage.trim())
      setNewMessage("")

      // Simulate typing indicator for support response
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const unreadCount = messages.filter((m) => m.sender === "support" && !m.read).length

  return (
    <>
      {/* Floating Chat Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 bg-blue-600 hover:bg-blue-700"
          >
            <MessageCircle className="h-6 w-6" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </div>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[440px] p-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>
                    <Headphones className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <SheetTitle className="text-left">Canlı Destek</SheetTitle>
                  <p className="text-sm text-muted-foreground">Size nasıl yardımcı olabiliriz?</p>
                </div>
              </div>
            </SheetHeader>

            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                  <MessageCircle className="h-8 w-8 mb-2" />
                  <p className="text-center">Merhaba! Size nasıl yardımcı olabiliriz?</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 ${
                          message.sender === "user" ? "bg-blue-600 text-white" : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "user" ? "text-blue-100" : "text-muted-foreground"
                          }`}
                        >
                          {formatDistanceToNow(message.timestamp, {
                            addSuffix: true,
                            locale: tr,
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Mesajınızı yazın..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
