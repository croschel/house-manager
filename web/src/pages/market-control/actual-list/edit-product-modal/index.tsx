import { FormFieldWrapper } from '@/components/generic/form-field-wrapper';
import { FormModal } from '@/components/generic/form-modal';
import { RowFieldForm } from '@/components/generic/row-field-form';
import { ActionStatus, SupermarketSections } from '@/models/enums';
import { MarketList } from '@/models/interfaces';
import { useAppDispatch, useAppSelector } from '@/reducers';
import {
  selectCreateProductFromMarketListLoading,
  selectUpdateProductFromMarketListLoading
} from '@/reducers/loading/selectors';
import {
  createNewProductForMarketList,
  updateProductFromMarketList
} from '@/reducers/market/actions';
import { createDropOptions } from '@/utils/generators';
import { SupermarketOptLabels } from '@/utils/options/market';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  type: 'add' | 'edit';
  marketList: MarketList;
  productIndex?: number;
}

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  value: z.string().min(1, 'Valor é obrigatório'),
  amount: z.string().min(1, 'Quantidade é obrigatória')
});

export const EditProductModal: FC<Props> = ({
  isOpen,
  setIsOpen,
  marketList = {} as MarketList,
  productIndex = 0,
  type
}) => {
  const dispatch = useAppDispatch();
  const isUpdatingProduct = useAppSelector(
    selectUpdateProductFromMarketListLoading
  );
  const isCreatingProduct = useAppSelector(
    selectCreateProductFromMarketListLoading
  );
  const isEditing = type === 'edit';
  const product = marketList?.products?.[productIndex];
  const defaultValues = {
    name: isEditing ? product.name : '',
    category: isEditing ? product.category : '',
    value: isEditing ? String(product.value) : '',
    amount: isEditing ? String(product.amount) : ''
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    values: {
      ...defaultValues
    }
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isEditing) {
      await dispatch(
        updateProductFromMarketList({
          marketList,
          newProduct: {
            ...product,
            name: values.name,
            category: values.category as SupermarketSections,
            value: Number(values.value),
            amount: Number(values.amount)
          }
        })
      );
    } else {
      dispatch(
        createNewProductForMarketList({
          marketList,
          newProduct: {
            name: values.name,
            category: values.category as SupermarketSections,
            value: Number(values.value),
            amount: Number(values.amount)
          }
        })
      );
    }
    setIsOpen(false);
  };

  return (
    <FormModal
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(false)}
      title={`${isEditing ? 'Editar' : 'Criar'} Produto da Lista de Compras`}
      description={`${isEditing ? 'Editar' : 'Criar'} um Produto de uma lista de compras ativa`}
      buttonLabel={`${isEditing ? 'Atualizar' : 'Criar'} Produto`}
      form={form}
      onSubmit={onSubmit}
      isLoading={
        isUpdatingProduct === ActionStatus.LOADING ||
        isCreatingProduct === ActionStatus.LOADING
      }
    >
      <RowFieldForm>
        <FormFieldWrapper
          form={form}
          name="name"
          label="Nome do produto"
          placeholder="Digite o nome do produto"
          fieldSizePercent={60}
          typeInput="text"
        />
        <FormFieldWrapper
          form={form}
          name="category"
          label="Categoria"
          fieldSizePercent={40}
          typeInput="dropdown"
          dropOptions={createDropOptions(SupermarketOptLabels)}
        />
      </RowFieldForm>
      <RowFieldForm>
        <FormFieldWrapper
          form={form}
          name="value"
          label="Valor"
          placeholder="Digite o valor"
          fieldSizePercent={70}
          typeInput="number"
        />
        <FormFieldWrapper
          form={form}
          name="amount"
          label="Quantidade"
          placeholder="Digite a quantidade"
          fieldSizePercent={30}
          typeInput="number"
        />
      </RowFieldForm>
    </FormModal>
  );
};
