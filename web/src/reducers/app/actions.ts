import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const increment = createAction('APP/INCREAMENT');
export const decrement = createAction('APP/DECREMENT');

export const init = createAsyncThunk<void, undefined>('APP/INIT', async () => {
  return;
});
