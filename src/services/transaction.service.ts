import { apiClient } from '@/lib/api-client';
import {
  Transaction,
  FinancialSummary,
  CreateTransactionDto,
  UpdateTransactionDto,
  TransactionQueryParams,
  ApiResponse,
} from '@/types/finance';

export const transactionService = {
  async getTransactions(
    params?: TransactionQueryParams,
  ): Promise<ApiResponse<Transaction[]>> {
    return apiClient.get<Transaction[]>('/transactions', params);
  },

  async getTransactionSummary(): Promise<ApiResponse<FinancialSummary>> {
    return apiClient.get<FinancialSummary>('/transactions/summary');
  },

  async getTransactionById(id: string): Promise<ApiResponse<Transaction>> {
    return apiClient.get<Transaction>(`/transactions/${id}`);
  },

  async createTransaction(
    dto: CreateTransactionDto,
  ): Promise<ApiResponse<Transaction>> {
    return apiClient.post<Transaction>('/transactions', dto);
  },

  async updateTransaction(
    id: string,
    dto: UpdateTransactionDto,
  ): Promise<ApiResponse<Transaction>> {
    return apiClient.patch<Transaction>(`/transactions/${id}`, dto);
  },

  async deleteTransaction(id: string): Promise<ApiResponse<null>> {
    return apiClient.delete<null>(`/transactions/${id}`);
  },
};
