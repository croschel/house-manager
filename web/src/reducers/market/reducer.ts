import { createReducer } from '@reduxjs/toolkit';

import * as MarketActions from './actions';
import { MarketList } from '@/models/interfaces';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';

interface MarketState {
  allMarketList: MarketList[];
  filteredMarketList: MarketList[];
  marketDateFilter: DateRange | undefined;
  selectedMarketList: MarketList | undefined;
}

const initialState: MarketState = {
  allMarketList: [],
  filteredMarketList: [],
  selectedMarketList: undefined,
  marketDateFilter: {
    from: subDays(new Date(), 30),
    to: new Date()
  }
};

export const MarketReducer = createReducer(initialState, (market) => {
  market
    .addCase(
      MarketActions.setMarketListSelected,
      (state: MarketState, { payload }) => ({
        ...state,
        selectedMarketList: payload
      })
    )
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
        allMarketList: state.allMarketList.map((list) => {
          if (list.id === payload?.id) {
            return payload;
          }
          return list;
        }),
        filteredMarketList: state.filteredMarketList.map((list) => {
          if (list.id === payload?.id) {
            return payload;
          }
          return list;
        })
      })
    )
    .addCase(
      MarketActions.updateMarketList.fulfilled,
      (state: MarketState, { payload }) => ({
        ...state,
        allMarketList: state.allMarketList.map((list) => {
          if (list.id === payload?.id) {
            return payload;
          }
          return list;
        }),
        filteredMarketList: state.filteredMarketList.map((list) => {
          if (list.id === payload?.id) {
            return payload;
          }
          return list;
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
          (list) => list.id !== payload
        ),
        filteredMarketList: state.filteredMarketList.filter(
          (list) => list.id !== payload
        )
      })
    )
    .addCase(
      MarketActions.updateProductFromMarketList.fulfilled,
      (state: MarketState, { payload }) => ({
        ...state,
        selectedMarketList: payload,
        allMarketList: state.allMarketList.map((list) => {
          if (list.id === payload?.id) {
            return payload;
          }
          return list;
        }),
        filteredMarketList: state.filteredMarketList.map((list) => {
          if (list.id === payload?.id) {
            return payload;
          }
          return list;
        })
      })
    )
    .addCase(
      MarketActions.createNewProductForMarketList.fulfilled,
      (state: MarketState, { payload }) => ({
        ...state,
        selectedMarketList: payload,
        allMarketList: state.allMarketList.map((list) => {
          if (list.id === payload?.id) {
            return payload;
          }
          return list;
        }),
        filteredMarketList: state.filteredMarketList.map((list) => {
          if (list.id === payload?.id) {
            return payload;
          }
          return list;
        })
      })
    )
    .addCase(
      MarketActions.deleteProductFromMarketList.fulfilled,
      (state: MarketState, { payload }) => ({
        ...state,
        selectedMarketList: payload,
        allMarketList: state.allMarketList.map((list) => {
          if (list.id === payload?.id) {
            return payload;
          }
          return list;
        }),
        filteredMarketList: state.filteredMarketList.map((list) => {
          if (list.id === payload?.id) {
            return payload;
          }
          return list;
        })
      })
    );
});
