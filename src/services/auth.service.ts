import { apiClient } from './api';
import { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  LoginResponse,
  RegisterResponse,
  ApiResponse 
} from '@/interfaces';

class AuthService {
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse & { user: User }>> {
    try {
      const response = await apiClient.post<
        ApiResponse<LoginResponse & { user: User }>, 
        LoginRequest
      >(
        '/auth/login',
        credentials
      );
      
      if (response.success && response.data) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  async register(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    try {
      const response = await apiClient.post<
        ApiResponse<RegisterResponse>, 
        RegisterRequest
      >(
        '/auth/register',
        data
      );
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
  }

  getStoredUser(): User | null {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  }

  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }
}

export const authService = new AuthService();
