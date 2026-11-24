'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/services/category.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@/types/finance';

export const CATEGORIES_QUERY_KEY = ['categories'];

export function useCategories(params?: { type?: string; search?: string }) {
  return useQuery({
    queryKey: [CATEGORIES_QUERY_KEY, params],
    queryFn: async () => {
      const res = await categoryService.getCategories(params);
      return res.data;
    },
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: [CATEGORIES_QUERY_KEY, id],
    queryFn: async () => {
      const res = await categoryService.getCategoryById(id);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCategoryDto) => categoryService.createCategory(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCategoryDto }) =>
      categoryService.updateCategory(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}
