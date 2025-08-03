import { CreateFormExpense, ExpenseData } from '@/models/interfaces';
import { ExpenseService } from '@/services/expenses';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { addNotificationAction } from '../notification/actions';
import { buildAppError, buildAppSuccess } from '@/utils/message';
import { DateRange } from 'react-day-picker';

export const setExpenseDateFilter = createAction<DateRange>(
  'EXPENSE/FILTER_DATE'
);

export const getExpenseList = createAsyncThunk<
  {
    expenses: ExpenseData[] | undefined;
    filteredExpenses: ExpenseData[] | undefined;
  },
  {
    expense: Partial<Omit<ExpenseData, 'id' | 'isFixedExpense'>>;
    filter: DateRange | undefined;
  }
>('EXPENSE/FETCH_LIST', async ({ filter }, { dispatch }) => {
  try {
    const response = (await ExpenseService.fetchExpenseList(filter)).data;
    let filteredExpenses = [] as ExpenseData[];
    return {
      expenses: response,
      filteredExpenses
    };
  } catch (e) {
    throw dispatch(
      addNotificationAction(
        buildAppError({
          type: 'Fetch'
        })
      )
    );
  }
});

export const updateExpense = createAsyncThunk<
  ExpenseData | undefined,
  ExpenseData
>('EXPENSE/UPDATE', async (expense, { dispatch }) => {
  try {
    const response = (await ExpenseService.updateExpense(expense)).data;
    dispatch(
      addNotificationAction(
        buildAppSuccess({
          type: 'Update'
        })
      )
    );
    return response;
  } catch (e) {
    throw dispatch(
      addNotificationAction(
        buildAppError({
          type: 'Update'
        })
      )
    );
  }
});

export const createExpense = createAsyncThunk<
  ExpenseData | undefined,
  CreateFormExpense
>('EXPENSE/CREATE', async (expense, { dispatch }) => {
  try {
    const response = (await ExpenseService.createExpense(expense)).data;
    dispatch(
      addNotificationAction(
        buildAppSuccess({
          type: 'Create'
        })
      )
    );
    return response;
  } catch (e) {
    throw dispatch(
      addNotificationAction(
        buildAppError({
          type: 'Create'
        })
      )
    );
  }
});

export const deleteExpense = createAsyncThunk<
  ExpenseData | undefined,
  { expense: ExpenseData }
>('EXPENSE/DELETE', async ({ expense }, { dispatch }) => {
  try {
    (await ExpenseService.deleteExpense(expense._id)).data;
    dispatch(
      addNotificationAction(
        buildAppSuccess({
          type: 'Delete'
        })
      )
    );
    return expense;
  } catch (e) {
    throw dispatch(
      addNotificationAction(
        buildAppError({
          type: 'Delete'
        })
      )
    );
  }
});
