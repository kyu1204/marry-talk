"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send, Sparkles } from "lucide-react"
import { useEffect, useRef } from "react"

export function ChatInterface() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const input = formData.get("message") as string

    if (!input.trim()) return

    sendMessage({ text: input })
    e.currentTarget.reset()
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.length === 0 && (
            <Card className="border-2 border-dashed">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10">
                    <Sparkles className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">메리톡에게 물어보세요</h3>
                    <p className="text-sm text-muted-foreground mb-4">결혼 준비에 대한 모든 궁금증을 해결해드립니다</p>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-left">
                    <Button
                      variant="outline"
                      className="h-auto py-3 px-4 text-left justify-start bg-transparent"
                      onClick={() => sendMessage({ text: "결혼식 6개월 전에 무엇을 준비해야 하나요?" })}
                    >
                      <span className="text-sm">결혼식 6개월 전에 무엇을 준비해야 하나요?</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-3 px-4 text-left justify-start bg-transparent"
                      onClick={() => sendMessage({ text: "예식장 선택 시 체크해야 할 사항은?" })}
                    >
                      <span className="text-sm">예식장 선택 시 체크해야 할 사항은?</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-3 px-4 text-left justify-start bg-transparent"
                      onClick={() => sendMessage({ text: "결혼 예산을 어떻게 계획하면 좋을까요?" })}
                    >
                      <span className="text-sm">결혼 예산을 어떻게 계획하면 좋을까요?</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <Card
                className={`max-w-[85%] ${
                  message.role === "user" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-2"
                }`}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return (
                          <p key={index} className="text-sm leading-relaxed whitespace-pre-wrap">
                            {part.text}
                          </p>
                        )
                      }
                      return null
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}

          {status === "in_progress" && (
            <div className="flex justify-start">
              <Card className="bg-card border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">답변을 작성하고 있습니다...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t bg-background p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              name="message"
              placeholder="궁금한 점을 물어보세요..."
              disabled={status === "in_progress"}
              className="flex-1 h-12"
              autoComplete="off"
            />
            <Button type="submit" size="icon" disabled={status === "in_progress"} className="h-12 w-12">
              {status === "in_progress" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
