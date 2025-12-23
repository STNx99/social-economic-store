export interface CartItem {
  id: string
  cartId: string
  variantId: string
  productId: string
  productName: string
  variantName: string
  quantity: number
  price: number
  imageUrl: string
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  subtotal: number
  discount: number
  total: number
  itemCount: number
  updatedAt: string
}

export interface AddToCartRequest {
  variantId: string
  quantity: number
}

export interface UpdateCartItemRequest {
  quantity: number
}
