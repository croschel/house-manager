import { createReducer } from '@reduxjs/toolkit';

import * as AppActions from './actions';

interface AppState {
  appVersion: string;
  counter: number;
}

const initialState: AppState = {
  appVersion: '',
  counter: 0
};

export const AppReducer = createReducer(initialState, (app) => {
  app
    .addCase(AppActions.increment, (state: AppState) => ({
      ...state,
      counter: state.counter + 1
    }))
    .addCase(AppActions.decrement, (state: AppState) => ({
      ...state,
      counter: state.counter - 1
    }));
});
