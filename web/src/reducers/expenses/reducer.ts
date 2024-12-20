import { createReducer } from '@reduxjs/toolkit';

import * as ExpenseActions from './actions';
import { ExpenseData } from '@/models/interfaces';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';

interface ExpenseState {
  expenseList: ExpenseData[];
  filteredExpenses: ExpenseData[];
  expenseDateFilter: DateRange;
}

const initialState: ExpenseState = {
  expenseList: [],
  filteredExpenses: [],
  expenseDateFilter: {
    from: subDays(new Date(), 30),
    to: new Date()
  }
};

export const ExpenseReducer = createReducer(initialState, (expense) => {
  expense
    .addCase(
      ExpenseActions.setExpenseDateFilter,
      (state: ExpenseState, { payload }) => ({
        ...state,
        expenseDateFilter: payload
      })
    )
    .addCase(
      ExpenseActions.getExpenseList.fulfilled,
      (state: ExpenseState, { payload }) => ({
        ...state,
        expenseList: payload.expenses ?? [],
        filteredExpenses: payload.filteredExpenses ?? []
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
    )
    .addCase(
      ExpenseActions.deleteExpense.fulfilled,
      (state: ExpenseState, { payload }) => ({
        ...state,
        expenseList: state.expenseList.filter(
          (expense) => expense.id !== payload?.id
        )
      })
    );
});
