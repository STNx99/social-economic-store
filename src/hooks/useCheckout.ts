import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { PaymentMethod } from '@/interfaces'

export interface CheckoutFormData {
  firstName: string
  companyName?: string
  streetAddress: string
  apartment?: string
  townCity: string
  phoneNumber: string
  emailAddress: string
  paymentMethod: PaymentMethod
  saveInfo?: boolean
}

export interface CheckoutResult {
  orderNumber: string
  success: boolean
}

export function useCheckout() {
  const { items, getTotalPrice, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateForm = (formData: CheckoutFormData): string | null => {
    if (items.length === 0) {
      return 'Cart is empty'
    }
    if (!formData.firstName) return 'First name is required'
    if (!formData.streetAddress) return 'Street address is required'
    if (!formData.townCity) return 'Town/City is required'
    if (!formData.phoneNumber) return 'Phone number is required'
    if (!formData.emailAddress) return 'Email address is required'
    return null
  }

  const processCheckout = async (
    formData: CheckoutFormData
  ): Promise<CheckoutResult> => {
    // Validate
    const validationError = validateForm(formData)
    if (validationError) {
      setError(validationError)
      throw new Error(validationError)
    }

    setIsProcessing(true)
    setError(null)

    // Mock checkout process - simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockOrderNumber = `ORD-${Date.now()}`
        setIsProcessing(false)
        clearCart()
        
        resolve({
          orderNumber: mockOrderNumber,
          success: true,
        })
      }, 2000)
    })
  }

  return {
    processCheckout,
    isProcessing,
    error,
    items,
    getTotalPrice,
  }
}

