"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from "@/lib/auth-store"
import { toast } from "sonner"
import { Flower2 } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  const { login, register } = useAuthStore()

  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confirmPassword: "" })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!loginData.email || !loginData.password) {
      toast.error("Заповніть всі поля")
      return
    }

    const success = login(loginData.email, loginData.password)
    if (success) {
      toast.success("Ви успішно увійшли")
      router.push(redirect)
    } else {
      toast.error("Невірний email або пароль")
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      toast.error("Заповніть всі поля")
      return
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Паролі не співпадають")
      return
    }

    if (registerData.password.length < 6) {
      toast.error("Пароль повинен містити мінімум 6 символів")
      return
    }

    const success = register(registerData.email, registerData.password, registerData.name)
    if (success) {
      toast.success("Реєстрація успішна")
      router.push(redirect)
    } else {
      toast.error("Користувач з таким email вже існує")
    }
  }

  return (
    <div className="container py-16">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <Flower2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-semibold">Квіти Львова</span>
          </div>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вхід</TabsTrigger>
            <TabsTrigger value="register">Реєстрація</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Вхід в акаунт</CardTitle>
                <CardDescription>Увійдіть, щоб оформити замовлення</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Пароль</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Увійти
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Реєстрація</CardTitle>
                <CardDescription>Створіть акаунт для швидкого оформлення замовлень</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Ім'я</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Ваше ім'я"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Пароль</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Підтвердіть пароль</Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="••••••"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Зареєструватися
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
