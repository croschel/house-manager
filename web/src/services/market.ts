import { request } from '@/lib/request';
import { StatusList } from '@/models/enums';
import { MarketList } from '@/models/interfaces';
import { createUrlParams } from '@/utils/generators';
import { generateUUId } from '@/utils/modifiers';

const fetchAllMarketList = (
  market: Partial<Omit<MarketList, 'id' | 'products'>>
) => {
  let query = createUrlParams({ ...market });
  return request.get<MarketList[]>(`/markets${query}`);
};

const fetchMarketById = (id: string) => {
  return request.get<MarketList>(`/markets/${id}`);
};

const updateMarketList = (market: MarketList) => {
  const newMarketList: MarketList = {
    ...market,
    updatedAt: new Date().toISOString()
  };
  return request.put(`/markets/${market.id}`, newMarketList);
};

const createMarketList = (date: Date) => {
  const body: Partial<MarketList> = {
    id: generateUUId(),
    accountId: 'Mocked User', // Implement this once we get login
    location: '',
    createdAt: new Date().toISOString(),
    status: StatusList.ACTIVE,
    totalValue: 0,
    effectiveMonth: date.getMonth() + 1,
    effectiveYear: date.getFullYear(),
    products: [],
    updatedAt: ''
  };
  return request.post('/markets', body);
};

const deleteMarketList = (id: string) => {
  return request.delete(`/markets/${id}`);
};

export const MarketService = {
  fetchAllMarketList,
  fetchMarketById,
  updateMarketList,
  createMarketList,
  deleteMarketList
};
