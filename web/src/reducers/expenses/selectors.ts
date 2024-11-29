import { RootState } from '..';

export const selectExpenseList = (state: RootState) =>
  state.expense.expenseList;
