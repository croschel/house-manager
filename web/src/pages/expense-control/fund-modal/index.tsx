import { DatePicker } from '@/components/generic/date-picker';
import { Dropdown } from '@/components/generic/dropdown';
import { FormModal } from '@/components/generic/form-modal';
import { InputLabel } from '@/components/generic/input-label';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { errorMessages } from '@/models/constants';
import { ActionStatus } from '@/models/enums';
import { CreateFormExpense } from '@/models/interfaces';
import { useAppDispatch, useAppSelector } from '@/reducers';
import { createExpense } from '@/reducers/expenses/actions';
import { selectCreateExpenseLoading } from '@/reducers/loading/selectors';
import { createDropOptions } from '@/utils/generators';
import { fundLabels } from '@/utils/options';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(1, errorMessages.requiredField),
  category: z.string().min(1, errorMessages.requiredField),
  value: z.string().min(1, errorMessages.requiredField),
  createdAt: z.string()
});

export const FundModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();
  const isCreatingExpense = useAppSelector(selectCreateExpenseLoading);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: '',
      value: '',
      createdAt: new Date().toISOString()
    }
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(
      createExpense({
        ...(values as unknown as CreateFormExpense),
        type: 'fund'
      })
    );
  };
  return (
    <FormModal
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(false)}
      title="Adicionar Fundo"
      description="Adicionar um recebimento de proventos"
      buttonLabel="Adicionar Fundo"
      form={form}
      onSubmit={onSubmit}
      isLoading={isCreatingExpense === ActionStatus.LOADING}
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
                  options={createDropOptions(fundLabels)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
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
          name="createdAt"
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
    </FormModal>
  );
};
