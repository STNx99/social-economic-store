import { apiClient } from './api';
import { User, ApiResponse } from '@/interfaces';

class UserService {

  async getUser(id: string): Promise<ApiResponse<User>> {
    return await apiClient.get<ApiResponse<User>>(`/users/${id}`);
  }


  async getCurrentUser(): Promise<ApiResponse<User>> {
    return await apiClient.get<ApiResponse<User>>('/users/me');
  }


  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return await apiClient.put<ApiResponse<User>, Partial<User>>(
      '/users/me',
      data
    );
  }
}

export const userService = new UserService();
