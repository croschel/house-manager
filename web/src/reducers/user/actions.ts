import { UserService } from '@/services/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addNotificationAction } from '../notification/actions';
import { buildAppError } from '@/utils/message';
import { User } from '@/models/interfaces/user';

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

export const getUser = createAsyncThunk<User, void>(
  'USER/GET_USER',
  async (_, { dispatch }) => {
    try {
      const response = (await UserService.getUser()).data;
      return response;
    } catch (error) {
      throw dispatch(
        addNotificationAction(
          buildAppError({
            type: 'Fetch',
            description: 'Logout foi feito. Por favor, faça login novamente.'
          })
        )
      );
    }
  }
);
