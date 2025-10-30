"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageCircleIcon, ListTodoIcon, StoreIcon } from "./icons"

export function BottomTabBar() {
  const pathname = usePathname()

  const tabs = [
    {
      name: "체크리스트",
      href: "/tasks",
      icon: ListTodoIcon,
    },
    {
      name: "홈",
      href: "/",
      icon: MessageCircleIcon,
      isCenter: true,
    },
    {
      name: "업체추천",
      href: "/vendors",
      icon: StoreIcon,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            const Icon = tab.icon

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-1 transition-all ${
                  tab.isCenter
                    ? "relative -top-4 bg-primary text-primary-foreground rounded-full w-14 h-14 shadow-lg hover:shadow-xl"
                    : "flex-1 hover:text-primary"
                } ${isActive && !tab.isCenter ? "text-primary" : !tab.isCenter ? "text-muted-foreground" : ""}`}
              >
                <Icon className={tab.isCenter ? "w-6 h-6" : "w-5 h-5"} />
                {!tab.isCenter && <span className="text-xs font-medium">{tab.name}</span>}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
