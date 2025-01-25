import { request } from '@/lib/request';
import { StatusList } from '@/models/enums';
import { MarketList } from '@/models/interfaces';
import { createUrlParams } from '@/utils/generators';
import { generateUUId } from '@/utils/modifiers';
import { formatISO, getMonth, getYear } from 'date-fns';

const fetchAllMarketList = async (
  market: Partial<Omit<MarketList, 'id' | 'products'>>
) => {
  let query = createUrlParams({ ...market });
  return await request.get<MarketList[]>(`/market-list${query}`);
};

const fetchMarketById = async (id: string) => {
  return await request.get<MarketList>(`/market-list/${id}`);
};

const updateMarketList = async (market: MarketList) => {
  const newMarketList: MarketList = {
    ...market,
    effectiveMonth: getMonth(market.date) + 1,
    effectiveYear: getYear(market.date),
    updatedAt: new Date().toISOString()
  };
  return await request.put(`/market-list/${market.id}`, newMarketList);
};

const createMarketList = async (date: Date) => {
  const body: Partial<MarketList> = {
    id: generateUUId(),
    accountId: 'Mocked User', // Implement this once we get login
    location: '',
    createdAt: new Date().toISOString(),
    status: StatusList.ACTIVE,
    totalValue: 0,
    date: formatISO(date),
    effectiveMonth: getMonth(date) + 1,
    effectiveYear: getYear(date),
    products: [],
    updatedAt: ''
  };
  console.log(body);
  return await request.post('/market-list', body);
};

const deleteMarketList = async (id: string) => {
  return await request.delete(`/market-list/${id}`);
};

export const MarketService = {
  fetchAllMarketList,
  fetchMarketById,
  updateMarketList,
  createMarketList,
  deleteMarketList
};
