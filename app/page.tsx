import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Clock, Shield, Sparkles } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 to-accent/20">
        <div className="container py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Доставка свіжих квітів у Львові
              </h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Створюємо неповторні квіткові композиції для ваших особливих моментів. Швидка доставка, свіжі квіти,
                доступні ціни.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/catalog">Переглянути каталог</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/catalog#popular">Популярні букети</Link>
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Квіткові композиції"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-balance">Чому обирають нас</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Швидка доставка</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Безкоштовна доставка при замовленні від 1500 грн
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Свіжі квіти</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Тільки найсвіжіші квіти від перевірених постачальників
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Працюємо 24/7</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Приймаємо замовлення цілодобово для вашої зручності
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Гарантія якості</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Гарантуємо свіжість та якість кожного букету
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Готові замовити квіти?</h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto text-pretty leading-relaxed">
            Перегляньте наш каталог та оберіть ідеальний букет для вашого особливого випадку
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/catalog">Перейти до каталогу</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
