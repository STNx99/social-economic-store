import { useState } from 'react'
import { Heart, Star } from 'lucide-react'
import { MockProduct } from '../../data/demo.products'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: MockProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className="text-yellow-400 fill-yellow-400"
      />
    ))
  }

  return (
    <div className="relative group">
      {product.discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold z-10 rounded">
          -{product.discount}%
        </div>
      )}
      {product.isNew && (
        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold z-10 rounded">
          NEW
        </div>
      )}
      <div 
        className="absolute top-2 right-2 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-100 z-10"
        onClick={() => setIsFavorite(!isFavorite)}
      >
        <Heart 
          size={16} 
          className={cn(
            isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"
          )} 
        />
      </div>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow border-0 py-0 gap-0">
        <div className="aspect-square bg-gray-100 overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 right-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              className="w-full rounded-none transform translate-y-full group-hover:translate-y-0 bg-black hover:bg-black/90 text-white border-0"
              variant="default"
            >
              Add To Cart
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-red-500">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mb-3">
            {renderStars()}
            <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

