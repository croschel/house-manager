import { createAsyncThunk } from '@reduxjs/toolkit';

export const init = createAsyncThunk<void, undefined>('APP/INIT', async () => {
  return;
});
