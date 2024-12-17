import { request } from '@/lib/request';
import { CreateFormExpense, ExpenseData } from '@/models/interfaces';
import { createUrlParams } from '@/utils/generators';
import { generateUUId } from '@/utils/modifiers';

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
  const newExpense: ExpenseData = {
    ...expense,
    updatedAt: new Date().toISOString()
  };
  return await request.put<ExpenseData>(
    `/expenses/${newExpense.id}`,
    newExpense
  );
};

const createExpense = async (expense: CreateFormExpense) => {
  const newExpense: ExpenseData = {
    ...expense,
    value: Number(expense.value),
    ownerId: 121345,
    ownerName: 'user',
    isFixedExpense: false,
    location:
      expense.location !== undefined && expense.location
        ? expense.location
        : '',
    accountId: 'Mocked User', // Implement this once we get login
    id: generateUUId(),
    createdAt: new Date().toISOString(),
    updatedAt: ''
  };
  return await request.post<ExpenseData>('/expenses', newExpense);
};

const deleteExpense = async (id: string) => {
  return await request.delete<{}>(`/expenses/${id}`);
};

export const ExpenseService = {
  fetchExpenseList,
  fetchExpense,
  updateExpense,
  createExpense,
  deleteExpense
};
