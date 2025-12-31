import { apiClient } from './api';
import { 
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  ApiResponse, 
  PaginatedResponse 
} from '@/interfaces';

class CategoryService {

  async getCategories(): Promise<PaginatedResponse<Category>> {
    return await apiClient.get<PaginatedResponse<Category>>('/categories');
  }


  async getCategory(id: string): Promise<ApiResponse<Category>> {
    return await apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
  }

 
  async createCategory(data: CreateCategoryRequest): Promise<ApiResponse<Category>> {
    return await apiClient.post<ApiResponse<Category>, CreateCategoryRequest>(
      '/categories',
      data
    );
  }


  async updateCategory(id: string, data: UpdateCategoryRequest): Promise<ApiResponse<Category>> {
    return await apiClient.put<ApiResponse<Category>, UpdateCategoryRequest>(
      `/categories/${id}`,
      data
    );
  }


  async deleteCategory(id: string): Promise<ApiResponse<void>> {
    return await apiClient.delete<ApiResponse<void>>(`/categories/${id}`);
  }
}

export const categoryService = new CategoryService();
