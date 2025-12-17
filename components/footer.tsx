import { Flower2, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flower2 className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">ExpressFlowers</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Доставка свіжих квітів у Львові. Створюємо красу для ваших особливих моментів.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Навігація</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Головна
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-foreground transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-foreground transition-colors">
                  Кошик
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Інформація</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Доставка по Львову</li>
              <li>Оплата при отриманні</li>
              <li>Онлайн оплата</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Контакти</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+380 67 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@kvity-lviv.ua</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>м. Львів</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>© 2025 ExpressFlowers. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  )
}
