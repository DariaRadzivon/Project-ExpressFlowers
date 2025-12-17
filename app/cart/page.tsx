"use client"

import { useRouter } from "next/navigation"
import { useCartStore } from "@/lib/cart-store"
import { useAuthStore } from "@/lib/auth-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { CartItem } from "@/components/cart-item"
import { ShoppingCart, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const router = useRouter()
  const { items, crystalService, toggleCrystal, getTotal } = useCartStore()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())

  const itemsTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const crystalPrice = crystalService ? 50 : 0
  const subtotal = itemsTotal + crystalPrice

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push("/auth?redirect=/checkout")
    } else {
      router.push("/checkout")
    }
  }

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-12 pb-8 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-muted mx-auto flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Ваш кошик порожній</h2>
              <p className="text-muted-foreground leading-relaxed">
                Додайте квіти з каталогу, щоб почати оформлення замовлення
              </p>
            </div>
            <Button asChild>
              <Link href="/catalog">Перейти до каталогу</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Кошик</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Checkbox id="crystal" checked={crystalService} onCheckedChange={toggleCrystal} className="mt-1" />
                <div className="flex-1">
                  <label htmlFor="crystal" className="flex items-center gap-2 font-medium cursor-pointer">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Crystal - щоб ваші квіти радували довше
                  </label>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    Спеціальна поживна речовина, яка подовжує свіжість квітів до 2 тижнів
                  </p>
                  <p className="text-sm font-medium mt-2">+ 50 грн</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Підсумок замовлення</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товари ({items.length})</span>
                  <span>{itemsTotal} грн</span>
                </div>
                {crystalService && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Crystal</span>
                    <span>{crystalPrice} грн</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Разом</span>
                <span>{subtotal} грн</span>
              </div>

              <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
                <p className="font-medium">Вартість доставки</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Розраховується на наступному кроці в залежності від суми замовлення та способу отримання
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" onClick={handleCheckout}>
                Оформити замовлення
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
