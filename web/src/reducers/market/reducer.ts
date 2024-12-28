import { createReducer } from '@reduxjs/toolkit';

import * as MarketActions from './actions';
import { MarketList } from '@/models/interfaces';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';

interface MarketState {
  allMarketList: MarketList[];
  filteredMarketList: MarketList[];
  marketDateFilter: DateRange | undefined;
}

const initialState: MarketState = {
  allMarketList: [],
  filteredMarketList: [],
  marketDateFilter: {
    from: subDays(new Date(), 30),
    to: new Date()
  }
};

export const MarketReducer = createReducer(initialState, (market) => {
  market
    .addCase(
      MarketActions.setMarketDateFilter,
      (state: MarketState, { payload }) => ({
        ...state,
        marketDateFilter: payload
      })
    )
    .addCase(
      MarketActions.fetchAllMarketList.fulfilled,
      (state: MarketState, { payload }) => ({
        ...state,
        allMarketList: payload.allMarketList ?? [],
        filteredMarketList: payload.filteredMarketList ?? []
      })
    )
    .addCase(
      MarketActions.fetchMarketById.fulfilled,
      (state: MarketState, { payload }) => ({
        ...state,
        allMarketList: state.allMarketList.map((expense) => {
          if (expense.id === payload?.id) {
            return payload;
          }
          return expense;
        }),
        filteredMarketList: state.filteredMarketList.map((expense) => {
          if (expense.id === payload?.id) {
            return payload;
          }
          return expense;
        })
      })
    )
    .addCase(
      MarketActions.updateMarketList.fulfilled,
      (state: MarketState, { payload }) => ({
        ...state,
        allMarketList: state.allMarketList.map((expense) => {
          if (expense.id === payload?.id) {
            return payload;
          }
          return expense;
        }),
        filteredMarketList: state.filteredMarketList.map((expense) => {
          if (expense.id === payload?.id) {
            return payload;
          }
          return expense;
        })
      })
    )
    .addCase(
      MarketActions.createMarketList.fulfilled,
      (state: MarketState, { payload }) => ({
        ...state,
        allMarketList:
          payload !== undefined
            ? [...state.allMarketList, payload]
            : state.allMarketList,
        filteredMarketList:
          payload !== undefined
            ? [...state.filteredMarketList, payload]
            : state.filteredMarketList
      })
    )
    .addCase(
      MarketActions.deleteMarketList.fulfilled,
      (state: MarketState, { payload }) => ({
        ...state,
        allMarketList: state.allMarketList.filter(
          (expense) => expense.id !== payload
        ),
        filteredMarketList: state.filteredMarketList.filter(
          (expense) => expense.id !== payload
        )
      })
    );
});
