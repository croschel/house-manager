import { compareDatesForSort, getLast12monthsWithYear } from '@/utils/date';
import { RootState } from '..';
import { getMonth, getYear } from 'date-fns';
import { ExpenseColors, ExpenseValues, Month } from '@/models/enums';
import { expenseLabels } from '@/utils/options';

export const selectFilteredExpenses = (state: RootState) =>
  state.expense.expenseList;
export const selectExpenseDateFilter = (state: RootState) =>
  state.expense.expenseDateFilter;
export const selectExpenseControlCounters = (state: RootState) => {
  const { expenseList } = state.expense;
  const funds = expenseList.filter((expense) => expense.type === 'fund');
  const expenses = expenseList.filter((expense) => expense.type === 'expense');
  const totalFunds = funds.reduce((total, expense) => total + expense.value, 0);
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.value,
    0
  );
  let last12MonthsFundsExpenses: any = [];
  getLast12monthsWithYear().forEach((item) => {
    const fundsMonth = funds.filter(
      (fund) =>
        getMonth(fund.date) === item.month && getYear(fund.date) === item.year
    );
    const expensesMonth = expenses.filter(
      (expense) =>
        getMonth(expense.date) === item.month &&
        getYear(expense.date) === item.year
    );
    last12MonthsFundsExpenses.push({
      // @ts-ignore
      month: Month[`OPTION_${item.month}`],
      year: item.year,
      funds: fundsMonth.reduce((total, expense) => total + expense.value, 0),
      expenses: expensesMonth.reduce(
        (total, expense) => total + expense.value,
        0
      )
    });
  });
  const expensesPerCategory = expenses
    .reduce(
      (acc, expense) => {
        return acc.map((item) => ({
          ...item,
          value:
            item.category.toLowerCase() === expense.category
              ? item.value + Number(expense.value)
              : item.value
        }));
      },
      Object.values(ExpenseValues).map((key) => ({
        name: expenseLabels[key],
        category: key[0].toUpperCase() + key.slice(1),
        value: 0,
        fill: ExpenseColors[key]
      }))
    )
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);
  return {
    totalAmount: totalFunds - totalExpenses,
    higherExpense: expenses.sort((a, b) => b.value - a.value)[0] ?? {},
    lowerExpense: expenses.sort((a, b) => a.value - b.value)[0] ?? {},
    last7Expenses: expenses
      .sort((a, b) => compareDatesForSort(b.date, a.date))
      .slice(0, 7),
    last12MonthsFundsExpenses,
    expensesPerCategory
  };
};
