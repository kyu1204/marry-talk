"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Vendor = {
  id: string
  name: string
  category: string
  location: string
  priceRange: string
  rating: number
  description: string
}

const sampleVendors: Vendor[] = [
  {
    id: "1",
    name: "로맨틱 웨딩홀",
    category: "venue",
    location: "서울 강남구",
    priceRange: "300-500만원",
    rating: 4.8,
    description: "화사하고 모던한 분위기의 웨딩홀",
  },
  {
    id: "2",
    name: "드림 스튜디오",
    category: "studio",
    location: "서울 성동구",
    priceRange: "80-150만원",
    rating: 4.9,
    description: "자연광이 아름다운 감성 스튜디오",
  },
  {
    id: "3",
    name: "엘레강스 드레스",
    category: "dress",
    location: "서울 강남구",
    priceRange: "200-400만원",
    rating: 4.7,
    description: "다양한 스타일의 프리미엄 드레스",
  },
]

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [vendors] = useState<Vendor[]>(sampleVendors)

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      venue: "예식장",
      studio: "스튜디오",
      dress: "드레스샵",
    }
    return names[category] || category
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">업체 찾기</h1>
          <p className="text-sm text-muted-foreground mt-1">AI가 추천하는 최적의 웨딩 업체</p>
        </div>

        {/* Search */}
        <Input
          placeholder="업체명 또는 지역으로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Vendors */}
        <div className="space-y-3">
          {filteredVendors.map((vendor) => (
            <Card key={vendor.id} className="p-4 hover:bg-accent/5 transition-colors">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{vendor.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {getCategoryName(vendor.category)} · {vendor.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{vendor.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-foreground">{vendor.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-primary">{vendor.priceRange}</span>
                  <Button size="sm" variant="outline">
                    상세보기
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
