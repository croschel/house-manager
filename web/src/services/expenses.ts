import { request } from '@/lib/request';
import { ExpenseData } from '@/models/interfaces';
import { createUrlParams } from '@/utils/generators';

const fetchExpenseList = async (
  params: Partial<Omit<ExpenseData, 'id' | 'isFixedExpense'>>
) => {
  const query = createUrlParams({ ...params });
  return await request.get<ExpenseData[]>(`/expenses${query}`);
};

const fetchExpense = async (id: string) => {
  return await request.get<ExpenseData>(`/expenses/${id}`);
};

const updateExpense = async (expense: ExpenseData) => {
  return await request.put<ExpenseData>(`/expenses/${expense.id}`, expense);
};

const createExpense = async (expense: ExpenseData) => {
  return await request.post<ExpenseData>('/expenses', expense);
};

export const ExpenseService = {
  fetchExpenseList,
  fetchExpense,
  updateExpense,
  createExpense
};
