"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, CheckCircle2 } from "lucide-react"

interface Task {
  id: string
  title: string
  category: string
  timeframe: string
  completed: boolean
}

const DEFAULT_TASKS: Task[] = [
  // 6-12 months before
  { id: "1", title: "예산 계획 세우기", category: "기획", timeframe: "6-12개월 전", completed: false },
  { id: "2", title: "예식장 예약하기", category: "예식장", timeframe: "6-12개월 전", completed: false },
  { id: "3", title: "웨딩 플래너 선정", category: "기획", timeframe: "6-12개월 전", completed: false },
  { id: "4", title: "하객 명단 초안 작성", category: "하객", timeframe: "6-12개월 전", completed: false },

  // 4-6 months before
  { id: "5", title: "스튜디오 예약", category: "촬영", timeframe: "4-6개월 전", completed: false },
  { id: "6", title: "드레스/턱시도 선택", category: "의상", timeframe: "4-6개월 전", completed: false },
  { id: "7", title: "메이크업 예약", category: "뷰티", timeframe: "4-6개월 전", completed: false },
  { id: "8", title: "예물 구매", category: "예물", timeframe: "4-6개월 전", completed: false },

  // 2-4 months before
  { id: "9", title: "청첩장 디자인 및 인쇄", category: "청첩장", timeframe: "2-4개월 전", completed: false },
  { id: "10", title: "허니문 예약", category: "허니문", timeframe: "2-4개월 전", completed: false },
  { id: "11", title: "폐백 준비", category: "예식", timeframe: "2-4개월 전", completed: false },
  { id: "12", title: "사회자 섭외", category: "예식", timeframe: "2-4개월 전", completed: false },

  // 1-2 months before
  { id: "13", title: "청첩장 발송", category: "청첩장", timeframe: "1-2개월 전", completed: false },
  { id: "14", title: "답례품 준비", category: "답례품", timeframe: "1-2개월 전", completed: false },
  { id: "15", title: "혼수 준비", category: "혼수", timeframe: "1-2개월 전", completed: false },
  { id: "16", title: "예식 리허설", category: "예식", timeframe: "1-2개월 전", completed: false },

  // 1 month before
  { id: "17", title: "최종 하객 수 확인", category: "하객", timeframe: "1개월 전", completed: false },
  { id: "18", title: "예식장 최종 점검", category: "예식장", timeframe: "1개월 전", completed: false },
  { id: "19", title: "웨딩카 예약", category: "교통", timeframe: "1개월 전", completed: false },
  { id: "20", title: "신혼집 준비", category: "신혼집", timeframe: "1개월 전", completed: false },
]

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [showAddTask, setShowAddTask] = useState(false)

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem("weddingTasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    } else {
      setTasks(DEFAULT_TASKS)
      localStorage.setItem("weddingTasks", JSON.stringify(DEFAULT_TASKS))
    }
  }, [])

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    setTasks(updatedTasks)
    localStorage.setItem("weddingTasks", JSON.stringify(updatedTasks))
  }

  const addTask = () => {
    if (!newTaskTitle.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      category: "기타",
      timeframe: "사용자 추가",
      completed: false,
    }

    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    localStorage.setItem("weddingTasks", JSON.stringify(updatedTasks))
    setNewTaskTitle("")
    setShowAddTask(false)
  }

  const groupedTasks = tasks.reduce(
    (acc, task) => {
      if (!acc[task.timeframe]) {
        acc[task.timeframe] = []
      }
      acc[task.timeframe].push(task)
      return acc
    },
    {} as Record<string, Task[]>,
  )

  const timeframeOrder = ["6-12개월 전", "4-6개월 전", "2-4개월 전", "1-2개월 전", "1개월 전", "사용자 추가"]

  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                전체 진행 상황
              </CardTitle>
              <CardDescription>완료된 준비 사항을 확인하세요</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">{completedCount}</p>
              <p className="text-sm text-muted-foreground">/ {totalCount}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-sm text-center text-muted-foreground">{progressPercentage.toFixed(0)}% 완료</p>
          </div>
        </CardContent>
      </Card>

      {/* Add Task Button */}
      {!showAddTask && (
        <Button onClick={() => setShowAddTask(true)} variant="outline" className="w-full h-12 border-2 border-dashed">
          <Plus className="w-4 h-4 mr-2" />새 할 일 추가
        </Button>
      )}

      {/* Add Task Form */}
      {showAddTask && (
        <Card className="border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Input
                placeholder="할 일을 입력하세요"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                className="flex-1"
              />
              <Button onClick={addTask}>추가</Button>
              <Button variant="outline" onClick={() => setShowAddTask(false)}>
                취소
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Task Groups */}
      {timeframeOrder.map((timeframe) => {
        const timeframeTasks = groupedTasks[timeframe]
        if (!timeframeTasks || timeframeTasks.length === 0) return null

        const completedInGroup = timeframeTasks.filter((t) => t.completed).length

        return (
          <Card key={timeframe} className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{timeframe}</CardTitle>
                    <CardDescription>
                      {completedInGroup} / {timeframeTasks.length} 완료
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={completedInGroup === timeframeTasks.length ? "default" : "secondary"}>
                  {completedInGroup === timeframeTasks.length ? "완료" : "진행중"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timeframeTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      id={task.id}
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-1"
                    />
                    <label htmlFor={task.id} className="flex-1 cursor-pointer">
                      <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{task.category}</p>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
