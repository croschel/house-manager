import { ExpenseData } from '@/models/interfaces';
import { ExpenseService } from '@/services/expenses';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addNotificationAction } from '../notification/actions';
import { buildAppError } from '@/utils/message';

export const getExpenseList = createAsyncThunk<
  ExpenseData[] | undefined,
  Partial<Omit<ExpenseData, 'id' | 'isFixedExpense'>>
>('EXPENSE/FETCH_LIST', async (params, { dispatch }) => {
  try {
    return (await ExpenseService.fetchExpenseList(params)).data;
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

export const getExpense = createAsyncThunk<ExpenseData | undefined, string>(
  'EXPENSE/FETCH',
  async (id, { dispatch }) => {
    try {
      return (await ExpenseService.fetchExpense(id)).data;
    } catch (e) {
      throw dispatch(
        addNotificationAction(
          buildAppError({
            type: 'Fetch'
          })
        )
      );
    }
  }
);

export const updateExpense = createAsyncThunk<
  ExpenseData | undefined,
  ExpenseData
>('EXPENSE/UPDATE', async (expense, { dispatch }) => {
  try {
    return (await ExpenseService.updateExpense(expense)).data;
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
  ExpenseData
>('EXPENSE/CREATE', async (expense, { dispatch }) => {
  try {
    return (await ExpenseService.createExpense(expense)).data;
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
