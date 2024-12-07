import { RootState } from '@/reducers';

export const selectInitLoading = (state: RootState) => state.loading.init;

// Expenses
export const selectCreateExpenseLoading = (state: RootState) =>
  state.loading.createExpense;
export const selectGetExpenseLoading = (state: RootState) =>
  state.loading.getExpense;
export const selectGetExpenseListLoading = (state: RootState) =>
  state.loading.getExpenseList;
export const selectUpdateExpenseLoading = (state: RootState) =>
  state.loading.updateExpense;
