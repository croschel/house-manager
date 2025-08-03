import { createReducer } from '@reduxjs/toolkit';
import * as ExpenseActions from './actions';
import { ExpenseData } from '@/models/interfaces';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';
import { isDateInRange } from '@/utils/date';

interface ExpenseState {
  expenseList: ExpenseData[];
  expenseDateFilter: DateRange;
}

const initialState: ExpenseState = {
  expenseList: [],
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
      ExpenseActions.updateExpense.fulfilled,
      (state: ExpenseState, { payload }) => ({
        ...state,
        expenseList: state.expenseList.map((expense) => {
          if (expense._id === payload?._id) {
            return payload;
          }
          return expense;
        })
      })
    )
    .addCase(
      ExpenseActions.createExpense.fulfilled,
      (state: ExpenseState, { payload }) => {
        const conditionToIncludeExpense = isDateInRange(
          payload?.date ?? '',
          state.expenseDateFilter
        );
        return {
          ...state,
          expenseList:
            payload !== undefined && conditionToIncludeExpense
              ? [...state.expenseList, payload]
              : state.expenseList
        };
      }
    )
    .addCase(
      ExpenseActions.deleteExpense.fulfilled,
      (state: ExpenseState, { payload }) => ({
        ...state,
        expenseList: state.expenseList.filter(
          (expense) => expense._id !== payload?._id
        )
      })
    );
});
