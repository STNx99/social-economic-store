import { PaymentMethod, PaymentStatus } from './payment'
import { ShipmentStatus } from './shipment'

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipping' | 'delivered' | 'cancelled' | 'returned'

export interface OrderItem {
  id: string
  orderId: string
  variantId: string
  productId: string
  productName: string
  variantName: string
  quantity: number
  price: number
  imageUrl: string
}

export interface ShippingAddress {
  fullName: string
  phone: string
  address: string
  ward: string
  district: string
  province: string
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  shippingFee: number
  discount: number
  total: number
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  createdAt: string
  updatedAt: string
}

export interface CreateOrderRequest {
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  note?: string
}

export interface CancelOrderRequest {
  reason: string
}

export interface UpdateOrderStatusRequest {
  status: string
  note?: string
}

export interface ReturnOrderRequest {
  reason: string
  items: Array<{
    orderItemId: string
    quantity: number
  }>
}

export interface OrderTimeline {
  status: OrderStatus
  timestamp: string
  location?: string
  note?: string
}