import { DataTable } from '@/components/generic/base-table';
import { MainContainer } from '@/components/generic/main-container';
import { MainFilterPage } from '@/components/generic/main-filter-page';
import { SortElement } from '@/components/generic/sort-element';
import { Button } from '@/components/ui/button';
import { ActionStatus, PageType, StatusList } from '@/models/enums';
import { MarketList, Product } from '@/models/interfaces';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { format, formatDate } from 'date-fns';
import { TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditProductModal } from './edit-product-modal';
import { useAppDispatch, useAppSelector } from '@/reducers';
import { selectMarketListSelected } from '@/reducers/market/selectors';
import { ConfirmationModal } from '@/components/generic/confirmation-modal';
import {
  deleteProductFromMarketList,
  updateMarketList
} from '@/reducers/market/actions';
import { selectDeleteProductFromMarketListLoading } from '@/reducers/loading/selectors';
import SidebarComponent from '@/components/generic/sidebar-component';
import { StatusListLabels } from '@/utils/options/market';

export const ActualList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const marketList = useAppSelector(selectMarketListSelected);
  const isDeletingProduct = useAppSelector(
    selectDeleteProductFromMarketListLoading
  );
  const productsList = marketList?.products;
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    product: Product;
    productIndex: number;
  }>({ product: {} as Product, productIndex: 0 });
  const handleStartShopping = async () => {
    await dispatch(
      updateMarketList({
        ...marketList,
        status: StatusList.PROGRESS
      } as MarketList)
    );
    navigate(`${PageType.Shopping}/${marketList?._id}`);
  };
  const handleCreateNewProduct = () => {
    setOpenAddModal(true);
  };

  const handleOpenEditModal = (product: Product, productIndex: number) => {
    setSelectedProduct({ product, productIndex });
    setOpenEditModal(true);
  };

  const handleOpenDeleteModal = (product: Product) => {
    setOpenDeleteProductModal(true);
    setSelectedProduct({ product, productIndex: 0 });
  };

  const handleDeleteProduct = async () => {
    await dispatch(
      deleteProductFromMarketList({
        marketList: marketList as MarketList,
        productId: selectedProduct.product.id
      })
    );
    setOpenDeleteProductModal(false);
  };

  const columns: ColumnDef<any>[] = [
    {
      header: ({ column }) => (
        <SortElement column={column} headerLabel="Nome" />
      ),
      accessorKey: 'name',
      cell: ({ row }) => row.getValue('name')
    },
    {
      header: ({ column }) => (
        <SortElement column={column} headerLabel="Valor Unit" />
      ),
      accessorKey: 'value',
      cell: ({ row }) => row.getValue('value')
    },
    {
      header: ({ column }) => <SortElement column={column} headerLabel="Qnt" />,
      accessorKey: 'amount',
      cell: ({ row }) => row.getValue('amount')
    },
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
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex gap-6 justify-end">
            <Button
              size="icon"
              variant="icon"
              onClick={() => handleOpenEditModal(row.original, row.index)}
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

  const getStatusColor = (status: StatusList): string => {
    switch (status) {
      case StatusList.ACTIVE:
        return 'text-yellow-500'; // Yellow for in-progress
      case StatusList.DONE:
        return 'text-green-500'; // Green for completed
      case StatusList.PROGRESS:
        return 'text-blue-500'; // Blue for pending
      case StatusList.EXPIRED:
      case StatusList.CLOSED:
        return 'text-red-500'; // Red for canceled
      default:
        return 'text-gray-500'; // Gray for unknown status
    }
  };

  useEffect(() => {
    if (!marketList) {
      navigate(PageType.MarketControl);
    }
  }, []);

  if (!marketList) {
    return null;
  }
  return (
    <SidebarComponent>
      <MainContainer>
        <div className="flex flex-col justify-between h-full">
          <MainFilterPage
            primaryBtnLabel={
              marketList.status === StatusList.PROGRESS
                ? 'Continuar Compra'
                : 'Iniciar Compra'
            }
            secondaryBtnLabel="Adicionar Produto"
            handlePrimaryBtn={handleStartShopping}
            primaryBtnVariant="outline"
            secondaryBtnVariant="creation"
            handleSecondaryBtn={handleCreateNewProduct}
            topLabelComponent={
              <div className="text-zinc-200 text-xl">
                <span>{formatDate(marketList.date, 'dd/MM/yyyy')}</span> |{' '}
                <span
                  className={`font-semibold ${getStatusColor(marketList.status)}`}
                >
                  {StatusListLabels[marketList.status]}
                </span>
              </div>
            }
          />
          <DataTable
            columns={columns}
            data={productsList as Product[]}
            primaryFilter="name"
            primaryFilterLabel="Nome do produto"
          />
        </div>
        <EditProductModal
          isOpen={openAddModal}
          setIsOpen={setOpenAddModal}
          marketList={marketList}
          type="add"
        />
        <EditProductModal
          isOpen={openEditModal}
          setIsOpen={setOpenEditModal}
          type="edit"
          marketList={marketList}
          productIndex={selectedProduct.productIndex}
        />
        <ConfirmationModal
          isOpen={openDeleteProductModal}
          setIsOpen={setOpenDeleteProductModal}
          title="Você tem certeza que deseja deletar este produto?"
          description="Essa ação não pode ser desfeita. Isso excluirá permanentemente seu produto."
          onSubmit={handleDeleteProduct}
          isLoading={isDeletingProduct === ActionStatus.LOADING}
        />
      </MainContainer>
    </SidebarComponent>
  );
};
