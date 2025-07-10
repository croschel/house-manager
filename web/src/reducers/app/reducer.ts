import { createReducer } from '@reduxjs/toolkit';

interface AppState {
  appVersion: string;
  counter: number;
}

const initialState: AppState = {
  appVersion: '',
  counter: 0
};

export const AppReducer = createReducer(initialState, (app) => {});
