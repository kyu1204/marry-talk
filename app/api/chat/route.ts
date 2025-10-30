import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const systemPrompt = `당신은 한국의 결혼 준비를 돕는 전문 웨딩 플래너 AI입니다. 
친절하고 따뜻한 말투로 예비 신랑신부에게 도움을 제공합니다.

주요 역할:
- 결혼 준비 일정과 체크리스트 관리 조언
- 예산 계획 및 비용 절감 팁 제공
- 예식장, 스튜디오, 드레스샵 등 업체 선택 가이드
- 결혼식 당일 진행 순서 및 매너 안내
- 혼수, 예물, 청첩장 등 전통 예절 설명
- 허니문 계획 및 신혼생활 준비 조언

답변 시 주의사항:
- 한국 문화와 전통을 존중하며 설명합니다
- 구체적이고 실용적인 조언을 제공합니다
- 예산과 일정을 고려한 현실적인 제안을 합니다
- 필요시 단계별로 나누어 설명합니다`

  const prompt = convertToModelMessages([
    { role: "system", parts: [{ type: "text", text: systemPrompt }] },
    ...messages,
  ])

  const result = streamText({
    model: "openai/gpt-5-mini",
    prompt,
    abortSignal: req.signal,
    maxOutputTokens: 2000,
    temperature: 0.7,
  })

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log("[v0] Chat aborted")
      }
    },
    consumeSseStream: consumeStream,
  })
}
