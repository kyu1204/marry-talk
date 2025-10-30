"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Search, Sparkles } from "lucide-react"
import { VendorCard } from "./vendor-card"

interface Vendor {
  name: string
  category: string
  description: string
  priceRange: string
  features: string[]
  recommendation: string
}

export function VendorSearch() {
  const [category, setCategory] = useState("")
  const [budget, setBudget] = useState("")
  const [location, setLocation] = useState("")
  const [preferences, setPreferences] = useState("")
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!category || !budget) return

    setLoading(true)
    try {
      const response = await fetch("/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, budget, location, preferences }),
      })

      const data = await response.json()
      setVendors(data.vendors)
    } catch (error) {
      console.error("[v0] Error fetching vendors:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <CardTitle>AI 업체 추천</CardTitle>
              <CardDescription>조건에 맞는 최적의 업체를 찾아드립니다</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">업체 종류</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="예식장">예식장</SelectItem>
                  <SelectItem value="스튜디오">스튜디오</SelectItem>
                  <SelectItem value="드레스샵">드레스샵</SelectItem>
                  <SelectItem value="메이크업">메이크업</SelectItem>
                  <SelectItem value="한복">한복</SelectItem>
                  <SelectItem value="예물">예물</SelectItem>
                  <SelectItem value="허니문">허니문</SelectItem>
                  <SelectItem value="웨딩카">웨딩카</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">예산</Label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger id="budget">
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100만원 이하">100만원 이하</SelectItem>
                  <SelectItem value="100-300만원">100-300만원</SelectItem>
                  <SelectItem value="300-500만원">300-500만원</SelectItem>
                  <SelectItem value="500-1000만원">500-1000만원</SelectItem>
                  <SelectItem value="1000만원 이상">1000만원 이상</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">지역 (선택사항)</Label>
            <Input
              id="location"
              placeholder="예: 서울 강남구"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferences">선호사항 (선택사항)</Label>
            <Input
              id="preferences"
              placeholder="예: 야외 예식, 빈티지 스타일"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
            />
          </div>

          <Button onClick={handleSearch} disabled={!category || !budget || loading} className="w-full h-12">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                추천 업체 찾는 중...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                업체 추천 받기
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {vendors.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">추천 업체 ({vendors.length})</h2>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="w-3 h-3" />
              AI 추천
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {vendors.map((vendor, index) => (
              <VendorCard key={index} vendor={vendor} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {vendors.length === 0 && !loading && (
        <Card className="border-2 border-dashed">
          <CardContent className="pt-12 pb-12">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-2">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">업체를 검색해보세요</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                조건을 입력하고 AI 추천을 받아보세요. 예산과 선호도에 맞는 최적의 업체를 찾아드립니다.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
