import { DatePicker } from '@/components/generic/date-picker';
import { FormModal } from '@/components/generic/form-modal';
import { SwitchLabel } from '@/components/generic/switch-label';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { ActionStatus, StatusList } from '@/models/enums';
import { MarketList } from '@/models/interfaces';
import { useAppDispatch, useAppSelector } from '@/reducers';
import { selectCreateExpenseLoading } from '@/reducers/loading/selectors';
import { updateMarketList } from '@/reducers/market/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  marketList: MarketList;
}

const formSchema = z.object({
  date: z.string(),
  status: z.string()
});

export const EditListModal: FC<Props> = ({ isOpen, setIsOpen, marketList }) => {
  const dispatch = useAppDispatch();
  const isCreatingExpense = useAppSelector(selectCreateExpenseLoading);
  console.log(marketList);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: marketList.date,
      status: marketList.status
    },
    values: {
      date: marketList.date,
      status: marketList.status
    }
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await dispatch(
      updateMarketList({
        ...marketList,
        ...(values as unknown as MarketList)
      })
    );
    setIsOpen(false);
  };

  return (
    <FormModal
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(false)}
      title="Editar Lista de Compras"
      description="Editar uma lista de compras ativa ou fechada"
      buttonLabel="Atualizar Lista"
      form={form}
      onSubmit={onSubmit}
      isLoading={isCreatingExpense === ActionStatus.LOADING}
    >
      <div className="flex flex-row gap-4 items-start">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="w-[40%]">
              <FormControl>
                <DatePicker
                  id="date"
                  date={field.value}
                  setDate={field.onChange}
                  label="Data"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-full self-center">
              <FormControl>
                <SwitchLabel
                  label="Lista Concluída"
                  checked={
                    field.value === StatusList.DONE ||
                    field.value === StatusList.CLOSED ||
                    field.value === StatusList.EXPIRED
                  }
                  onChange={(value: boolean) =>
                    field.onChange(
                      value ? StatusList.CLOSED : StatusList.ACTIVE
                    )
                  }
                  labelPosition="right"
                  disabled={
                    field.value === StatusList.EXPIRED ||
                    field.value === StatusList.DONE ||
                    field.value === StatusList.PROGRESS
                  }
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
