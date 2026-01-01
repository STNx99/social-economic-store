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
          document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=86400; SameSite=Strict`;
          document.cookie = `user=${encodeURIComponent(JSON.stringify(response.data.user))}; path=/; max-age=86400; SameSite=Strict`;
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
      // Clear cookies
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }

  getStoredUser(): User | null {
    if (typeof window !== 'undefined') {
      const raw = this.getCookie('user');
      if (raw) {
        try {
          return JSON.parse(decodeURIComponent(raw));
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  }

  private getCookie(name: string): string | null {
    if (typeof window === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return this.getCookie('accessToken');
    }
    return null;
  }
}

export const authService = new AuthService();
