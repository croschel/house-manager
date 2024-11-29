import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getExpenseList } from '../expenses/actions';

export const increment = createAction('APP/INCREAMENT');
export const decrement = createAction('APP/DECREMENT');

export const init = createAsyncThunk<void, undefined>(
  'APP/INIT',
  async (_, { dispatch }) => {
    dispatch(getExpenseList({}));
  }
);
