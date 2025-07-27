import { RootState } from '..';

export const selectMarketListSelected = (state: RootState) =>
  state.market.selectedMarketList;

export const selectMarketList = (state: RootState) =>
  state.market.allMarketList;

export const selectMarketDateFilter = (state: RootState) =>
  state.market.marketDateFilter;
