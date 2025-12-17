"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/lib/cart-store"
import { useAuthStore } from "@/lib/auth-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, crystalService, getTotal, clearCart } = useCartStore()
  const { user, isAuthenticated } = useAuthStore()

  const [loading, setLoading] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("delivery")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth?redirect=/checkout")
    }
    if (items.length === 0) {
      router.push("/catalog")
    }
  }, [isAuthenticated, items, router])

  const itemsTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const crystalPrice = crystalService ? 50 : 0
  const subtotal = itemsTotal + crystalPrice

  const calculateDelivery = () => {
    if (deliveryMethod === "pickup") return 0
    if (subtotal > 1500) return 0
    if (subtotal < 1000) return 150
    return 100
  }

  const deliveryCost = calculateDelivery()
  const total = subtotal + deliveryCost

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    console.log("[v0] Starting order submission")

    // Валідація
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      toast.error("Заповніть всі обов'язкові поля")
      setLoading(false)
      return
    }

    if (deliveryMethod === "delivery" && !formData.address) {
      toast.error("Вкажіть адресу доставки")
      setLoading(false)
      return
    }

    const orderData = {
      user: {
        email: user?.email,
        name: user?.name,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      },
      items,
      crystalService,
      deliveryMethod,
      address: deliveryMethod === "delivery" ? formData.address : "Самовивіз",
      paymentMethod,
      costs: {
        items: itemsTotal,
        crystal: crystalPrice,
        delivery: deliveryCost,
        total,
      },
      timestamp: new Date().toISOString(),
    }

    console.log("[v0] Order data prepared:", orderData)

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      console.log("[v0] API response status:", response.status)

      if (response.ok) {
        const result = await response.json()
        console.log("[v0] Order created successfully:", result)
        clearCart()
        window.location.href = `/success?orderId=${result.orderId}`
      } else {
        const errorText = await response.text()
        console.error("[v0] Order creation failed:", errorText)
        toast.error("Помилка при оформленні замовлення")
      }
    } catch (error) {
      console.error("[v0] Order submission error:", error)
      toast.error("Помилка при оформленні замовлення")
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated() || items.length === 0) {
    return null
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Оформлення замовлення</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Контактна інформація</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      Ім'я <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Прізвище <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Телефон <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+380 XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Спосіб отримання</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={deliveryMethod} onValueChange={(v) => setDeliveryMethod(v as "pickup" | "delivery")}>
                  <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <div className="flex-1">
                      <Label htmlFor="delivery" className="font-medium cursor-pointer">
                        Доставка за адресою
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {subtotal > 1500 ? "Безкоштовна доставка" : subtotal < 1000 ? "150 грн" : "100 грн"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <div className="flex-1">
                      <Label htmlFor="pickup" className="font-medium cursor-pointer">
                        Самовивіз
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">Безкоштовно</p>
                    </div>
                  </div>
                </RadioGroup>

                {deliveryMethod === "delivery" && (
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Адреса доставки у м. Львів <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="address"
                      placeholder="вул. Грушевського, 1, кв. 10"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required={deliveryMethod === "delivery"}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Спосіб оплати</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "card" | "cash")}>
                  <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4">
                    <RadioGroupItem value="card" id="card" />
                    <div className="flex-1">
                      <Label htmlFor="card" className="font-medium cursor-pointer">
                        Оплата карткою онлайн
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">Visa, Mastercard</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4">
                    <RadioGroupItem value="cash" id="cash" />
                    <div className="flex-1">
                      <Label htmlFor="cash" className="font-medium cursor-pointer">
                        Готівкою при отриманні
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">Оплата кур'єру або при самовивозі</p>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Ваше замовлення</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span>{item.price * item.quantity} грн</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Товари</span>
                    <span>{itemsTotal} грн</span>
                  </div>
                  {crystalService && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Crystal</span>
                      <span>{crystalPrice} грн</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>{deliveryCost === 0 ? "Безкоштовно" : `${deliveryCost} грн`}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>До сплати</span>
                  <span>{total} грн</span>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Оформлення..." : "Підтвердити замовлення"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
