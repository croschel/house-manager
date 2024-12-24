import { StatusList, SupermarketSections } from '../enums/market';

export interface Product {
  id: string;
  name: string;
  amount: number;
  value: number;
  createdAt: string;
  updatedAt: string;
  category: SupermarketSections;
}

export interface MarketList {
  id: string;
  accountId: string;
  totalValue: number;
  createdAt: string;
  updatedAt: string;
  location: string;
  status: StatusList;
  effectiveMonth: number;
  effectiveYear: number;
  products: Product[];
}
