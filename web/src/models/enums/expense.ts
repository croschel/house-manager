export enum FundValues {
  SALARY = 'salary',
  FREELANCE = 'freelance',
  INVESTMENT = 'investment',
  LOAN = 'loan',
  OTHER = 'other'
}

export enum ExpenseValues {
  FOOD = 'food',
  TRANSPORT = 'transport',
  HEALTH = 'health',
  EDUCATION = 'education',
  ENTERTAINMENT = 'entertainment',
  RECREATION = 'recreation',
  HOUSING = 'housing',
  CLOTHING = 'clothing',
  UTILITIES = 'utilities',
  BILL = 'bill',
  OTHER = 'other'
}

export const ExpenseColors: { [key in ExpenseValues]: string } = {
  [ExpenseValues.FOOD]: 'rgba(255, 0, 0, 0.5)', // Red with 20% opacity
  [ExpenseValues.TRANSPORT]: 'rgba(0, 255, 0, 0.5)', // Lime with 20% opacity
  [ExpenseValues.HEALTH]: 'rgba(0, 0, 255, 0.5)', // Blue with 20% opacity
  [ExpenseValues.EDUCATION]: 'rgba(255, 255, 0, 0.5)', // Yellow with 20% opacity
  [ExpenseValues.ENTERTAINMENT]: 'rgba(255, 0, 255, 0.5)', // Magenta with 20% opacity
  [ExpenseValues.RECREATION]: 'rgba(0, 255, 255, 0.5)', // Cyan with 20% opacity
  [ExpenseValues.HOUSING]: 'rgba(255, 165, 0, 0.5)', // Orange with 20% opacity
  [ExpenseValues.CLOTHING]: 'rgba(128, 0, 128, 0.5)', // Purple with 20% opacity
  [ExpenseValues.UTILITIES]: 'rgba(0, 128, 0, 0.5)', // Green with 20% opacity
  [ExpenseValues.BILL]: 'rgba(0, 0, 128, 0.5)', // Navy with 20% opacity
  [ExpenseValues.OTHER]: 'rgba(128, 128, 128, 0.5)' // Gray with 20% opacity
};
