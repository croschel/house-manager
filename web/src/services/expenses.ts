import { request } from '@/lib/request';
import { CreateFormExpense, ExpenseData } from '@/models/interfaces';
import { createUrlParams } from '@/utils/generators';
import { generateUUId } from '@/utils/modifiers';
import { formatISO } from 'date-fns';
import { DateRange } from 'react-day-picker';

const fetchExpenseList = async (
  expense: Partial<Omit<ExpenseData, 'id' | 'isFixedExpense'>>,
  filter: DateRange | undefined
) => {
  // @ts-ignore
  let query = createUrlParams({ ...expense });
  if (filter) {
    query =
      query.length > 0
        ? `${query}&_start=${formatISO(filter.from as Date)}${filter.to !== undefined ? `&_end=${formatISO(filter.to)}` : ''}`
        : `?_start=${filter.from}&_end=${filter.to}`;
  }
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
