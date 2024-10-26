import { Header } from '@/components/generic/header';
import { MainContainer } from '@/components/generic/main-container';
import { MainFilterPage } from '@/components/generic/main-filter-page';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { ExpenseModal } from '../expense-control/expense-modal';

export const ExpenseList = () => {
  const [expenseModal, setExpenseModal] = useState(false);
  const [editExpenseModal, setEditExpenseModal] = useState(false);

  const handleOpenExpenseModal = () => {
    setExpenseModal(true);
  };

  const handleFilter = (date: DateRange | undefined) => {
    console.log(date);
  };

  return (
    <div className="flex w-full flex-col">
      <Header />
      <MainContainer>
        <MainFilterPage
          title="Despesas"
          primaryBtnLabel="Adicionar Despesa"
          handlePrimaryBtn={() => handleOpenExpenseModal()}
          onChange={(date) => handleFilter(date)}
          primaryBtnVariant="destructive"
        />
      </MainContainer>
      <ExpenseModal
        isOpen={expenseModal}
        setIsOpen={setExpenseModal}
        type="add"
      />
      <ExpenseModal
        isOpen={editExpenseModal}
        setIsOpen={setEditExpenseModal}
        type="edit"
      />
    </div>
  );
};
