import { createReducer } from '@reduxjs/toolkit';

import * as MarketActions from './actions';
import { MarketList } from '@/models/interfaces';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';

interface MarketState {
  allMarketList: MarketList[];
  marketDateFilter: DateRange | undefined;
  selectedMarketList: MarketList | undefined;
}

const initialState: MarketState = {
  allMarketList: [],
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
        allMarketList: payload ?? []
      })
    )
    .addCase(
      MarketActions.updateMarketList.fulfilled,
      (state: MarketState, { payload }) => ({
        ...state,
        allMarketList: state.allMarketList.map((list) => {
          if (list._id === payload?._id) {
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
            : state.allMarketList
      })
    )
    .addCase(
      MarketActions.deleteMarketList.fulfilled,
      (state: MarketState, { payload }) => ({
        ...state,
        allMarketList: state.allMarketList.filter(
          (list) => list._id !== payload
        )
      })
    )
    .addCase(
      MarketActions.updateProductFromMarketList.fulfilled,
      (state: MarketState, { payload }) => ({
        ...state,
        selectedMarketList: payload,
        allMarketList: state.allMarketList.map((list) => {
          if (list._id === payload?._id) {
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
          if (list._id === payload?._id) {
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
          if (list._id === payload?._id) {
            return payload;
          }
          return list;
        })
      })
    );
});
