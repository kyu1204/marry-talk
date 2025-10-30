"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, HeartIcon, SparklesIcon } from "@/components/icons"

export function WeddingOnboarding() {
  const router = useRouter()
  const [step, setStep] = useState<"welcome" | "date-setup">("welcome")
  const [weddingDate, setWeddingDate] = useState("")
  const [partnerName, setPartnerName] = useState("")

  const handleComplete = () => {
    // Save to localStorage
    localStorage.setItem(
      "weddingData",
      JSON.stringify({
        partnerName,
        weddingDate,
        setupComplete: true,
      }),
    )
    // Navigate to dashboard
    router.push("/dashboard")
  }

  if (step === "welcome") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-center space-y-6 mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <HeartIcon className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-balance text-foreground">AI 웨딩 플래너</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-sm mx-auto">
            완벽한 결혼식을 위한 모든 준비, AI가 단계별로 도와드립니다
          </p>
        </div>

        <Card className="w-full max-w-sm border-2 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 mx-auto mb-3">
              <SparklesIcon className="w-6 h-6 text-secondary" />
            </div>
            <CardTitle className="text-2xl">시작하기</CardTitle>
            <CardDescription className="text-base">결혼 준비의 모든 것을 체계적으로 관리하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-primary">1</span>
                </div>
                <p>D-day 기반 맞춤 일정 관리</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-primary">2</span>
                </div>
                <p>AI 추천 업체 및 정보 제공</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-primary">3</span>
                </div>
                <p>중요 일정 알림 서비스</p>
              </div>
            </div>
            <Button className="w-full h-12 text-base font-semibold" size="lg" onClick={() => setStep("date-setup")}>
              시작하기
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-sm border-2 shadow-lg">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
            <CalendarIcon className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">결혼 정보 입력</CardTitle>
          <CardDescription className="text-base">예식 날짜를 알려주시면 맞춤 일정을 준비해드려요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="partner-name" className="text-base">
              예비 배우자 이름
            </Label>
            <Input
              id="partner-name"
              placeholder="이름을 입력해주세요"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wedding-date" className="text-base">
              결혼 예정일
            </Label>
            <Input
              id="wedding-date"
              type="date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              className="h-11"
            />
          </div>
          <Button
            className="w-full h-12 text-base font-semibold"
            size="lg"
            disabled={!weddingDate || !partnerName}
            onClick={handleComplete}
          >
            다음
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
