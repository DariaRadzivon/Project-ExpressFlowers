"use client"

import Link from "next/link"
import { ShoppingCart, User, Flower2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { useAuthStore } from "@/lib/auth-store"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const items = useCartStore((state) => state.items)
  const user = useAuthStore((state) => state.user)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Flower2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">ExpressFlowers</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Головна
          </Link>
          <Link
            href="/catalog"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Каталог
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/auth">
              <User className="h-5 w-5" />
              <span className="sr-only">{user ? user.name : "Увійти"}</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {itemCount}
                </Badge>
              )}
              <span className="sr-only">Кошик ({itemCount})</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
