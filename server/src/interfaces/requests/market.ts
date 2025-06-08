import { StatusList, SupermarketSections } from "../../enums/market";

export interface CreateMarketRequest {
  date: Date;
  accountId: string;
  value: number;
  local?: string;
  type: "income" | "expense";
  category?: string;
  otherCategory?: string;
}

export interface CreateMarketList {
  accountId: string;
  totalValue?: number;
  date: Date;
  location: string;
  status?: StatusList;
  effectiveMonth: number;
  effectiveYear: number;
  products: Product[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Product {
  id: string;
  name: string;
  amount: number;
  value: number;
  createdAt: string;
  updatedAt: string;
  category: SupermarketSections;
  done: boolean;
}
