import { FC } from 'react';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';
import { InputLabel } from './input-label';
import { Dropdown } from './dropdown';
import { SelectField } from '@/models/interfaces';
import { DatePicker } from './date-picker';

interface Props {
  form: UseFormReturn<any, any, undefined>;
  name: string;
  label?: string;
  placeholder?: string;
  typeInput?: 'text' | 'number' | 'dropdown' | 'date' | 'switch';
  dropOptions?: SelectField[];
  fieldSizePercent?: number;
}

export const FormFieldWrapper: FC<Props> = ({
  form,
  name,
  label,
  placeholder,
  typeInput,
  dropOptions,
  fieldSizePercent = 100
}) => {
  const getInputSelected = (field: any) => {
    switch (typeInput) {
      case 'text':
        return (
          <InputLabel
            id={name}
            label={label}
            inputProps={{
              placeholder,
              ...field
            }}
          />
        );
      case 'number':
        return (
          <InputLabel
            id={name}
            label={label}
            inputProps={{
              placeholder,
              type: 'number',
              ...field
            }}
          />
        );
      case 'dropdown':
        return (
          <Dropdown
            boxStyles="mt-[-8px]"
            id={name}
            label={label}
            value={field.value}
            onChange={field.onChange}
            options={dropOptions ?? []}
          />
        );
      case 'date':
        return (
          <DatePicker
            id={name}
            date={field.value}
            setDate={field.onChange}
            label={label}
          />
        );
    }
  };
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`w-[${fieldSizePercent}%]`}>
          <FormControl>{getInputSelected(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
