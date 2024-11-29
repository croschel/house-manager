import { createReducer } from '@reduxjs/toolkit';

import * as ExpenseActions from './actions';
import { ExpenseData } from '@/models/interfaces';

interface ExpenseState {
  expenseList: ExpenseData[];
}

const initialState: ExpenseState = {
  expenseList: []
};

export const ExpenseReducer = createReducer(initialState, (expense) => {
  expense
    .addCase(
      ExpenseActions.getExpenseList.fulfilled,
      (state: ExpenseState, { payload }) => ({
        ...state,
        expenseList: payload ?? []
      })
    )
    .addCase(
      ExpenseActions.getExpense.fulfilled,
      (state: ExpenseState, { payload }) => ({
        ...state,
        expenseList: state.expenseList.map((expense) => {
          if (expense.id === payload?.id) {
            return payload;
          }
          return expense;
        })
      })
    )
    .addCase(
      ExpenseActions.updateExpense.fulfilled,
      (state: ExpenseState, { payload }) => ({
        ...state,
        expenseList: state.expenseList.map((expense) => {
          if (expense.id === payload?.id) {
            return payload;
          }
          return expense;
        })
      })
    )
    .addCase(
      ExpenseActions.createExpense.fulfilled,
      (state: ExpenseState, { payload }) => ({
        ...state,
        expenseList:
          payload !== undefined
            ? [...state.expenseList, payload]
            : state.expenseList
      })
    );
});
