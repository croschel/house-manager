import { UserService } from '@/services/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addNotificationAction } from '../notification/actions';
import { buildAppError } from '@/utils/message';

export const login = createAsyncThunk<
  { message: string },
  { email: string; password: string }
>('USER/LOGIN', async ({ email, password }, { dispatch }) => {
  try {
    const response = (await UserService.login(email, password)).data;
    return response;
  } catch (error) {
    throw dispatch(
      addNotificationAction(
        buildAppError({
          type: 'Create',
          description: 'Failed to login. Please check your credentials.'
        })
      )
    );
  }
});
