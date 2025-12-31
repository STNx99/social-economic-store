import { apiClient } from './api';
import {
  Cart,
  AddToCartRequest,
  UpdateCartItemRequest,
  ApiResponse,
} from '@/interfaces';

class CartService {

  async getCart(): Promise<ApiResponse<Cart>> {
    return await apiClient.get<ApiResponse<Cart>>('/cart');
  }


  async addToCart(data: AddToCartRequest): Promise<ApiResponse<Cart>> {
    return await apiClient.post<ApiResponse<Cart>, AddToCartRequest>(
      '/cart/add',
      data
    );
  }


  async updateCartItem(itemId: string, data: UpdateCartItemRequest): Promise<ApiResponse<Cart>> {
    return await apiClient.put<ApiResponse<Cart>, UpdateCartItemRequest>(
      '/cart/update',
      { ...data, itemId }
    );
  }


  async removeFromCart(itemId: string): Promise<ApiResponse<Cart>> {
    return await apiClient.delete<ApiResponse<Cart>>(`/cart/remove?itemId=${itemId}`);
  }


  async clearCart(): Promise<ApiResponse<Cart>> {
    return await apiClient.delete<ApiResponse<Cart>>('/cart/clear');
  }
}

export const cartService = new CartService();
