import { DataBox } from '@/components/generic/data-box';
import { Header } from '@/components/generic/header';
import { MainContainer } from '@/components/generic/main-container';
import { MainFilterPage } from '@/components/generic/main-filter-page';
import { PageType } from '@/models/enums/pages';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';
import { CreateList } from './CreateList';
import { DataTable } from '@/components/generic/base-table';
import { ColumnDef } from '@tanstack/react-table';
import { SortElement } from '@/components/generic/sort-element';
import { Button } from '@/components/ui/button';
import { Pencil2Icon, RocketIcon, TrashIcon } from '@radix-ui/react-icons';
import { MarketList } from '@/models/interfaces/market';
import { format } from 'date-fns';
import { capitalizeFirstLetter } from '@/utils/modifiers';
import { Month } from '@/models/enums';

export const MarketControl = () => {
  const navigate = useNavigate();
  const [expenseModal, setOpenCreateList] = useState(false);
  const [selectedList, setSelectedList] = useState<MarketList | undefined>();

  const handleNavigateToList = () => {
    navigate(`${PageType.MarketControl}${PageType.MarketList}`);
  };

  const handleOpenList = (type: 'actual' | 'create') => {
    if (type === 'actual') {
      handleNavigateToList();
    } else {
      setOpenCreateList(true);
    }
  };

  const handleManageList = (marketList: MarketList) => {
    alert(`Acessando ${JSON.stringify(marketList)}`);
  };

  const handleEditList = (marketList: MarketList) => {
    alert(`Editando ${marketList?.createdAt}`);
  };

  const handleDeleteList = (marketList: MarketList) => {
    alert(`Deletando ${marketList?.createdAt}`);
  };
  const handleFilter = (date: DateRange | undefined) => {
    console.log(date);
  };

  const columns: ColumnDef<any>[] = [
    {
      header: ({ column }) => (
        <SortElement column={column} headerLabel="Data de Criação" />
      ),
      accessorKey: 'createdAt',
      cell: ({ row }) => {
        const date = row.getValue('createdAt');
        return format(date as Date, 'dd/MM/yyyy');
      }
    },
    {
      header: ({ column }) => (
        <SortElement column={column} headerLabel="Qnt Produtos" />
      ),
      accessorKey: 'totalAmount'
    },
    {
      header: ({ column }) => (
        <SortElement column={column} headerLabel="Status" />
      ),
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.getValue('status');
        return capitalizeFirstLetter(status as string);
      }
    },
    {
      header: ({ column }) => (
        <SortElement column={column} headerLabel="Mês efetivo" />
      ),
      accessorKey: 'effectiveMonth',
      cell: ({ row }) => {
        const month = row.getValue('effectiveMonth');
        // @ts-ignore
        return Month[`OPTION_${month}`];
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
              onClick={() => handleManageList(row.original)}
            >
              <RocketIcon className="text-green-400" width={20} height={20} />
            </Button>
            <Button
              size="icon"
              variant="icon"
              onClick={() => handleEditList(row.original)}
            >
              <Pencil2Icon className="text-zinc-200" width={20} height={20} />
            </Button>
            <Button
              size="icon"
              variant="icon"
              onClick={() => handleDeleteList(row.original)}
            >
              <TrashIcon className="text-destructive" width={20} height={20} />
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <div className="flex w-full flex-col">
      <Header />
      <MainContainer>
        <MainFilterPage
          title="Controle de Compras"
          primaryBtnLabel="Criar Nova Lista"
          secondaryBtnLabel="Acessar Lista Atual"
          handlePrimaryBtn={() => handleOpenList('create')}
          handleSecondaryBtn={() => handleOpenList('actual')}
          onSubmitFilter={(date) => handleFilter(date)}
          primaryBtnVariant="outline"
          secondaryBtnVariant="creation"
        />
        <div className="flex w-full mt-6 gap-4">
          <DataBox
            title="Valor da última compra"
            mainValue="$45.240,00"
            subTitle="Valor total em produtos"
            iconName="DollarSign"
            iconColor="white"
            iconSize={18}
          />
          <DataBox
            title="Último local de compra"
            mainValue="Supermercado Vida"
            subTitle="vila Jose - Campinas - SP"
            iconName="DollarSign"
            iconColor="white"
            iconSize={18}
          />
          <DataBox
            title="Produto mais barato da última compra"
            mainValue="$1,00"
            subTitle="Pano de lavar louça"
            iconName="DollarSign"
            iconColor="white"
            iconSize={18}
          />
          <DataBox
            title="Produto mais caro da última compra"
            mainValue="$1.000,00"
            subTitle="Peixe importado"
            iconName="DollarSign"
            iconColor="white"
            iconSize={18}
          />
        </div>
        <DataTable
          columns={columns}
          data={[]}
          primaryFilter="createdAt"
          primaryFilterLabel="Data de Criação"
        />
      </MainContainer>
      <CreateList isOpen={expenseModal} setIsOpen={setOpenCreateList} />
    </div>
  );
};
