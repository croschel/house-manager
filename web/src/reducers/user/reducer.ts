import { createReducer } from '@reduxjs/toolkit';

import * as userActions from './actions';
import { User } from '@/models/interfaces/user';

export interface UserState {
  token?: string;
  user?: User;
}

const initialState: UserState = {
  token: undefined,
  user: undefined
};

export const UserReducer = createReducer(initialState, (user) => {
  user
    .addCase(userActions.login.fulfilled, (state: UserState, { payload }) => ({
      ...state,
      token: ''
    }))
    .addCase(
      userActions.getUser.fulfilled,
      (state: UserState, { payload }) => ({
        ...state,
        user: payload
      })
    );
});
