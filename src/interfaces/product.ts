export interface Product {
  id: string
  name: string
  description: string
  categoryId: string
  categoryName: string
  basePrice: number
  imageUrls: string[]
  rating: number
  reviewCount: number
  isActive: boolean
  variants: ProductVariant[]
  createdAt: string
  updatedAt: string
}

export interface ProductVariant {
  id: string
  productId: string
  sku: string
  name: string
  price: number
  stock: number
  attributes: Record<string, string>
  imageUrl?: string
  isActive: boolean
}

export interface Category {
  id: string
  name: string
}

export interface CreateProductRequest {
  name: string
  description: string
  categoryId: string
  basePrice: number
  imageUrls: string[]
  isActive: boolean
}

export interface UpdateProductRequest {
  name?: string
  description?: string
  basePrice?: number
  isActive?: boolean
}

export interface CreateVariantRequest {
  sku: string
  name: string
  price: number
  stock: number
  attributes: Record<string, string>
  imageUrl?: string
}

export interface UpdateVariantRequest {
  price?: number
  stock?: number
  isActive?: boolean
}
