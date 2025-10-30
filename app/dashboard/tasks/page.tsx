"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { TaskList } from "@/components/task-list"
import { ArrowLeft, Heart } from "lucide-react"

export default function TasksPage() {
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
    <main className="min-h-screen gradient-bg dark:gradient-bg-dark">
      <div className="mx-auto max-w-3xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pt-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-5 h-5 text-primary" fill="currentColor" />
              <h1 className="text-2xl font-bold text-foreground">할 일 관리</h1>
            </div>
            <p className="text-sm text-muted-foreground">결혼 준비 체크리스트를 확인하고 완료하세요</p>
          </div>
        </div>

        {/* Task List */}
        <TaskList />
      </div>
    </main>
  )
}
