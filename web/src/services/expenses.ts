import { request } from '@/lib/request';
import { CreateFormExpense, ExpenseData } from '@/models/interfaces';
import { createUrlParams } from '@/utils/generators';
import { generateUUId } from '@/utils/modifiers';

const fetchExpenseList = async (
  expense: Partial<Omit<ExpenseData, 'id' | 'isFixedExpense'>>
) => {
  // @ts-ignore
  let query = createUrlParams({ ...expense });
  return await request.get<ExpenseData[]>(`/expenses${query}`);
};

const fetchExpense = async (id: string) => {
  return await request.get<ExpenseData>(`/expenses/${id}`);
};

const updateExpense = async (expense: ExpenseData) => {
  const newExpense: ExpenseData = {
    ...expense,
    updatedAt: new Date().toISOString() // TODO - pass this logic to backend
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
    ownerId: 121345, // Change after have login
    ownerName: 'user', // Change after have login
    isFixedExpense: false, // TODO - pass this logic to backend
    location:
      expense.location !== undefined && expense.location
        ? expense.location
        : '',
    accountId: 'Mocked User', // Implement this once we get login
    id: generateUUId(), // TODO - pass this logic to backend
    createdAt: new Date().toISOString(), // TODO - pass this logic to backend
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
