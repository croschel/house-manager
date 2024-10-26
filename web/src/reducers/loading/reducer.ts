/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncThunk, createReducer } from '@reduxjs/toolkit';
import { init } from '../app/actions';
// step 1: add state field and value
interface LoadingState {
  init: number;
}

const initialState: LoadingState = {
  init: 0
};

// step 2: add action to object
const asyncThunks: Record<
  keyof LoadingState,
  AsyncThunk<any, any, Record<string, unknown>>
> = {
  init
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
          [stateKey]: Math.max(state[stateKey], 0) + 1
        }))
        .addCase(thunk.fulfilled, (state: LoadingState) => ({
          ...state,
          [stateKey]: Math.max(state[stateKey], 1) - 1
        }))
        .addCase(thunk.rejected, (state: LoadingState) => ({
          ...state,
          [stateKey]: Math.max(state[stateKey], 1) - 1
        }));
    }
  }
);
