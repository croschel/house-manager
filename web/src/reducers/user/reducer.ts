import { createReducer } from '@reduxjs/toolkit';

import * as userActions from './actions';

export interface UserState {
  token?: string;
}

const initialState: UserState = {
  token: undefined
};

export const UserReducer = createReducer(initialState, (user) => {
  user.addCase(
    userActions.login.fulfilled,
    (state: UserState, { payload }) => ({
      ...state,
      token: ''
    })
  );
});
