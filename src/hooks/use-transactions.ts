'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '@/services/transaction.service';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
  TransactionQueryParams,
} from '@/types/finance';

export const TRANSACTIONS_QUERY_KEY = ['transactions'];
export const TRANSACTION_SUMMARY_KEY = ['transactions', 'summary'];

export function useTransactions(params?: TransactionQueryParams) {
  return useQuery({
    queryKey: [TRANSACTIONS_QUERY_KEY, params],
    queryFn: async () => {
      const res = await transactionService.getTransactions(params);
      return {
        data: res.data,
        meta: res.meta,
      };
    },
  });
}

export function useTransactionSummary() {
  return useQuery({
    queryKey: TRANSACTION_SUMMARY_KEY,
    queryFn: async () => {
      const res = await transactionService.getTransactionSummary();
      return res.data;
    },
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: [TRANSACTIONS_QUERY_KEY, id],
    queryFn: async () => {
      const res = await transactionService.getTransactionById(id);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateTransactionDto) =>
      transactionService.createTransaction(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: TRANSACTION_SUMMARY_KEY });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTransactionDto }) =>
      transactionService.updateTransaction(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: TRANSACTION_SUMMARY_KEY });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transactionService.deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: TRANSACTION_SUMMARY_KEY });
    },
  });
}
