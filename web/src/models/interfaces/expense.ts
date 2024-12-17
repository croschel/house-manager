export interface ExpenseData {
  id: string;
  type: 'expense' | 'fund';
  accountId: string;
  name: string;
  value: number;
  category: string;
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
