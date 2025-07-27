import request from '@/lib/request';
import { MarketList, Product } from '@/models/interfaces';
import { createUrlParams } from '@/utils/generators';
import { formatISO } from 'date-fns';

const fetchAllMarketList = async (
  market: Partial<Omit<MarketList, 'id' | 'products'>>
) => {
  const query = createUrlParams({ ...market });
  return await request.get<MarketList[]>(`/market/list${query}`);
};

const fetchMarketById = async (id: string) => {
  return await request.get<MarketList>(`/market-list/${id}`);
}; // TODO - Remove me

const updateMarketList = async (market: MarketList) => {
  const newMarketList: MarketList = {
    ...market
  };
  return await request.put(`/market/update/${market.id}`, newMarketList);
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
) => await request.put(`/market/update-product/${marketList.id}`, newProduct);

const createNewProductForMarketList = async (
  marketList: MarketList,
  product: Partial<Product>
) => await request.post(`/market/create-product/${marketList.id}`, product);

const deleteProductFromMarketList = async (
  marketList: MarketList,
  productId: string
) => {
  const query = createUrlParams({ productId });
  return await request.delete(
    `/market/delete-product/${marketList.id}${query}`
  );
};

export const MarketService = {
  fetchAllMarketList,
  fetchMarketById,
  updateMarketList,
  createMarketList,
  deleteMarketList,
  updateProductFromMarketList,
  createNewProductForMarketList,
  deleteProductFromMarketList
};
