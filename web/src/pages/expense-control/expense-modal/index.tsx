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
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  type: 'add' | 'edit';
}

const formSchema = z.object({
  name: z.string().min(1, errorMessages.requiredField),
  category: z.string().min(1, errorMessages.requiredField),
  value: z.string().min(1, errorMessages.requiredField),
  date: z.date(),
  local: z.string(),
  repeatedExpense: z.boolean()
});

export const ExpenseModal: FC<Props> = ({ isOpen, setIsOpen, type }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: '',
      value: '',
      date: new Date(),
      local: '',
      repeatedExpense: false
    }
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
    >
      <div className="flex flex-row gap-4 items-center">
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
                  id="category"
                  label="Categoria"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: 'Receita', value: '1' },
                    { label: 'Despesa', value: '2' }
                  ]}
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
            name="repeatedExpense"
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
