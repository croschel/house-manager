/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncThunk, createReducer } from '@reduxjs/toolkit';
import { init } from '../app/actions';
import {
  createExpense,
  getExpense,
  getExpenseList,
  updateExpense
} from '../expenses/actions';
import { ActionStatus } from '@/models/enums';
// step 1: add state field and value
interface LoadingState {
  init: ActionStatus;
  // Expenses
  createExpense: ActionStatus;
  getExpense: ActionStatus;
  getExpenseList: ActionStatus;
  updateExpense: ActionStatus;
}

const initialState: LoadingState = {
  init: ActionStatus.INITIAL,
  // Expenses
  createExpense: ActionStatus.INITIAL,
  getExpense: ActionStatus.INITIAL,
  getExpenseList: ActionStatus.INITIAL,
  updateExpense: ActionStatus.INITIAL
};

// step 2: add action to object
const asyncThunks: Record<
  keyof LoadingState,
  AsyncThunk<any, any, Record<string, unknown>>
> = {
  init,
  // Expenses
  createExpense,
  getExpense,
  getExpenseList,
  updateExpense
};

export const loadingReducer = createReducer<LoadingState>(
  initialState,
  (loading) => {
    for (const [stateKey, thunk] of Object.entries(asyncThunks) as [
      keyof LoadingState,
      AsyncThunk<any, any, Record<string, unknown>>
    ][]) {
      loading
        .addCase(thunk.pending, (state: LoadingState) => ({
          ...state,
          [stateKey]: ActionStatus.LOADING
        }))
        .addCase(thunk.fulfilled, (state: LoadingState) => ({
          ...state,
          [stateKey]: ActionStatus.SUCCESS
        }))
        .addCase(thunk.rejected, (state: LoadingState) => ({
          ...state,
          [stateKey]: ActionStatus.FAILED
        }));
    }
  }
);
