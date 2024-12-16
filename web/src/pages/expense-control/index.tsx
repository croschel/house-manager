import { DataBox } from '@/components/generic/data-box';
import { Header } from '@/components/generic/header';
import { FundModal } from './fund-modal';
import { ExpenseModal } from './expense-modal';
import { useEffect, useMemo, useState } from 'react';
import { MainFilterPage } from '@/components/generic/main-filter-page';
import { DateRange } from 'react-day-picker';
import { MainContainer } from '@/components/generic/main-container';
import { useNavigate } from 'react-router-dom';
import { PageType } from '@/models/enums/pages';
import { useAppDispatch, useAppSelector } from '@/reducers';
import { getExpenseList } from '@/reducers/expenses/actions';
import { selectGetExpenseListLoading } from '@/reducers/loading/selectors';
import { Splash } from '@/components/generic/splash';
import { selectExpenseList } from '@/reducers/expenses/selectors';
import { compareDatesForSort } from '@/utils/date';
import { formatToCurrencyRealWithDollar } from '@/utils/modifiers';
import { Button } from '@/components/ui/button';
import { categoriesIcons } from '@/models/constants/categories-icons';
import { ExpenseValues } from '@/models/enums';

export const ExpenseControl = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const expenseList = useAppSelector(selectExpenseList);
  const isLoadingExpenses = useAppSelector(selectGetExpenseListLoading);
  const [fundModal, setFundModal] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);

  const counters = useMemo(() => {
    const funds = expenseList.filter((expense) => expense.type === 'fund');
    const expenses = expenseList.filter(
      (expense) => expense.type === 'expense'
    );
    const totalFunds = funds.reduce(
      (total, expense) => total + expense.value,
      0
    );
    const totalExpenses = expenses.reduce(
      (total, expense) => total + expense.value,
      0
    );
    return {
      totalAmount: totalFunds - totalExpenses,
      higherExpense: expenses.sort((a, b) => b.value - a.value)[0]?.value,
      lowerExpense: expenses.sort((a, b) => a.value - b.value)[0]?.value,
      higherFixedExpense: expenses
        .filter((expense) => expense.isFixedExpense)
        .sort((a, b) => b.value - a.value)[0]?.value,
      last7Expenses: expenses
        .sort((a, b) => compareDatesForSort(b.date, a.date))
        .slice(0, 7)
    };
  }, [expenseList]);

  const handleOpenExpenseModal = (type: 'expense' | 'fund') => {
    if (type === 'fund') {
      setFundModal(true);
    } else {
      setExpenseModal(true);
    }
  };
  const handleFilter = (date: DateRange | undefined) => {
    // console.log(date);
  };

  const handleOpenExpenseList = () => {
    navigate(`${PageType.ExpenseControl}${PageType.ExpenseList}`);
  };

  const handleGetExpenseList = () => dispatch(getExpenseList({}));

  useEffect(() => {
    if (expenseList.length > 0) return;
    handleGetExpenseList();
  }, []);

  return (
    <div className="flex w-full flex-col">
      <Header />
      <Splash stateList={[isLoadingExpenses]} retry={handleGetExpenseList}>
        <MainContainer>
          <MainFilterPage
            title="Controle de Gastos"
            primaryBtnLabel="Adicionar Fundo"
            secondaryBtnLabel="Adicionar Despesa"
            handlePrimaryBtn={() => handleOpenExpenseModal('fund')}
            handleSecondaryBtn={() => handleOpenExpenseModal('expense')}
            onChange={(date) => handleFilter(date)}
            primaryBtnVariant="creation"
            secondaryBtnVariant="destructive"
          />
          <div className="flex flex-col flex-1">
            <div className="flex w-full mt-6 gap-4 pb-2 overflow-x-auto">
              <DataBox
                title="Saldo Total"
                mainValue={formatToCurrencyRealWithDollar(counters.totalAmount)}
                subTitle="Saldo do último mês"
                iconName="DollarSign"
                iconColor="white"
                iconSize={18}
              />
              <DataBox
                title="Maior Gasto"
                mainValue={formatToCurrencyRealWithDollar(
                  counters.higherExpense
                )}
                subTitle="máquina de lavar"
                iconName="DollarSign"
                iconColor="white"
                iconSize={18}
              />
              <DataBox
                title="Menor Gasto"
                mainValue={formatToCurrencyRealWithDollar(
                  counters.lowerExpense
                )}
                subTitle="minhas compras"
                iconName="DollarSign"
                iconColor="white"
                iconSize={18}
              />
              <DataBox
                title="Resumo de Ganhos"
                iconName="DollarSign"
                iconColor="white"
                iconSize={18}
                customContent={
                  <div>
                    <Button
                      onClick={() =>
                        alert(JSON.stringify(counters.last7Expenses))
                      }
                    >
                      Try me
                    </Button>
                  </div>
                }
              />
            </div>
            <div className="flex flex-1 w-full mt-6 gap-4">
              <DataBox
                title="Overview de Gastos"
                iconName="BatteryCharging"
                iconColor="white"
                iconSize={18}
                className="h-[100%] min-w-[60%]"
                onClick={handleOpenExpenseList}
              />
              <DataBox
                title="Últimos 7 Gastos"
                iconName="BatteryCharging"
                iconColor="white"
                iconSize={18}
                className="h-[100%]"
                onClick={handleOpenExpenseList}
                customContent={
                  <ul className="flex flex-col text-zinc-300 w-full h-full justify-start gap-5 mt-9">
                    {counters.last7Expenses.map((expense) => (
                      <li
                        className="flex justify-between items-centerr"
                        key={expense.id}
                      >
                        <div className="flex gap-4 items-center">
                          {categoriesIcons[expense.category as ExpenseValues]}
                          <span>{expense.name}</span>
                        </div>
                        <span>
                          {formatToCurrencyRealWithDollar(expense.value)}
                        </span>
                      </li>
                    ))}
                  </ul>
                }
              />
            </div>
          </div>
        </MainContainer>
      </Splash>
      <FundModal isOpen={fundModal} setIsOpen={setFundModal} />
      <ExpenseModal
        isOpen={expenseModal}
        setIsOpen={setExpenseModal}
        type="add"
      />
    </div>
  );
};
