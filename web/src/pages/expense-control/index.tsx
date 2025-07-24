import { DataBox } from '@/components/generic/data-box';
import { FundModal } from './fund-modal';
import { ExpenseModal } from './expense-modal';
import { useEffect, useState } from 'react';
import { MainFilterPage } from '@/components/generic/main-filter-page';
import { DateRange } from 'react-day-picker';
import { MainContainer } from '@/components/generic/main-container';
import { useNavigate } from 'react-router-dom';
import { PageType } from '@/models/enums/pages';
import { useAppDispatch, useAppSelector } from '@/reducers';
import { getExpenseList } from '@/reducers/expenses/actions';
import {
  selectGetExpenseListLoading,
  selectGetUserLoading
} from '@/reducers/loading/selectors';
import { Splash } from '@/components/generic/splash';
import {
  selectExpenseControlCounters,
  selectFilteredExpenses
} from '@/reducers/expenses/selectors';
import { formatToCurrencyRealWithDollar } from '@/utils/modifiers';
import { categoriesIcons } from '@/models/constants/categories-icons';
import { ExpenseValues } from '@/models/enums';
import { subDays } from 'date-fns';
import { ExpenseBarChart } from './expense-bar-chart';
import { OverviewChart } from './overview-chart';
import { ExpenseData } from '@/models/interfaces';
import SidebarComponent from '@/components/generic/sidebar-component';

export const ExpenseControl = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const expenseList = useAppSelector(selectFilteredExpenses);
  const isLoadingExpenses = useAppSelector(selectGetExpenseListLoading);
  const counters = useAppSelector(selectExpenseControlCounters);
  const isLoadingUser = useAppSelector(selectGetUserLoading);
  const [fundModal, setFundModal] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);

  const handleOpenExpenseModal = (type: 'expense' | 'fund') => {
    if (type === 'fund') {
      setFundModal(true);
    } else {
      setExpenseModal(true);
    }
  };
  const handleFilter = async (date: DateRange | undefined) => {
    dispatch(
      getExpenseList({
        expense: {} as unknown as ExpenseData,
        filter: date
      })
    );
  };

  const handleOpenExpenseList = () => {
    navigate(`${PageType.ExpenseControl}${PageType.ExpenseList}`);
  };

  const handleGetExpenseList = () => {
    dispatch(
      getExpenseList({
        expense: {} as unknown as ExpenseData,
        filter: {
          from: subDays(new Date(), 30),
          to: new Date()
        }
      })
    );
  };
  useEffect(() => {
    if (expenseList.length > 0) return;
    handleGetExpenseList();
  }, []);

  return (
    <SidebarComponent>
      <Splash
        stateList={[isLoadingExpenses, isLoadingUser]}
        retry={handleGetExpenseList}
      >
        <MainContainer>
          <MainFilterPage
            primaryBtnLabel="Adicionar Fundo"
            secondaryBtnLabel="Adicionar Despesa"
            handlePrimaryBtn={() => handleOpenExpenseModal('fund')}
            handleSecondaryBtn={() => handleOpenExpenseModal('expense')}
            onSubmitFilter={(date) => handleFilter(date)}
            primaryBtnVariant="creation"
            secondaryBtnVariant="destructive"
          />
          <div className="flex flex-col flex-1">
            <div className="flex w-full mt-6 gap-4 pb-2 overflow-x-auto">
              <DataBox
                title="Saldo Total"
                mainValue={formatToCurrencyRealWithDollar(counters.totalAmount)}
                subTitle="Saldo total do filtro de datas"
                iconName="DollarSign"
                iconColor="white"
                iconSize={18}
                size="medium"
              />
              <DataBox
                title="Maior Gasto"
                mainValue={formatToCurrencyRealWithDollar(
                  counters.higherExpense?.value
                )}
                subTitle={counters.higherExpense.name}
                iconName="DollarSign"
                iconColor="white"
                iconSize={18}
                size="medium"
                category={counters.higherExpense.category}
              />
              <DataBox
                title="Menor Gasto"
                mainValue={formatToCurrencyRealWithDollar(
                  counters.lowerExpense.value
                )}
                subTitle={counters.higherExpense.name}
                iconName="DollarSign"
                iconColor="white"
                iconSize={18}
                size="medium"
                category={counters.higherExpense.category}
              />
              <DataBox
                title="Resumo de Ganhos/Despesas"
                iconName="ChartColumn"
                iconColor="white"
                iconSize={18}
                className="min-w-[fit-content]"
                size="medium"
                customContent={
                  <ExpenseBarChart
                    last12MonthsFundsExpenses={
                      counters.last12MonthsFundsExpenses
                    }
                  />
                }
              />
            </div>
            <div className="flex flex-1 w-full mt-6 gap-4">
              <DataBox
                title="Overview de Gastos"
                iconName="ChartArea"
                iconColor="white"
                iconSize={18}
                className="h-[100%] min-w-[60%]"
                onClick={handleOpenExpenseList}
                customContent={
                  <OverviewChart
                    expensesPerCategory={counters.expensesPerCategory}
                  />
                }
              />
              <DataBox
                title="Últimos 7 Gastos"
                iconName="List"
                iconColor="white"
                iconSize={18}
                className="h-[100%]"
                onClick={handleOpenExpenseList}
                customContent={
                  <ul className="flex flex-col text-zinc-300 w-full h-full justify-start gap-5 mt-9">
                    {counters.last7Expenses.map((expense) => (
                      <li
                        className="flex justify-between items-centerr"
                        key={expense._id}
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
    </SidebarComponent>
  );
};
