import { Conditional } from '@/components/generic/conditional';
import { DatePicker } from '@/components/generic/date-picker';
import { Dropdown } from '@/components/generic/dropdown';
import { FormModal } from '@/components/generic/form-modal';
import { InputLabel } from '@/components/generic/input-label';
import { SwitchLabel } from '@/components/generic/switch-label';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { errorMessages } from '@/models/constants';
import { ActionStatus, ExpenseValues } from '@/models/enums';
import { CreateFormExpense, ExpenseData } from '@/models/interfaces';
import { useAppDispatch, useAppSelector } from '@/reducers';
import { createExpense, updateExpense } from '@/reducers/expenses/actions';
import {
  selectCreateExpenseLoading,
  selectUpdateExpenseLoading
} from '@/reducers/loading/selectors';
import { createDropOptions } from '@/utils/generators';
import { expenseLabels } from '@/utils/options';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  type: 'add' | 'edit';
  expense?: ExpenseData;
}

const formSchema = z.object({
  name: z.string().min(1, errorMessages.requiredField),
  category: z.string().min(1, errorMessages.requiredField),
  value: z.string().min(1, errorMessages.requiredField),
  date: z.string(),
  local: z.string(),
  isFixedExpense: z.boolean(),
  otherCategory: z.string()
});

export const ExpenseModal: FC<Props> = ({
  isOpen,
  setIsOpen,
  type,
  expense
}) => {
  const dispatch = useAppDispatch();
  const isCreatingExpense = useAppSelector(selectCreateExpenseLoading);
  const isUpdatingExpense = useAppSelector(selectUpdateExpenseLoading);
  const isEditing = type === 'edit';
  const defaultValues = {
    name: isEditing ? expense?.name : '',
    category: isEditing ? expense?.category : '',
    value: isEditing ? expense?.value.toString() : '',
    date: isEditing ? expense?.date : new Date().toISOString(),
    local: isEditing ? expense?.location : '',
    isFixedExpense: isEditing ? expense?.isFixedExpense : false,
    otherCategory: isEditing ? (expense?.otherCategory ?? '') : ''
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    // @ts-ignore
    values: isEditing && {
      name: expense?.name ?? '',
      category: expense?.category ?? '',
      value: String(expense?.value ?? ''),
      date: expense?.date ?? new Date().toISOString(),
      local: expense?.location ?? '',
      isFixedExpense: expense?.isFixedExpense ?? false,
      otherCategory: expense?.otherCategory ?? ''
    }
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isEditing) {
      await dispatch(
        updateExpense({ ...expense, ...(values as unknown as ExpenseData) })
      );
    } else {
      await dispatch(
        createExpense({
          ...(values as unknown as CreateFormExpense),
          type: 'expense'
        })
      );
    }
    setIsOpen(false);
  };

  const title = type === 'add' ? 'Adicionar Despesa' : 'Editar Despesa';
  const description =
    type === 'add'
      ? 'Adicionar uma nova despesa realizada'
      : 'Editar uma despesa realizada';
  const titleButton = type === 'add' ? 'Adicionar' : 'Editar';

  return (
    <FormModal
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(false)}
      title={title}
      description={description}
      buttonLabel={`${titleButton} Despesa`}
      form={form}
      onSubmit={onSubmit}
      isLoading={
        isCreatingExpense === ActionStatus.LOADING ||
        isUpdatingExpense === ActionStatus.LOADING
      }
    >
      <div className="flex flex-row gap-4 items-start">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-[60%]">
              <FormControl>
                <InputLabel
                  id="name"
                  label="Nome"
                  inputProps={{
                    placeholder: 'Digite o nome do provento',
                    ...field
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="w-[40%]">
              <FormControl>
                <Dropdown
                  boxStyles="mt-[-8px]"
                  id="category"
                  label="Categoria"
                  value={field.value}
                  onChange={field.onChange}
                  options={createDropOptions(expenseLabels)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Conditional
        condition={form.getValues('category') === ExpenseValues.OTHER}
      >
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="otherCategory"
            render={({ field }) => (
              <FormItem className="w-[60%]">
                <FormControl>
                  <InputLabel
                    id="otherCategory"
                    label="Digite a categoria"
                    inputProps={{
                      type: 'text',
                      placeholder: 'Digite a outra categoria',
                      ...field
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Conditional>
      <div className="flex flex-row gap-4 items-start">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem className="w-[60%]">
              <FormControl>
                <InputLabel
                  id="value"
                  label="Valor"
                  inputProps={{
                    type: 'number',
                    placeholder: 'Digite o valor',
                    ...field
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="w-[40%]">
              <FormControl>
                <DatePicker
                  id="createdAt"
                  date={field.value}
                  setDate={field.onChange}
                  label="Data"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-row gap-4">
        <FormField
          control={form.control}
          name="local"
          render={({ field }) => (
            <FormItem className="w-[60%]">
              <FormControl>
                <InputLabel
                  id="local"
                  label="Local"
                  inputProps={{
                    type: 'text',
                    placeholder: 'Digite o local',
                    ...field
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-[40%]">
          <FormField
            control={form.control}
            name="isFixedExpense"
            render={({ field }) => (
              <FormItem className="w-full self-center">
                <FormControl>
                  <SwitchLabel
                    label="Despesa Fixa"
                    checked={field.value}
                    onChange={field.onChange}
                    labelPosition="right"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </FormModal>
  );
};
