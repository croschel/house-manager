import request from '@/lib/request';
import { MarketList, Product } from '@/models/interfaces';
import { createUrlParams } from '@/utils/generators';
import { formatISO } from 'date-fns';
import { DateRange } from 'react-day-picker';

const fetchAllMarketList = async (filter?: DateRange) => {
  const query = createUrlParams({ ...filter });
  return await request.get<MarketList[]>(`/market/list${query}`);
};

const updateMarketList = async (market: MarketList) => {
  const newMarketList: MarketList = {
    ...market
  };
  return await request.put(`/market/update/${market._id}`, newMarketList);
};

const createMarketList = async (date: Date) => {
  const body: Partial<MarketList> = {
    date: formatISO(date)
  };
  return await request.post('/market/create', body);
};

const deleteMarketList = async (id: string) =>
  await request.delete(`/market/delete/${id}`);

// ######## Product Management ########
const updateProductFromMarketList = async (
  marketList: MarketList,
  newProduct: Product
) => await request.put(`/market/update-product/${marketList._id}`, newProduct);

const createNewProductForMarketList = async (
  marketList: MarketList,
  product: Partial<Product>
) => await request.post(`/market/create-product/${marketList._id}`, product);

const deleteProductFromMarketList = async (
  marketList: MarketList,
  productId: string
) => {
  const query = createUrlParams({ productId });
  return await request.delete(
    `/market/delete-product/${marketList._id}${query}`
  );
};

export const MarketService = {
  fetchAllMarketList,
  updateMarketList,
  createMarketList,
  deleteMarketList,
  updateProductFromMarketList,
  createNewProductForMarketList,
  deleteProductFromMarketList
};
