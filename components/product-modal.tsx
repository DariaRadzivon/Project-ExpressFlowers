"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, Clock, Award } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCartStore } from "@/lib/cart-store"
import { toast } from "sonner"

interface ProductModalProps {
  product: Product | null
  open: boolean
  onClose: () => void
}

export function ProductModal({ product, open, onClose }: ProductModalProps) {
  const addItem = useCartStore((state) => state.addItem)

  if (!product) return null

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
    toast.success("Товар додано до кошика", {
      description: product.name,
    })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>

          <div className="space-y-6">
            <div>
              <Badge className="mb-4">{product.category}</Badge>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Package className="h-5 w-5 text-primary" />
                <span>Професійна упаковка включена</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-5 w-5 text-primary" />
                <span>Доставка протягом 2-4 годин</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Award className="h-5 w-5 text-primary" />
                <span>Гарантія свіжості квітів</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">{product.price}</span>
                <span className="text-lg text-muted-foreground">грн</span>
              </div>

              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Додати в кошик
              </Button>
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <h4 className="font-semibold">Умови доставки</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Безкоштовна доставка від 1500 грн</li>
                <li>• До 1000 грн - доставка 150 грн</li>
                <li>• 1000-1500 грн - доставка 100 грн</li>
                <li>• Самовивіз - безкоштовно</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
