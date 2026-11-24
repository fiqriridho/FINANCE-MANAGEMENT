'use client';

import * as React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  type?: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}

export function Toast({ type = 'info', message, onClose }: ToastProps) {
  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all',
        type === 'success' && 'border-emerald-200 bg-emerald-50 text-emerald-800',
        type === 'error' && 'border-rose-200 bg-rose-50 text-rose-800',
        type === 'info' && 'border-slate-200 bg-white text-slate-800',
      )}
    >
      {type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
      {type === 'error' && <AlertCircle className="h-5 w-5 text-rose-600" />}
      {type === 'info' && <Info className="h-5 w-5 text-indigo-600" />}
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-sm opacity-70 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
