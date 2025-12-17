"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import type { CartItem as CartItemType } from "@/lib/cart-store"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.name}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">{item.price}</span>
              <span className="text-sm text-muted-foreground">грн</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-destructive">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Видалити</span>
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                className="w-16 h-8 text-center"
                min="1"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">Сума</p>
              <p className="font-semibold">{item.price * item.quantity} грн</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
