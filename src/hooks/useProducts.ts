import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/product.service'
import type { ProductQueryParams } from '@/interfaces'

export const PRODUCT_KEYS = {
  all: ['products'] as const,
  lists: () => [...PRODUCT_KEYS.all, 'list'] as const,
  list: (params?: ProductQueryParams) => [...PRODUCT_KEYS.lists(), { params }] as const,
  details: () => [...PRODUCT_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...PRODUCT_KEYS.details(), id] as const,
}

export function useProducts(params?: ProductQueryParams) {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(params),
    queryFn: async () => {
      const response = await productService.getProducts(params)
      if (!response.success) {
        throw new Error('Failed to fetch products')
      }
      return response
    },
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: PRODUCT_KEYS.detail(id),
    queryFn: async () => {
      const response = await productService.getProduct(id)
      if (!response.success) {
        throw new Error('Failed to fetch product')
      }
      return response.data
    },
    enabled: !!id,
  })
}
