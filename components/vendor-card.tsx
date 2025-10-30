import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, DollarSign } from "lucide-react"

interface VendorCardProps {
  vendor: {
    name: string
    category: string
    description: string
    priceRange: string
    features: string[]
    recommendation: string
  }
}

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Card className="border-2 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{vendor.name}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {vendor.category}
              </Badge>
            </CardDescription>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">AI 추천</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{vendor.description}</p>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span>{vendor.priceRange}</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">주요 특징</p>
          <ul className="space-y-1">
            {vendor.features.map((feature, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="flex-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm font-medium mb-1">추천 이유</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{vendor.recommendation}</p>
        </div>

        <Button className="w-full bg-transparent" variant="outline">
          상세 정보 보기
        </Button>
      </CardContent>
    </Card>
  )
}
