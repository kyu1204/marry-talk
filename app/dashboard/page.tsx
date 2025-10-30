"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, Heart, MessageSquare, Users } from "lucide-react"

interface WeddingData {
  partnerName: string
  weddingDate: string
  setupComplete: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const [weddingData, setWeddingData] = useState<WeddingData | null>(null)
  const [daysUntilWedding, setDaysUntilWedding] = useState<number>(0)
  const [taskProgress, setTaskProgress] = useState({ completed: 0, total: 0 })

  useEffect(() => {
    // Check if onboarding is complete
    const data = localStorage.getItem("weddingData")
    if (!data) {
      router.push("/")
      return
    }

    const parsedData = JSON.parse(data) as WeddingData
    setWeddingData(parsedData)

    // Calculate days until wedding
    const today = new Date()
    const wedding = new Date(parsedData.weddingDate)
    const diffTime = wedding.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setDaysUntilWedding(diffDays)

    // Load task progress
    const tasks = localStorage.getItem("weddingTasks")
    if (tasks) {
      const parsedTasks = JSON.parse(tasks)
      const completed = parsedTasks.filter((t: any) => t.completed).length
      setTaskProgress({ completed, total: parsedTasks.length })
    }
  }, [router])

  if (!weddingData) {
    return null
  }

  const progressPercentage = taskProgress.total > 0 ? (taskProgress.completed / taskProgress.total) * 100 : 0

  return (
    <main className="min-h-screen gradient-bg dark:gradient-bg-dark">
      <div className="mx-auto max-w-4xl p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <Heart className="w-8 h-8 text-primary" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">{weddingData.partnerName}님과의 결혼식</h1>
          <p className="text-muted-foreground">완벽한 결혼식을 위한 준비를 시작하세요</p>
        </div>

        {/* D-Day Card */}
        <Card className="border-2 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">결혼식까지</p>
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-8 h-8 text-primary" />
                <p className="text-5xl font-bold text-primary">D-{daysUntilWedding}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(weddingData.weddingDate).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className="border-2 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push("/dashboard/tasks")}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">할 일 관리</CardTitle>
                  <CardDescription>준비 사항 체크리스트</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                보기
              </Button>
            </CardContent>
          </Card>

          <Card
            className="border-2 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push("/dashboard/chat")}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI 상담</CardTitle>
                  <CardDescription>궁금한 점을 물어보세요</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                시작하기
              </Button>
            </CardContent>
          </Card>

          <Card
            className="border-2 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push("/dashboard/vendors")}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg">업체 추천</CardTitle>
                  <CardDescription>AI 맞춤 업체 찾기</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                탐색하기
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <CardTitle className="text-lg">타임라인</CardTitle>
                  <CardDescription>월별 준비 일정</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                확인하기
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>준비 진행 상황</CardTitle>
            <CardDescription>전체 준비 사항 중 완료된 항목</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">전체 진행률</span>
                <span className="text-sm text-muted-foreground">
                  {taskProgress.completed} / {taskProgress.total}
                </span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">
                {taskProgress.total > 0
                  ? `${progressPercentage.toFixed(0)}% 완료`
                  : "할 일을 추가하고 완료하면 진행률이 업데이트됩니다"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
