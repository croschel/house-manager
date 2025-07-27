import { RootState } from '@/reducers';

export const selectInitLoading = (state: RootState) => state.loading.init;

// User
export const selectLoginLoading = (state: RootState) => state.loading.login;
export const selectGetUserLoading = (state: RootState) => state.loading.getUser;
export const selectLogoutLoading = (state: RootState) => state.loading.logout;
export const selectCreateUserLoading = (state: RootState) =>
  state.loading.createUser;

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
export const selectUpdateMarketListLoading = (state: RootState) =>
  state.loading.updateMarketList;
export const selectCreateMarketListLoading = (state: RootState) =>
  state.loading.createMarketList;
export const selectDeleteMarketListLoading = (state: RootState) =>
  state.loading.deleteMarketList;
export const selectUpdateProductFromMarketListLoading = (state: RootState) =>
  state.loading.updateProductFromMarketList;
export const selectCreateProductFromMarketListLoading = (state: RootState) =>
  state.loading.createNewProductForMarketList;
export const selectDeleteProductFromMarketListLoading = (state: RootState) =>
  state.loading.deleteProductFromMarketList;
