import { Header } from '@/components/generic/header';
import { MainContainer } from '@/components/generic/main-container';
import { MainFilterPage } from '@/components/generic/main-filter-page';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { ExpenseModal } from '../expense-control/expense-modal';
import { DataTable } from '@/components/generic/base-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { mockExpenseData } from '@/mocks/expense';
import { format } from 'date-fns';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { ExpenseData } from '@/models/interfaces';
import { SortElement } from '@/components/generic/sort-element';
import { ConfirmationModal } from '@/components/generic/confirmation-modal';
import { useAppSelector } from '@/reducers';
import { selectExpenseList } from '@/reducers/expenses/selectors';

export const ExpenseList = () => {
  const expenseList = useAppSelector(selectExpenseList);
  const [expenseModal, setExpenseModal] = useState(false);
  const [editExpenseModal, setEditExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<
    ExpenseData | undefined
  >();
  const [deleteExpenseModal, setDeleteExpenseModal] = useState(false);

  const handleOpenExpenseModal = () => {
    setExpenseModal(true);
  };

  const handleOpenEditExpenseModal = (expense: ExpenseData) => {
    setSelectedExpense(expense);
    setEditExpenseModal(true);
  };
  const handleOpenDeleteExpense = (expense: ExpenseData) => {
    setSelectedExpense(expense);
    setDeleteExpenseModal(true);
  };

  const handleDeleteExpense = () => {
    alert(`${selectedExpense?.name} deletado com sucesso!`);
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => <SortElement column={column} headerLabel="Name" />
    },
    {
      accessorKey: 'category',
      header: ({ column }) => (
        <SortElement column={column} headerLabel="Category" />
      )
    },
    {
      accessorKey: 'value',
      header: ({ column }) => (
        <SortElement column={column} headerLabel="Valor" />
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('value'));
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(amount);

        return <div className="text-left font-medium">{formatted}</div>;
      }
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <SortElement column={column} headerLabel="Data de Compra" />
      ),
      cell: ({ row }) => {
        const date = row.getValue('createdAt');
        return format(date as Date, 'dd/MM/yyyy');
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex gap-6 justify-end">
            <Button
              size="icon"
              variant="icon"
              onClick={() => handleOpenEditExpenseModal(row.original)}
            >
              <Pencil2Icon className="text-zinc-200" width={20} height={20} />
            </Button>
            <Button
              size="icon"
              variant="icon"
              onClick={() => handleOpenDeleteExpense(row.original)}
            >
              <TrashIcon className="text-destructive" width={20} height={20} />
            </Button>
          </div>
        );
      }
    }
  ];

  const handleFilter = (date: DateRange | undefined) => {
    console.log(date);
  };

  return (
    <div className="flex w-full flex-col">
      <Header />
      <MainContainer>
        <div className="flex flex-col justify-between h-full">
          <MainFilterPage
            title="Despesas"
            primaryBtnLabel="Adicionar Despesa"
            handlePrimaryBtn={() => handleOpenExpenseModal()}
            onChange={(date) => handleFilter(date)}
            primaryBtnVariant="destructive"
          />
          <DataTable
            columns={columns}
            data={expenseList}
            primaryFilter="name"
            secondaryFilter="category"
          />
        </div>
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
        expense={selectedExpense}
      />
      <ConfirmationModal
        isOpen={deleteExpenseModal}
        setIsOpen={setDeleteExpenseModal}
        title="Você tem certeza que deseja deletar este gasto?"
        description="Essa ação não pode ser desfeita. Isso excluirá permanentemente seu gasto."
        onSubmit={handleDeleteExpense}
      />
    </div>
  );
};
