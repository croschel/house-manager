import { RootState } from '..';

export const selectExpenseList = (state: RootState) =>
  state.expense.expenseList;
export const selectFilteredExpenses = (state: RootState) =>
  state.expense.filteredExpenses;
export const selectExpenseDateFilter = (state: RootState) =>
  state.expense.expenseDateFilter;
