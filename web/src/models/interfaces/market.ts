import { StatusList } from '../enums/market';

export interface MarketList {
  id: string;
  accountId: string;
  totalAmount: number;
  totalValue: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  location: string;
  status: StatusList;
  effectiveMonth: number;
  effectiveYear: number;
}
