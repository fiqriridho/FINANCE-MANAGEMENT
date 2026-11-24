import * as React from 'react';
import { Input } from './input';

export interface CalendarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
}

export function Calendar({ value, onChange, className, ...props }: CalendarProps) {
  return (
    <Input
      type="date"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={className}
      {...props}
    />
  );
}
