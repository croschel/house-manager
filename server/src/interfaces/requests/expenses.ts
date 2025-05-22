export interface CreateExpenseRequest {
  name: string;
  ownerId: string;
  accountId: string;
  category: string;
  type: "expense" | "fund";
  value: number;
  date?: Date;
  local?: string;
  repeatedExpense?: boolean;
  otherCategory?: string;
}
