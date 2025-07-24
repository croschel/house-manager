import { RootState } from '..';

export const selectFilteredExpenses = (state: RootState) =>
  state.expense.expenseList;
export const selectExpenseDateFilter = (state: RootState) =>
  state.expense.expenseDateFilter;
