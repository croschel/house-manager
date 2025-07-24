import request from '@/lib/request';
import { CreateFormExpense, ExpenseData } from '@/models/interfaces';
import { createUrlParams } from '@/utils/generators';
import { DateRange } from 'react-day-picker';

const fetchExpenseList = async (filter: DateRange | undefined) => {
  const query = createUrlParams({ ...filter });
  return await request.get<ExpenseData[]>(`/expense/list${query}`);
};

const fetchExpense = async (id: string) => {
  return await request.get<ExpenseData>(`/expense/${id}`);
};

const createExpense = async (expense: CreateFormExpense) => {
  const newExpense: Partial<ExpenseData> = {
    ...expense,
    value: Number(expense.value),
    isFixedExpense: false,
    location:
      expense.location !== undefined && expense.location ? expense.location : ''
  };
  return await request.post<ExpenseData>('/expense/create', newExpense);
};

const updateExpense = async (expense: ExpenseData) => {
  const newExpense: ExpenseData = {
    ...expense
  };
  return await request.put<ExpenseData>(
    `/expense/update/${newExpense._id}`,
    newExpense
  );
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
