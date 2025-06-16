import { UserService } from '@/services/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addNotificationAction } from '../notification/actions';
import { buildAppError, buildAppSuccess } from '@/utils/message';
import { User, UserCreate } from '@/models/interfaces/user';

export const login = createAsyncThunk<
  User,
  { email: string; password: string }
>('USER/LOGIN', async ({ email, password }, { dispatch }) => {
  try {
    await UserService.login(email, password);
    const response = (await UserService.getUser()).data;
    return response;
  } catch (error) {
    throw dispatch(
      addNotificationAction(
        buildAppError({
          type: 'Create',
          description: 'Falha ao fazer login. Verifique suas credenciais.'
        })
      )
    );
  }
});

export const getUser = createAsyncThunk<User, void>(
  'USER/GET_USER',
  async () => {
    try {
      const response = (await UserService.getUser()).data;
      console.log('User fetched:', response);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch user. Please try again later.');
    }
  }
);

export const logout = createAsyncThunk<string, void>(
  'USER/LOGOUT',
  async (_, { dispatch }) => {
    try {
      const response = (await UserService.logout()).data;
      return response;
    } catch (error) {
      throw dispatch(
        addNotificationAction(
          buildAppError({
            type: 'Update',
            description: 'Falha ao fazer logout. Por favor, tente novamente.'
          })
        )
      );
    }
  }
);

export const createUser = createAsyncThunk<User, UserCreate>(
  'USER/CREATE_USER',
  async (newUser, { dispatch }) => {
    try {
      const response = (await UserService.createUser(newUser)).data;
      dispatch(
        addNotificationAction(
          buildAppSuccess({
            type: 'Create',
            description: 'Usuário criado com sucesso!'
          })
        )
      );
      return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw dispatch(
        addNotificationAction(
          buildAppError({
            type: 'Create',
            description:
              'Falha ao criar usuário. Verifique os dados informados.'
          })
        )
      );
    }
  }
);
