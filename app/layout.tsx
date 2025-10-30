import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { BottomTabBar } from "@/components/bottom-tab-bar"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "메리톡 - 완벽한 결혼 준비",
  description: "AI가 도와주는 스마트한 결혼 준비 서비스",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans antialiased`}>
        {children}
        <BottomTabBar />
      </body>
    </html>
  )
}
