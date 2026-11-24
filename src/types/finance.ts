export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  description: string | null;
  transactionDate: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    type: TransactionType;
  };
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: PaginationMeta | null;
}

export interface CreateCategoryDto {
  name: string;
  type: TransactionType;
}

export interface UpdateCategoryDto {
  name?: string;
  type?: TransactionType;
}

export interface CreateTransactionDto {
  title: string;
  amount: number;
  type: TransactionType;
  description?: string | null;
  transactionDate: string;
  categoryId: string;
}

export interface UpdateTransactionDto {
  title?: string;
  amount?: number;
  type?: TransactionType;
  description?: string | null;
  transactionDate?: string;
  categoryId?: string;
}

export interface TransactionQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: TransactionType;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}
