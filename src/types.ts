export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: 'food', name: 'Food & Dining', icon: 'Utensils', color: '#ef4444' },
  { id: 'transport', name: 'Transport', icon: 'Car', color: '#3b82f6' },
  { id: 'shopping', name: 'Shopping', icon: 'ShoppingBag', color: '#a855f7' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Film', color: '#f59e0b' },
  { id: 'health', name: 'Health', icon: 'HeartPulse', color: '#10b981' },
  { id: 'utilities', name: 'Utilities', icon: 'Zap', color: '#06b6d4' },
  { id: 'salary', name: 'Salary', icon: 'Wallet', color: '#22c55e' },
  { id: 'other', name: 'Other', icon: 'MoreHorizontal', color: '#64748b' },
];
