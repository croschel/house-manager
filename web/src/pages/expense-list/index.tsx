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

export const ExpenseList = () => {
  const [expenseModal, setExpenseModal] = useState(false);
  const [editExpenseModal, setEditExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<
    ExpenseData | undefined
  >();

  const handleOpenExpenseModal = () => {
    setExpenseModal(true);
  };

  const handleOpenEditExpenseModal = (expense: ExpenseData) => {
    setSelectedExpense(expense);
    setEditExpenseModal(true);
  };
  const handleDeleteExpense = (expense: ExpenseData) => {
    // TODO - Create action with service to handle it
    alert(`Delete ${expense.name}`);
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
              onClick={() => handleDeleteExpense(row.original)}
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
            data={mockExpenseData}
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
    </div>
  );
};
