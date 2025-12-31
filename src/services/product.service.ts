import { apiClient } from './api';
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ApiResponse,
  PaginatedResponse,
  ProductQueryParams,
} from '@/interfaces';

class ProductService {

  async getProducts(params?: ProductQueryParams): Promise<PaginatedResponse<Product>> {
    return await apiClient.get<PaginatedResponse<Product>>('/products', params);
  }


  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
  }


  async createProduct(data: CreateProductRequest): Promise<ApiResponse<Product>> {
    return await apiClient.post<ApiResponse<Product>, CreateProductRequest>(
      '/products',
      data
    );
  }


  async updateProduct(id: string, data: UpdateProductRequest): Promise<ApiResponse<Product>> {
    return await apiClient.put<ApiResponse<Product>, UpdateProductRequest>(
      `/products/${id}`,
      data
    );
  }


  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return await apiClient.delete<ApiResponse<void>>(`/products/${id}`);
  }


  async generateUploadUrl(fileName: string): Promise<ApiResponse<{ url: string; key: string }>> {
    return await apiClient.post<ApiResponse<{ url: string; key: string }>, { fileName: string }>(
      '/products/upload-url',
      { fileName }
    );
  }


  async approveProduct(id: string): Promise<ApiResponse<Product>> {
    return await apiClient.patch<ApiResponse<Product>, {}>(
      `/products/${id}/approve`,
      {}
    );
  }
}

export const productService = new ProductService();
