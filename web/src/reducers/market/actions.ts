import { MarketList, Product } from '@/models/interfaces';
import { MarketService } from '@/services/market';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { addNotificationAction } from '../notification/actions';
import { buildAppError, buildAppSuccess } from '@/utils/message';
import { DateRange } from 'react-day-picker';
import { getFilteredResultsByRange } from '@/utils/date';

export const setMarketDateFilter =
  createAction<DateRange>('MARKET/FILTER_DATE');

export const setMarketListSelected = createAction<MarketList | undefined>(
  'MARKET/SELECTED_LIST'
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
>('MARKET/FETCH_LIST', async ({ marketList, filter }, { dispatch }) => {
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
      console.log('action :: ', date);
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

export const deleteMarketList = createAsyncThunk<string, string>(
  'MARKET/DELETE_LIST',
  async (id, { dispatch }) => {
    try {
      await MarketService.deleteMarketList(id);
      dispatch(
        addNotificationAction(
          buildAppSuccess({
            type: 'Delete'
          })
        )
      );
      return id;
    } catch (e) {
      throw dispatch(
        addNotificationAction(
          buildAppError({
            type: 'Delete'
          })
        )
      );
    }
  }
);

export const createNewProductForMarketList = createAsyncThunk<
  MarketList | undefined,
  { marketList: MarketList; newProduct: Partial<Product> }
>(
  'MARKET/CREATE_NEW_PRODUCT',
  async ({ marketList, newProduct }, { dispatch }) => {
    try {
      const response = (
        await MarketService.createNewProductForMarketList(
          marketList,
          newProduct
        )
      ).data;
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

export const updateProductFromMarketList = createAsyncThunk<
  MarketList | undefined,
  { marketList: MarketList; newProduct: Product }
>('MARKET/UPDATE_PRODUCT', async ({ marketList, newProduct }, { dispatch }) => {
  try {
    const response = (
      await MarketService.updateProductFromMarketList(marketList, newProduct)
    ).data;
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

export const deleteProductFromMarketList = createAsyncThunk<
  MarketList,
  { marketList: MarketList; productId: string }
>('MARKET/DELETE_PRODUCT', async ({ marketList, productId }, { dispatch }) => {
  try {
    return await MarketService.deleteProductFromMarketList(
      marketList,
      productId
    );
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
