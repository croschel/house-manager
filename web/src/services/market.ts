import { request } from '@/lib/request';
import { StatusList } from '@/models/enums';
import { MarketList } from '@/models/interfaces';
import { createUrlParams } from '@/utils/generators';
import { generateUUId } from '@/utils/modifiers';

const fetchAllMarketList = (
  market: Partial<Omit<MarketList, 'id' | 'products'>>
) => {
  let query = createUrlParams({ ...market });
  return request.get<MarketList[]>(`/market-list${query}`);
};

const fetchMarketById = (id: string) => {
  return request.get<MarketList>(`/market-list/${id}`);
};

const updateMarketList = (market: MarketList) => {
  const newMarketList: MarketList = {
    ...market,
    updatedAt: new Date().toISOString()
  };
  return request.put(`/market-list/${market.id}`, newMarketList);
};

const createMarketList = (date: Date) => {
  const body: Partial<MarketList> = {
    id: generateUUId(),
    accountId: 'Mocked User', // Implement this once we get login
    location: '',
    createdAt: new Date().toISOString(),
    status: StatusList.ACTIVE,
    totalValue: 0,
    date: date.toISOString(),
    effectiveMonth: date.getMonth() + 1,
    effectiveYear: date.getFullYear(),
    products: [],
    updatedAt: ''
  };
  return request.post('/market-list', body);
};

const deleteMarketList = (id: string) => {
  return request.delete(`/market-list/${id}`);
};

export const MarketService = {
  fetchAllMarketList,
  fetchMarketById,
  updateMarketList,
  createMarketList,
  deleteMarketList
};
