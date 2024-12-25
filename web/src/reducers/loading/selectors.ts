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
export const selectDeleteExpenseLoading = (state: RootState) =>
  state.loading.deleteExpense;

// Market
export const selectFetchAllMarketListLoading = (state: RootState) =>
  state.loading.fetchAllMarketList;
export const selectFetchMarketByIdLoading = (state: RootState) =>
  state.loading.fetchMarketById;
export const selectUpdateMarketListLoading = (state: RootState) =>
  state.loading.updateMarketList;
export const selectCreateMarketListLoading = (state: RootState) =>
  state.loading.createMarketList;
export const selectDeleteMarketListLoading = (state: RootState) =>
  state.loading.deleteMarketList;
