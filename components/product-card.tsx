"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCartStore } from "@/lib/cart-store"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
  onViewDetails: (product: Product) => void
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

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
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div onClick={() => onViewDetails(product)}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-2 right-2">{product.category}</Badge>
        </div>
      </div>

      <CardContent className="p-4" onClick={() => onViewDetails(product)}>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">{product.price}</span>
          <span className="text-sm text-muted-foreground">грн</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Додати в кошик
        </Button>
      </CardFooter>
    </Card>
  )
}
