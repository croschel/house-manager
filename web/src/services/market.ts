import { request } from '@/lib/request';
import { StatusList } from '@/models/enums';
import { MarketList, Product } from '@/models/interfaces';
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
    effectiveMonth: getMonth(market.date) + 1, // TODO - pass this logic to backend
    effectiveYear: getYear(market.date), // TODO - pass this logic to backend
    updatedAt: new Date().toISOString() // TODO - pass this logic to backend
  };
  return await request.put(`/market-list/${market.id}`, newMarketList);
};

const createMarketList = async (date: Date) => {
  const body: Partial<MarketList> = {
    id: generateUUId(), // TODO - pass this logic to backend
    accountId: 'Mocked User', // Implement this once we get login
    location: '', // TODO - pass this logic to backend
    createdAt: new Date().toISOString(), // TODO - pass this logic to backend
    status: StatusList.ACTIVE,
    totalValue: 0, // TODO - pass this logic to backend
    date: formatISO(date),
    effectiveMonth: getMonth(date) + 1,
    effectiveYear: getYear(date),
    products: [], // TODO - pass this logic to backend
    updatedAt: '' // TODO - pass this logic to backend
  };
  return await request.post('/market-list', body);
};

const deleteMarketList = async (id: string) => {
  return await request.delete(`/market-list/${id}`);
};

const updateProductFromMarketList = async (
  marketList: MarketList,
  newProduct: Product
) => {
  const newProductList: Product[] = marketList.products.map((product) => {
    if (product.id === newProduct.id) {
      return {
        ...newProduct,
        updatedAt: new Date().toISOString()
      };
    }
    return product;
  });
  const newMarketList: MarketList = {
    ...marketList,
    updatedAt: new Date().toISOString(), // TODO - pass this logic to backend
    products: newProductList
  };
  return await request.put(`/market-list/${marketList.id}`, newMarketList);
};

const createNewProductForMarketList = async (
  marketList: MarketList,
  product: Partial<Product>
) => {
  const newProduct = {
    ...product,
    id: generateUUId(), // TODO - pass this logic to backend
    createdAt: new Date().toISOString(), // TODO - pass this logic to backend
    updatedAt: ''
  };

  const newMarketList = {
    ...marketList,
    products: [...marketList.products, newProduct],
    updatedAt: new Date().toISOString() // TODO - pass this logic to backend
  };

  return await request.put(`/market-list/${marketList.id}`, newMarketList);
};

const deleteProductFromMarketList = async (
  marketList: MarketList,
  productId: string
) => {
  const newProductList: Product[] = marketList.products.filter(
    (product) => product.id !== productId
  );
  const newMarketList: MarketList = {
    ...marketList,
    updatedAt: new Date().toISOString(), // TODO - pass this logic to backend
    products: newProductList
  };
  const result = await request.put(
    `/market-list/${marketList.id}`,
    newMarketList
  );
  if (result.status !== 200) {
    throw new Error('Error deleting product from market list'); // TODO - not necessary
  }
  return newMarketList;
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
