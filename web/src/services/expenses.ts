import { request } from '@/lib/request';
import { CreateFormExpense, ExpenseData } from '@/models/interfaces';
import { createUrlParams } from '@/utils/generators';
import { DateRange } from 'react-day-picker';

const fetchExpenseList = async (filter: DateRange | undefined) => {
  let query = createUrlParams({ ...filter });
  return await request.get<ExpenseData[]>(`/expense/list${query}`);
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
  const newExpense: Partial<ExpenseData> = {
    ...expense,
    value: Number(expense.value),
    ownerId: 121345, // Change after have login
    accountId: 'Mocked User', // Implement this once we get login
    isFixedExpense: false, // TODO - pass this logic to backend
    location:
      expense.location !== undefined && expense.location ? expense.location : ''
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
