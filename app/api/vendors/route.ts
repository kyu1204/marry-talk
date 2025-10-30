import { generateObject } from "ai"
import { z } from "zod"

const vendorSchema = z.object({
  vendors: z.array(
    z.object({
      name: z.string(),
      category: z.string(),
      description: z.string(),
      priceRange: z.string(),
      features: z.array(z.string()),
      recommendation: z.string(),
    }),
  ),
})

export async function POST(req: Request) {
  const { category, budget, location, preferences } = await req.json()

  const prompt = `한국의 결혼 준비를 위한 ${category} 업체를 추천해주세요.

예산: ${budget}
지역: ${location || "서울"}
선호사항: ${preferences || "없음"}

각 업체에 대해 다음 정보를 포함해주세요:
- 업체명 (실제 존재하는 것처럼 구체적으로)
- 카테고리
- 상세 설명
- 가격대
- 주요 특징 3-5개
- 추천 이유

총 5개의 업체를 추천해주세요.`

  const { object } = await generateObject({
    model: "openai/gpt-5-mini",
    schema: vendorSchema,
    prompt,
    maxOutputTokens: 3000,
  })

  return Response.json(object)
}
