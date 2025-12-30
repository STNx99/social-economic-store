import { apiClient } from './api';
import {
  InventoryItem,
  InventoryMovement,
  AdjustInventoryRequest,
  ApiResponse,
  PaginatedResponse,
  InventoryQueryParams,
} from '@/interfaces';


class InventoryService {
  async getInventory(params?: InventoryQueryParams): Promise<PaginatedResponse<InventoryItem>> {
    return await apiClient.get<PaginatedResponse<InventoryItem>>('/inventory', params);
  }

  async getInventoryByVariant(variantId: string): Promise<ApiResponse<InventoryItem>> {
    return await apiClient.get<ApiResponse<InventoryItem>>(`/inventory/${variantId}`);
  }

  async getMovements(variantId: string): Promise<PaginatedResponse<InventoryMovement>> {
    return await apiClient.get<PaginatedResponse<InventoryMovement>>(`/inventory/${variantId}/movements`);
  }

  async adjustInventory(variantId: string, data: AdjustInventoryRequest): Promise<ApiResponse<InventoryItem>> {
    return await apiClient.post<ApiResponse<InventoryItem>, AdjustInventoryRequest>(
      `/inventory/${variantId}/adjust`,
      data
    );
  }
}

export const inventoryService = new InventoryService();
