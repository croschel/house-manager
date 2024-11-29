import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { AppReducer } from './app/reducer';
import { loadingReducer } from './loading/reducer';
import { ExpenseReducer } from './expenses/reducer';
import { NotificationReducer } from './notification/reducer';

export const store = configureStore({
  reducer: {
    app: AppReducer,
    loading: loadingReducer,
    expense: ExpenseReducer,
    notification: NotificationReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
