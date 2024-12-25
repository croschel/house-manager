import { RootState } from '..';

export const selectMarketList = (state: RootState) =>
  state.market.allMarketList;

export const selectFilteredMarketList = (state: RootState) =>
  state.market.filteredMarketList;

export const selectMarketDateFilter = (state: RootState) =>
  state.market.marketDateFilter;
