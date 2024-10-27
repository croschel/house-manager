export interface ExpenseData {
  id: string;
  accountId: string;
  name: string;
  value: number;
  category: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  isFixedExpense: boolean;
  location: string;
}
