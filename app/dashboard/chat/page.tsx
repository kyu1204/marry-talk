"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChatInterface } from "@/components/chat-interface"
import { ArrowLeft, Heart } from "lucide-react"

export default function ChatPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check if onboarding is complete
    const data = localStorage.getItem("weddingData")
    if (!data) {
      router.push("/")
      return
    }
    setMounted(true)
  }, [router])

  if (!mounted) {
    return null
  }

  return (
    <main className="h-screen flex flex-col gradient-bg dark:gradient-bg-dark">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-5xl p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" fill="currentColor" />
                <h1 className="text-xl font-bold text-foreground">AI 웨딩 상담</h1>
              </div>
              <p className="text-sm text-muted-foreground">결혼 준비 전문가가 도와드립니다</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </main>
  )
}
