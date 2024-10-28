import { DataBox } from '@/components/generic/data-box';
import { Header } from '@/components/generic/header';
import { FundModal } from './fund-modal';
import { ExpenseModal } from './expense-modal';
import { useState } from 'react';
import { MainFilterPage } from '@/components/generic/main-filter-page';
import { DateRange } from 'react-day-picker';
import { MainContainer } from '@/components/generic/main-container';
import { useNavigate } from 'react-router-dom';
import { PageType } from '@/models/enums/pages';

export const ExpenseControl = () => {
  const navigate = useNavigate();
  const [fundModal, setFundModal] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);

  const handleOpenExpenseModal = (type: 'expense' | 'fund') => {
    if (type === 'fund') {
      setFundModal(true);
    } else {
      setExpenseModal(true);
    }
  };
  const handleFilter = (date: DateRange | undefined) => {
    console.log(date);
  };

  const handleOpenExpenseList = () => {
    navigate(`${PageType.ExpenseControl}${PageType.ExpenseList}`);
  };

  return (
    <div className="flex w-full flex-col">
      <Header />
      <MainContainer>
        <MainFilterPage
          title="Controle de Gastos"
          primaryBtnLabel="Adicionar Despesa"
          secondaryBtnLabel="Adicionar Fundo"
          handlePrimaryBtn={() => handleOpenExpenseModal('expense')}
          handleSecondaryBtn={() => handleOpenExpenseModal('fund')}
          onChange={(date) => handleFilter(date)}
          primaryBtnVariant="creation"
          secondaryBtnVariant="destructive"
        />
        <div className="flex w-full mt-6 gap-4">
          <DataBox
            title="Saldo Total"
            mainValue="$45.000,00"
            subTitle="Saldo do último mês"
            iconName="DollarSign"
            iconColor="white"
            iconSize={18}
          />
          <DataBox
            title="Maior Gasto"
            mainValue="$5.000,00"
            subTitle="máquina de lavar"
            iconName="DollarSign"
            iconColor="white"
            iconSize={18}
          />
          <DataBox
            title="Menor Gasto"
            mainValue="$1.000,00"
            subTitle="minhas compras"
            iconName="DollarSign"
            iconColor="white"
            iconSize={18}
          />
          <DataBox
            title="7 Maiores Gastos por Categoria"
            iconName="DollarSign"
            iconColor="white"
            iconSize={18}
            onClick={handleOpenExpenseList}
          />
        </div>
        <div className="flex flex-1 w-full mt-6 gap-4">
          <DataBox
            title="Overview de Gastos"
            iconName="BarChartHorizontal"
            iconColor="white"
            iconSize={18}
            className="h-[100%] min-w-[60%]"
            onClick={handleOpenExpenseList}
          />
          <DataBox
            title="Últimos 7 Gastos"
            iconName="BarChartHorizontal"
            iconColor="white"
            iconSize={18}
            className="h-[100%]"
            onClick={handleOpenExpenseList}
          />
        </div>
      </MainContainer>
      <FundModal isOpen={fundModal} setIsOpen={setFundModal} />
      <ExpenseModal
        isOpen={expenseModal}
        setIsOpen={setExpenseModal}
        type="add"
      />
    </div>
  );
};
