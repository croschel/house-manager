import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../user/actions';

export const init = createAsyncThunk<void, undefined>(
  'APP/INIT',
  async (_, { dispatch }) => {
    dispatch(getUser());
  }
);
