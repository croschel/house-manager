import { DataBox } from '@/components/generic/data-box';
import { Header } from '@/components/generic/header';
import { MainContainer } from '@/components/generic/main-container';
import { MainFilterPage } from '@/components/generic/main-filter-page';
import { PageType } from '@/models/enums/pages';
import { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '@/components/generic/base-table';
import { ColumnDef } from '@tanstack/react-table';
import { SortElement } from '@/components/generic/sort-element';
import { Button } from '@/components/ui/button';
import { Pencil2Icon, RocketIcon, TrashIcon } from '@radix-ui/react-icons';
import { MarketList, Product } from '@/models/interfaces/market';
import { format, subDays } from 'date-fns';
import { capitalizeFirstLetter } from '@/utils/modifiers';
import { ActionStatus, Month, StatusList } from '@/models/enums';
import {
  fetchAllMarketList,
  deleteMarketList,
  setMarketListSelected
} from '@/reducers/market/actions';
import { useAppDispatch, useAppSelector } from '@/reducers';
import {
  selectDeleteMarketListLoading,
  selectFetchAllMarketListLoading
} from '@/reducers/loading/selectors';
import { selectFilteredMarketList } from '@/reducers/market/selectors';
import { Splash } from '@/components/generic/splash';
import { ConfirmationModal } from '@/components/generic/confirmation-modal';
import { EditListModal } from './edit-list-modal';
import { Conditional } from '@/components/generic/conditional';
import { CreateList } from './create-list';
import SidebarComponent from '@/components/generic/sidebar-component';

export const MarketControl = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [expenseModal, setOpenCreateList] = useState(false);
  const isLoadingMarketList = useAppSelector(selectFetchAllMarketListLoading);
  const filteredMarketList = useAppSelector(selectFilteredMarketList);
  const isDeletingList = useAppSelector(selectDeleteMarketListLoading);
  const [selectedList, setSelectedList] = useState<MarketList | undefined>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const marketInfo = useMemo(() => {
    let lastTotalPaid = '$0.00';
    let lastLocation = '';
    let lastCheaperProduct = {
      name: '',
      value: '$0.00'
    };
    let lastExpensiveProduct = {
      name: '',
      value: '$0.00'
    };

    if (filteredMarketList.length > 0) {
      const sortedMarketList = [...filteredMarketList].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      const lastProduct = [...sortedMarketList[0].products].sort((a, b) => {
        return b.value - a.value;
      });
      lastTotalPaid = `$${sortedMarketList[0].totalValue.toFixed(2) ?? '0.00'}`;
      lastLocation = sortedMarketList[0].location ?? '';
      lastCheaperProduct = {
        name: lastProduct[0].name,
        value: `$${lastProduct[0].value.toFixed(2) ?? '0.00'}`
      };
      lastExpensiveProduct = {
        name: lastProduct[lastProduct.length - 1].name,
        value: `$${lastProduct[lastProduct.length - 1].value.toFixed(2) ?? '0.00'}`
      };
    }
    return {
      lastTotalPaid,
      lastLocation,
      lastCheaperProduct,
      lastExpensiveProduct
    };
  }, [filteredMarketList]);

  const handleOpenList = (type: 'actual' | 'create') => {
    if (type === 'actual') {
      const lastActiveList = filteredMarketList
        .filter((list) => list.status === StatusList.ACTIVE)
        .sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      handleEnterActiveList(lastActiveList[0]);
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

  const handleEnterActiveList = (marketList: MarketList) => {
    navigate(`${PageType.MarketControl}${PageType.MarketList}`);
    dispatch(setMarketListSelected(marketList));
  };

  const handleDeleteList = async () => {
    await dispatch(deleteMarketList(selectedList?.id!));
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
        <SortElement column={column} headerLabel="Ano efetivo" />
      ),
      accessorKey: 'effectiveYear'
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex gap-6 justify-end">
            <Conditional
              condition={
                row.getValue('status') === StatusList.ACTIVE ||
                row.getValue('status') === StatusList.EXPIRED
              }
            >
              <Button
                size="icon"
                variant="icon"
                onClick={() => handleEnterActiveList(row.original)}
              >
                <RocketIcon className="text-green-400" width={20} height={20} />
              </Button>
            </Conditional>
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
    <SidebarComponent>
      <Splash stateList={[isLoadingMarketList]} retry={handleFetchMarketList}>
        <MainContainer>
          <MainFilterPage
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
                mainValue={marketInfo.lastTotalPaid}
                subTitle="Valor total em produtos"
                iconName="DollarSign"
                iconColor="white"
                iconSize={18}
              />
              <DataBox
                title="Último local de compra"
                mainValue={marketInfo.lastLocation}
                iconName="DollarSign"
                iconColor="white"
                iconSize={18}
              />
              <DataBox
                title="Produto mais barato da última compra"
                mainValue={marketInfo.lastCheaperProduct.value}
                subTitle={marketInfo.lastCheaperProduct.name}
                iconName="DollarSign"
                iconColor="white"
                iconSize={18}
              />
              <DataBox
                title="Produto mais caro da última compra"
                mainValue={marketInfo.lastExpensiveProduct.value}
                subTitle={marketInfo.lastExpensiveProduct.name}
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
        isLoading={isDeletingList === ActionStatus.LOADING}
      />
      <EditListModal
        isOpen={openEditModal}
        setIsOpen={setOpenEditModal}
        marketList={selectedList ?? ({} as MarketList)}
      />
    </SidebarComponent>
  );
};
