import { DataBox } from '@/components/generic/data-box';
import { Header } from '@/components/generic/header';
import { MainContainer } from '@/components/generic/main-container';
import { MainFilterPage } from '@/components/generic/main-filter-page';
import { PageType } from '@/models/enums/pages';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';
import { CreateList } from './CreateList';
import { DataTable } from '@/components/generic/base-table';
import { ColumnDef } from '@tanstack/react-table';
import { SortElement } from '@/components/generic/sort-element';
import { Button } from '@/components/ui/button';
import { Pencil2Icon, RocketIcon, TrashIcon } from '@radix-ui/react-icons';
import { MarketList, Product } from '@/models/interfaces/market';
import { format, subDays } from 'date-fns';
import { capitalizeFirstLetter } from '@/utils/modifiers';
import { Month } from '@/models/enums';
import {
  fetchAllMarketList,
  deleteMarketList
} from '@/reducers/market/actions';
import { useAppDispatch, useAppSelector } from '@/reducers';
import { selectFetchAllMarketListLoading } from '@/reducers/loading/selectors';
import { selectFilteredMarketList } from '@/reducers/market/selectors';
import { Splash } from '@/components/generic/splash';
import { ConfirmationModal } from '@/components/generic/confirmation-modal';
import { EditListModal } from './edit-list-modal';

export const MarketControl = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [expenseModal, setOpenCreateList] = useState(false);
  const isLoadingMarketList = useAppSelector(selectFetchAllMarketListLoading);
  const filteredMarketList = useAppSelector(selectFilteredMarketList);
  const [selectedList, setSelectedList] = useState<MarketList | undefined>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

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

  const handleOpenEditModal = (marketList: MarketList) => {
    setSelectedList(marketList);
    setOpenEditModal(true);
  };
  const handleOpenDeleteModal = (marketList: MarketList) => {
    setSelectedList(marketList);
    setOpenDeleteModal(true);
  };

  const handleDeleteList = () => {
    dispatch(deleteMarketList(selectedList?.id!));
  };
  const handleFilter = (date: DateRange | undefined) => {
    dispatch(
      fetchAllMarketList({
        marketList: {} as unknown as MarketList,
        filter: date
      })
    );
  };

  const handleFetchMarketList = () =>
    dispatch(
      fetchAllMarketList({
        marketList: {} as unknown as MarketList,
        filter: {
          from: subDays(new Date(), 30),
          to: new Date()
        }
      })
    );

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
      accessorKey: 'products',
      cell: ({ row }) => {
        const products = row.getValue('products') as Product[];
        return products.length;
      }
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
        return Month[`OPTION_${month - 1}`];
      }
    },
    {
      header: ({ column }) => (
        <SortElement column={column} headerLabel="Mês efetivo" />
      ),
      accessorKey: 'effectiveYear'
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex gap-6 justify-end">
            <Button
              size="icon"
              variant="icon"
              onClick={() => handleOpenDeleteModal(row.original)}
            >
              <RocketIcon className="text-green-400" width={20} height={20} />
            </Button>
            <Button
              size="icon"
              variant="icon"
              onClick={() => handleOpenEditModal(row.original)}
            >
              <Pencil2Icon className="text-zinc-200" width={20} height={20} />
            </Button>
            <Button
              size="icon"
              variant="icon"
              onClick={() => handleOpenDeleteModal(row.original)}
            >
              <TrashIcon className="text-destructive" width={20} height={20} />
            </Button>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    if (filteredMarketList.length > 0) return;
    handleFetchMarketList();
  }, []);

  return (
    <div className="flex w-full flex-col">
      <Header />
      <Splash stateList={[isLoadingMarketList]} retry={handleFetchMarketList}>
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
          <div className="flex flex-col flex-1">
            <div className="flex w-full mt-6 gap-4 pb-2 overflow-x-auto">
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
            <div className="flex min-h-[70px] max-h-[70px]">
              <DataTable
                columns={columns}
                data={filteredMarketList}
                primaryFilter="date"
                primaryFilterLabel="Data de Criação"
              />
            </div>
          </div>
        </MainContainer>
      </Splash>
      <CreateList isOpen={expenseModal} setIsOpen={setOpenCreateList} />
      <ConfirmationModal
        isOpen={openDeleteModal}
        setIsOpen={setOpenDeleteModal}
        title="Você tem certeza que deseja deletar esta lista de compras?"
        description="Essa ação não pode ser desfeita. Isso excluirá permanentemente sua lista."
        onSubmit={handleDeleteList}
      />
      <EditListModal
        isOpen={openEditModal}
        setIsOpen={setOpenEditModal}
        marketList={selectedList ?? ({} as MarketList)}
      />
    </div>
  );
};
