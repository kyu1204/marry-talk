"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendIcon } from "@/components/icons"
import Link from "next/link"

type Message = {
  id: string
  type: "ai" | "user"
  content: string
  cards?: MessageCard[]
  timestamp: Date
}

type MessageCard = {
  id: string
  title: string
  description: string
  link: string
  icon: string
}

function calculateDday(weddingDate: string): number {
  const today = new Date()
  const wedding = new Date(weddingDate)
  const diffTime = wedding.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

function getTimelinePhase(dday: number): string {
  if (dday > 180) return "6개월 이상"
  if (dday > 90) return "3-6개월"
  if (dday > 60) return "2-3개월"
  if (dday > 30) return "1-2개월"
  if (dday > 7) return "1주-1개월"
  return "1주일 이내"
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      setShowHeader(scrollTop < 50)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (messages.length > 3) {
      setShowHeader(false)
    }
  }, [messages.length])

  const addAIMessage = (content: string, cards?: MessageCard[]) => {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random(),
      type: "ai",
      content,
      cards,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(
      () => {
        setIsTyping(false)

        const lowerInput = input.toLowerCase()

        if (lowerInput.includes("업체") || lowerInput.includes("스튜디오") || lowerInput.includes("드레스")) {
          addAIMessage("업체 추천을 원하시는군요! 어떤 업체를 찾고 계신가요?", [
            {
              id: "2",
              title: "스튜디오 추천",
              description: "분위기와 예산에 맞는 스튜디오를 찾아드려요",
              link: "/vendors?category=studio",
              icon: "📸",
            },
            {
              id: "3",
              title: "드레스샵 추천",
              description: "스타일에 맞는 드레스샵을 추천해드려요",
              link: "/vendors?category=dress",
              icon: "👗",
            },
            {
              id: "4",
              title: "예식장 추천",
              description: "지역과 규모에 맞는 예식장을 찾아드려요",
              link: "/vendors?category=venue",
              icon: "🏛️",
            },
          ])
        } else if (lowerInput.includes("할일") || lowerInput.includes("준비") || lowerInput.includes("체크리스트")) {
          addAIMessage("결혼 준비 체크리스트를 확인하시겠어요? D-day에 맞춰 해야 할 일들을 정리해드릴게요!", [
            {
              id: "5",
              title: "준비 체크리스트",
              description: "결혼식까지 단계별로 해야 할 일들",
              link: "/tasks",
              icon: "✅",
            },
          ])
        } else if (lowerInput.includes("예산") || lowerInput.includes("비용")) {
          addAIMessage("예산 관리는 결혼 준비의 핵심이에요. 항목별 예산을 계획하고 관리해보세요!", [
            {
              id: "6",
              title: "예산 계획하기",
              description: "항목별 예산 설정 및 지출 관리",
              link: "/budget",
              icon: "💰",
            },
          ])
        } else {
          addAIMessage("무엇을 도와드릴까요? 아래 메뉴에서 선택하시거나 자유롭게 질문해주세요!", [
            {
              id: "7",
              title: "준비 체크리스트",
              description: "D-day 기준 해야 할 일 확인",
              link: "/tasks",
              icon: "✅",
            },
            {
              id: "8",
              title: "업체 찾기",
              description: "AI 추천으로 최적의 업체 찾기",
              link: "/vendors",
              icon: "🔍",
            },
            {
              id: "9",
              title: "예산 관리",
              description: "항목별 예산 계획 및 관리",
              link: "/budget",
              icon: "💰",
            },
          ])
        }
      },
      1000 + Math.random() * 1000,
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div
        className={`flex-none border-b border-border bg-card/50 backdrop-blur-sm transition-all duration-300 ${
          showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full h-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-4">
          <h1 className="text-lg font-semibold text-foreground">AI 웨딩 플래너</h1>
          <p className="text-sm text-muted-foreground">당신의 완벽한 결혼식을 위한 AI 어시스턴트</p>
        </div>
      </div>

      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-6 pb-24 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {message.type === "ai" ? (
              <div className="flex gap-3 items-start">
                <div className="flex-none w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                  🤖
                </div>
                <div className="flex-1 space-y-3">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  {message.cards && message.cards.length > 0 && (
                    <div className="grid gap-2 mt-3">
                      {message.cards.map((card) => (
                        <Link key={card.id} href={card.link} className="group block">
                          <div className="p-4 rounded-xl border border-border bg-card hover:bg-accent/5 hover:border-primary/30 transition-all duration-200 hover:shadow-sm">
                            <div className="flex items-start gap-3">
                              <div className="flex-none text-2xl">{card.icon}</div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                  {card.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{card.description}</p>
                              </div>
                              <div className="flex-none text-muted-foreground group-hover:text-primary transition-colors">
                                →
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex gap-3 items-start justify-end">
                <div className="flex-1 flex justify-end">
                  <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-primary text-primary-foreground">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
                <div className="flex-none w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-sm">
                  👤
                </div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 items-start animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex-none w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
              🤖
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-1 px-4 py-3 rounded-2xl bg-muted">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex-none border-t border-border bg-card/95 backdrop-blur-sm sticky bottom-0 z-20">
        <div className="px-4 py-4 pb-20">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping} className="flex-none">
              <SendIcon className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">AI가 결혼 준비의 모든 과정을 도와드립니다</p>
        </div>
      </div>
    </div>
  )
}
