import { apiClient } from '@/lib/api-client';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  ApiResponse,
} from '@/types/finance';

export const categoryService = {
  async getCategories(params?: {
    type?: string;
    search?: string;
  }): Promise<ApiResponse<Category[]>> {
    return apiClient.get<Category[]>('/categories', params);
  },

  async getCategoryById(id: string): Promise<ApiResponse<Category>> {
    return apiClient.get<Category>(`/categories/${id}`);
  },

  async createCategory(
    dto: CreateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    return apiClient.post<Category>('/categories', dto);
  },

  async updateCategory(
    id: string,
    dto: UpdateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    return apiClient.patch<Category>(`/categories/${id}`, dto);
  },

  async deleteCategory(id: string): Promise<ApiResponse<null>> {
    return apiClient.delete<null>(`/categories/${id}`);
  },
};
