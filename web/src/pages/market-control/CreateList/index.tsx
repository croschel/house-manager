import { DatePicker } from '@/components/generic/date-picker';
import { FormModal } from '@/components/generic/form-modal';
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
}

const formSchema = z.object({
  createdAtList: z.string().min(1, errorMessages.requiredField)
});

export const CreateList: FC<Props> = ({ isOpen, setIsOpen }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      createdAtList: new Date().toISOString()
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <FormModal
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(false)}
      title="Adicionar Lista"
      description="Adicionar uma nova lista de compras"
      buttonLabel="Criar Lista"
      form={form}
      onSubmit={onSubmit}
    >
      <div className="flex flex-row mt-4">
        <FormField
          control={form.control}
          name="createdAtList"
          render={({ field }) => (
            <FormItem className="w-[50%]">
              <FormControl>
                <DatePicker
                  id="createdAtList"
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
