import { CreateFormExpense, ExpenseData } from '@/models/interfaces';
import { ExpenseService } from '@/services/expenses';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addNotificationAction } from '../notification/actions';
import { buildAppError, buildAppSuccess } from '@/utils/message';
import { DateRange } from 'react-day-picker';

export const getExpenseList = createAsyncThunk<
  ExpenseData[] | undefined,
  {
    expense: Partial<Omit<ExpenseData, 'id' | 'isFixedExpense'>>;
    filter: DateRange | undefined;
  }
>('EXPENSE/FETCH_LIST', async ({ expense, filter }, { dispatch }) => {
  try {
    return (await ExpenseService.fetchExpenseList(expense, filter)).data;
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
    (await ExpenseService.deleteExpense(expense.id)).data;
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
