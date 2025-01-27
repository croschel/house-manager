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

const updateProductFromMarketList = async (
  marketList: MarketList,
  newProduct: Product,
  productIndex: number
) => {
  const newProductList: Product[] = marketList.products.map(
    (product, index) => {
      if (index === productIndex) {
        return {
          ...newProduct,
          updatedAt: new Date().toISOString()
        };
      }
      return product;
    }
  );
  const newMarketList: MarketList = {
    ...marketList,
    updatedAt: new Date().toISOString(),
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
    id: generateUUId(),
    createdAt: new Date().toISOString(),
    updatedAt: ''
  };

  const newMarketList = {
    ...marketList,
    products: [...marketList.products, newProduct],
    updatedAt: new Date().toISOString()
  };

  return await request.put(`/market-list/${marketList.id}`, newMarketList);
};

export const MarketService = {
  fetchAllMarketList,
  fetchMarketById,
  updateMarketList,
  createMarketList,
  deleteMarketList,
  updateProductFromMarketList,
  createNewProductForMarketList
};
