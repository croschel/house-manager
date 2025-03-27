import { ConfirmationModal } from '@/components/generic/confirmation-modal';
import { DatePicker } from '@/components/generic/date-picker';
import { FormModal } from '@/components/generic/form-modal';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { errorMessages } from '@/models/constants';
import { ActionStatus, StatusList } from '@/models/enums';
import { useAppDispatch, useAppSelector } from '@/reducers';
import { selectCreateMarketListLoading } from '@/reducers/loading/selectors';
import { createMarketList } from '@/reducers/market/actions';
import { selectMarketList } from '@/reducers/market/selectors';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const formSchema = z.object({
  date: z.string().min(1, errorMessages.requiredField)
});

export const CreateList: FC<Props> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();
  const marketLists = useAppSelector(selectMarketList);
  const isCreatingList = useAppSelector(selectCreateMarketListLoading);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString()
    }
  });

  const hasProgressList = useMemo(
    () => marketLists.find((list) => list.status === StatusList.PROGRESS),
    [marketLists]
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await dispatch(createMarketList(values.date as unknown as Date));
    setIsOpen(false);
  };

  return (
    <FormModal
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(false)}
      title="Adicionar Lista"
      description={
        !!hasProgressList
          ? 'Voce ja possui uma lista em andamento, contudo pode criar uma nova.'
          : 'Adicionar uma nova lista de compras'
      }
      buttonLabel="Criar Lista"
      form={form}
      onSubmit={onSubmit}
      isLoading={isCreatingList === ActionStatus.LOADING}
    >
      <div className="flex flex-row mt-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="w-[50%]">
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
      </div>
    </FormModal>
  );
};
