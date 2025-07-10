/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncThunk, createReducer } from '@reduxjs/toolkit';
import { init } from '../app/actions';
import { login, getUser, createUser, logout } from '../user/actions';
import { resetAllActionStatus } from '../loading/actions';
import {
  createExpense,
  getExpense,
  getExpenseList,
  updateExpense,
  deleteExpense
} from '../expenses/actions';
import {
  fetchAllMarketList,
  fetchMarketById,
  updateMarketList,
  createMarketList,
  deleteMarketList,
  updateProductFromMarketList,
  createNewProductForMarketList,
  deleteProductFromMarketList
} from '../market/actions';
import { ActionStatus } from '@/models/enums';
// step 1: add state field and value
interface LoadingState {
  init: ActionStatus;
  // User
  login: ActionStatus;
  getUser: ActionStatus;
  logout: ActionStatus;
  createUser: ActionStatus;
  // Expenses
  createExpense: ActionStatus;
  getExpense: ActionStatus;
  getExpenseList: ActionStatus;
  updateExpense: ActionStatus;
  deleteExpense: ActionStatus;
  // Market
  fetchAllMarketList: ActionStatus;
  fetchMarketById: ActionStatus;
  updateMarketList: ActionStatus;
  createMarketList: ActionStatus;
  deleteMarketList: ActionStatus;
  updateProductFromMarketList: ActionStatus;
  createNewProductForMarketList: ActionStatus;
  deleteProductFromMarketList: ActionStatus;
}

const initialState: LoadingState = {
  init: ActionStatus.INITIAL,
  // User
  login: ActionStatus.INITIAL,
  getUser: ActionStatus.INITIAL,
  logout: ActionStatus.INITIAL,
  createUser: ActionStatus.INITIAL,
  // Expenses
  createExpense: ActionStatus.INITIAL,
  getExpense: ActionStatus.INITIAL,
  getExpenseList: ActionStatus.INITIAL,
  updateExpense: ActionStatus.INITIAL,
  deleteExpense: ActionStatus.INITIAL,
  // Market
  fetchAllMarketList: ActionStatus.INITIAL,
  fetchMarketById: ActionStatus.INITIAL,
  updateMarketList: ActionStatus.INITIAL,
  createMarketList: ActionStatus.INITIAL,
  deleteMarketList: ActionStatus.INITIAL,
  updateProductFromMarketList: ActionStatus.INITIAL,
  createNewProductForMarketList: ActionStatus.INITIAL,
  deleteProductFromMarketList: ActionStatus.INITIAL
};

// step 2: add action to object
const asyncThunks: Record<
  keyof LoadingState,
  AsyncThunk<any, any, Record<string, unknown>>
> = {
  // step 3: add action to object
  init,
  // User
  login,
  getUser,
  logout,
  createUser,
  // Expenses
  createExpense,
  getExpense,
  getExpenseList,
  updateExpense,
  deleteExpense,
  // Market
  fetchAllMarketList,
  fetchMarketById,
  updateMarketList,
  createMarketList,
  deleteMarketList,
  updateProductFromMarketList,
  createNewProductForMarketList,
  deleteProductFromMarketList
};

export const loadingReducer = createReducer<LoadingState>(
  initialState,
  (loading) => {
    loading.addCase(resetAllActionStatus, () => ({
      ...initialState
    }));
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
