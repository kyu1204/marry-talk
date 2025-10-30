"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

type Task = {
  id: string
  title: string
  category: string
  daysBeforeWedding: number
  completed: boolean
}

const defaultTasks: Task[] = [
  { id: "1", title: "예식장 예약", category: "D-180", daysBeforeWedding: 180, completed: false },
  { id: "2", title: "스튜디오 예약", category: "D-180", daysBeforeWedding: 180, completed: false },
  { id: "3", title: "드레스샵 방문", category: "D-120", daysBeforeWedding: 120, completed: false },
  { id: "4", title: "예물 구매", category: "D-120", daysBeforeWedding: 120, completed: false },
  { id: "5", title: "청첩장 디자인 선택", category: "D-90", daysBeforeWedding: 90, completed: false },
  { id: "6", title: "혼수 준비", category: "D-90", daysBeforeWedding: 90, completed: false },
  { id: "7", title: "메이크업 시연", category: "D-60", daysBeforeWedding: 60, completed: false },
  { id: "8", title: "청첩장 발송", category: "D-60", daysBeforeWedding: 60, completed: false },
  { id: "9", title: "하객 명단 정리", category: "D-30", daysBeforeWedding: 30, completed: false },
  { id: "10", title: "예식 리허설", category: "D-7", daysBeforeWedding: 7, completed: false },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [daysUntilWedding, setDaysUntilWedding] = useState<number | null>(null)

  useEffect(() => {
    const savedTasks = localStorage.getItem("weddingTasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    } else {
      setTasks(defaultTasks)
    }

    const weddingDate = localStorage.getItem("weddingDate")
    if (weddingDate) {
      const days = Math.ceil((new Date(weddingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      setDaysUntilWedding(days)
    }
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("weddingTasks", JSON.stringify(tasks))
    }
  }, [tasks])

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0

  const groupedTasks = tasks.reduce(
    (acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = []
      }
      acc[task.category].push(task)
      return acc
    },
    {} as Record<string, Task[]>,
  )

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        {/* Progress Card */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">준비 체크리스트</h1>
              {daysUntilWedding !== null && (
                <p className="text-sm text-muted-foreground mt-1">D-{daysUntilWedding > 0 ? daysUntilWedding : 0}</p>
              )}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{progress}%</div>
              <p className="text-xs text-muted-foreground">
                {completedCount}/{tasks.length} 완료
              </p>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </Card>

        {/* Task Groups */}
        <div className="space-y-6">
          {Object.entries(groupedTasks)
            .sort((a, b) => {
              const daysA = a[1][0].daysBeforeWedding
              const daysB = b[1][0].daysBeforeWedding
              return daysB - daysA
            })
            .map(([category, categoryTasks]) => (
              <div key={category} className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">{category}</h2>
                <div className="space-y-2">
                  {categoryTasks.map((task) => (
                    <Card
                      key={task.id}
                      className={`p-4 transition-all duration-200 ${
                        task.completed ? "bg-muted/50" : "hover:bg-accent/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="flex-none"
                        />
                        <span
                          className={`flex-1 ${
                            task.completed ? "line-through text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
