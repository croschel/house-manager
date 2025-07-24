import { ExpenseValues, FundValues } from '../enums';

export type ExpenseCategory = FundValues & ExpenseValues;

export interface ExpenseData {
  _id: string;
  type: 'expense' | 'fund';
  accountId: string;
  name: string;
  value: number;
  category: ExpenseCategory;
  otherCategory?: string;
  ownerId: number; // 6-digits
  ownerName: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  isFixedExpense: boolean;
  location: string;
}

export type CreateFormExpense = Pick<
  ExpenseData,
  | 'name'
  | 'category'
  | 'value'
  | 'date'
  | 'location'
  | 'isFixedExpense'
  | 'type'
>;
