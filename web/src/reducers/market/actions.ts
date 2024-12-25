import { MarketList } from '@/models/interfaces';
import { MarketService } from '@/services/market';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { addNotificationAction } from '../notification/actions';
import { buildAppError, buildAppSuccess } from '@/utils/message';
import { DateRange } from 'react-day-picker';
import { getFilteredResultsByRange } from '@/utils/date';

export const setMarketDateFilter = createAction<DateRange>(
  'EXPENSE/FILTER_DATE'
);

export const fetchAllMarketList = createAsyncThunk<
  {
    allMarketList: MarketList[] | undefined;
    filteredMarketList: MarketList[] | undefined;
  },
  {
    marketList: Partial<Omit<MarketList, 'id' | 'products'>>;
    filter: DateRange | undefined;
  }
>('EXPENSE/FETCH_LIST', async ({ marketList, filter }, { dispatch }) => {
  try {
    const response = (await MarketService.fetchAllMarketList(marketList)).data;
    let filteredMarketList = [] as MarketList[];
    if (!!filter) {
      filteredMarketList = getFilteredResultsByRange(
        filter?.from ?? '',
        filter?.to ?? '',
        response,
        'date'
      );
    }

    return {
      allMarketList: response,
      filteredMarketList
    };
  } catch (e) {
    throw dispatch(
      addNotificationAction(
        buildAppError({
          type: 'Fetch'
        })
      )
    );
  }
});

export const fetchMarketById = createAsyncThunk<
  MarketList | undefined,
  {
    id: string;
  }
>('MARKET/FETCH_BY_ID', async ({ id }, { dispatch }) => {
  try {
    const response = (await MarketService.fetchMarketById(id)).data;
    return response;
  } catch (e) {
    throw dispatch(
      addNotificationAction(
        buildAppError({
          type: 'Fetch'
        })
      )
    );
  }
});

export const updateMarketList = createAsyncThunk<
  MarketList | undefined,
  MarketList
>('MARKET/UPDATE', async (market, { dispatch }) => {
  try {
    const response = (await MarketService.updateMarketList(market)).data;
    return response;
  } catch (e) {
    throw dispatch(
      addNotificationAction(
        buildAppError({
          type: 'Update'
        })
      )
    );
  }
});

export const createMarketList = createAsyncThunk<MarketList | undefined, Date>(
  'MARKET/CREATE',
  async (date, { dispatch }) => {
    try {
      const response = (await MarketService.createMarketList(date)).data;
      dispatch(
        addNotificationAction(
          buildAppSuccess({
            type: 'Create'
          })
        )
      );
      return response;
    } catch (e) {
      throw dispatch(
        addNotificationAction(
          buildAppError({
            type: 'Create'
          })
        )
      );
    }
  }
);

export const deleteMarketList = createAsyncThunk<
  MarketList | undefined,
  string
>('MARKET/DELETE_LIST', async (id, { dispatch }) => {
  try {
    const response = (await MarketService.deleteMarketList(id)).data;
    return response;
  } catch (e) {
    throw dispatch(
      addNotificationAction(
        buildAppError({
          type: 'Delete'
        })
      )
    );
  }
});
