"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function BudgetPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← 돌아가기
            </Button>
          </Link>
        </div>

        <Card className="p-6">
          <h1 className="text-2xl font-bold text-foreground">예산 관리</h1>
          <p className="text-muted-foreground mt-2">곧 예산 관리 기능이 추가될 예정입니다.</p>
        </Card>
      </div>
    </div>
  )
}
