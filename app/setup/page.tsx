"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export default function SetupPage() {
  const router = useRouter()
  const [weddingDate, setWeddingDate] = useState("")
  const [partnerName, setPartnerName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (weddingDate && partnerName) {
      localStorage.setItem("weddingDate", weddingDate)
      localStorage.setItem("partnerName", partnerName)
      localStorage.setItem("showWelcomeMessages", "true")
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-foreground">결혼 정보 설정</h1>
          <p className="text-sm text-muted-foreground">맞춤 일정을 제공하기 위해 정보를 입력해주세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="partner">예비 배우자 이름</Label>
            <Input
              id="partner"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">결혼 예정일</Label>
            <Input
              id="date"
              type="date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            시작하기
          </Button>
        </form>
      </Card>
    </div>
  )
}
