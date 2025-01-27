import { DataTable } from '@/components/generic/base-table';
import { Header } from '@/components/generic/header';
import { MainContainer } from '@/components/generic/main-container';
import { MainFilterPage } from '@/components/generic/main-filter-page';
import { SortElement } from '@/components/generic/sort-element';
import { Button } from '@/components/ui/button';
import { PageType } from '@/models/enums';
import { MarketList, Product } from '@/models/interfaces';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditProductModal } from './edit-product-modal';
import { useAppSelector } from '@/reducers';
import { selectMarketListSelected } from '@/reducers/market/selectors';

export const ActualList = () => {
  const navigate = useNavigate();
  const marketList = useAppSelector(selectMarketListSelected);
  const productsList = marketList?.products;
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    product: Product;
    productIndex: number;
  }>({ product: {} as Product, productIndex: 0 });
  const handleStartShopping = () => {
    alert('Iniciar Compra');
  };
  const handleCreateNewProduct = () => {
    setOpenAddModal(true);
  };

  const handleOpenEditModal = (product: Product, productIndex: number) => {
    setSelectedProduct({ product, productIndex });
    setOpenEditModal(true);
  };

  const handleOpenDeleteModal = (product: Product) => {};

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

  useEffect(() => {
    if (!marketList) {
      navigate(PageType.MarketControl);
    }
  }, []);

  if (!marketList) {
    return null;
  }
  return (
    <div className="flex w-full flex-col">
      <Header />
      <MainContainer>
        <div className="flex flex-col justify-between h-full">
          <MainFilterPage
            title="Gerenciamento de Lista"
            primaryBtnLabel="Iniciar Compra"
            secondaryBtnLabel="Adicionar Produto"
            handlePrimaryBtn={handleStartShopping}
            primaryBtnVariant="outline"
            secondaryBtnVariant="creation"
            handleSecondaryBtn={handleCreateNewProduct}
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
      </MainContainer>
    </div>
  );
};
