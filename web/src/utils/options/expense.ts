import { ExpenseValues, FundValues } from '@/models/enums';

export const fundLabels: Record<FundValues, string> = {
  [FundValues.SALARY]: 'Salário',
  [FundValues.FREELANCE]: 'Freelance',
  [FundValues.INVESTMENT]: 'Investimento',
  [FundValues.LOAN]: 'Empréstimo',
  [FundValues.OTHER]: 'Outro'
};

export const expenseLabels: Record<ExpenseValues, string> = {
  [ExpenseValues.FOOD]: 'Alimentação',
  [ExpenseValues.TRANSPORT]: 'Transporte',
  [ExpenseValues.HEALTH]: 'Saúde',
  [ExpenseValues.EDUCATION]: 'Educação',
  [ExpenseValues.ENTERTAINMENT]: 'Lazer',
  [ExpenseValues.RECREATION]: 'Recreação',
  [ExpenseValues.HOUSING]: 'Moradia',
  [ExpenseValues.CLOTHING]: 'Roupas',
  [ExpenseValues.UTILITIES]: 'Utilidades',
  [ExpenseValues.BILL]: 'Contas em Geral',
  [ExpenseValues.OTHER]: 'Outro'
};
