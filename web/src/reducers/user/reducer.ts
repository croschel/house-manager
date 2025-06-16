import { createReducer } from '@reduxjs/toolkit';

import * as userActions from './actions';
import { User } from '@/models/interfaces/user';

export interface UserState {
  user?: User;
}

const initialState: UserState = {
  user: undefined
};

export const UserReducer = createReducer(initialState, (user) => {
  user
    .addCase(userActions.login.fulfilled, (state: UserState, { payload }) => ({
      ...state,
      user: payload
    }))
    .addCase(
      userActions.getUser.fulfilled,
      (state: UserState, { payload }) => ({
        ...state,
        user: payload
      })
    );
});
