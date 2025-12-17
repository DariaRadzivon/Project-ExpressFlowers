"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Home, Package, Sparkles } from "lucide-react"
import Link from "next/link"
import { useAuthStore } from "@/lib/auth-store"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

function getDailyWish() {
  const wishes = [
    "Нехай ваш день буде наповнений яскравими фарбами та приємними сюрпризами!",
    "Хай сьогодні все складається якнайкраще, а настрій буде чудовим!",
    "Бажаємо вам гарного дня, повного теплих емоцій та приємних моментів!",
    "Нехай цей день принесе вам радість та натхнення!",
    "Хай сьогодні всі ваші мрії стають ближчими до реальності!",
    "Бажаємо вам чудового дня та незабутніх вражень!",
  ]
  return wishes[Math.floor(Math.random() * wishes.length)]
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [dailyWish, setDailyWish] = useState("")

  useEffect(() => {
    const id = searchParams.get("orderId")
    console.log("[v0] Success page loaded with orderId:", id)

    if (!id) {
      console.log("[v0] No orderId found, redirecting to home")
      router.push("/")
    } else {
      setOrderId(id)
      setTimeout(() => {
        console.log("[v0] Opening modal")
        setShowModal(true)
      }, 100)
      setDailyWish(getDailyWish())
    }
  }, [searchParams, router])

  if (!orderId) {
    return null
  }

  return (
    <div className="container py-16">
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <DialogTitle className="text-2xl text-center">Дякуємо за ваше замовлення!</DialogTitle>
            <DialogDescription className="text-center space-y-4 pt-2">
              <p className="leading-relaxed">
                Ваше замовлення <span className="font-semibold">#{orderId}</span> успішно прийнято в обробку.
              </p>
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-foreground leading-relaxed">
                  Наш менеджер зв'яжеться з вами найближчим часом для уточнення деталей замовлення та підтвердження часу
                  доставки.
                </p>
              </div>
              <div className="flex items-start gap-2 bg-accent/20 p-4 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed text-left">{dailyWish}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowModal(false)} className="w-full">
            Зрозуміло
          </Button>
        </DialogContent>
      </Dialog>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center pb-6">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl">Замовлення успішно оформлено!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-6 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Номер замовлення:</span>
                <span className="font-mono font-semibold">{orderId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Клієнт:</span>
                <span className="font-medium">{user?.name || user?.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Дата:</span>
                <span className="font-medium">{new Date().toLocaleDateString("uk-UA")}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Що далі?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ми отримали ваше замовлення і вже почали його обробку. Найближчим часом з вами зв'яжеться наш
                    менеджер для підтвердження деталей.
                  </p>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Важливо:</strong> Збережіть номер замовлення. Він знадобиться для відстеження статусу та при
                  отриманні квітів.
                </p>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button size="lg" className="w-full" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Повернутися на головну
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/catalog">Переглянути каталог</Link>
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground pt-4">
              <p>Дякуємо за замовлення у ExpressFlowers!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
