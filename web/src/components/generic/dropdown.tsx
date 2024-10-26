import { FC } from 'react';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { Conditional } from './conditional';
import { cn } from '@/lib/utils';
import { SelectField } from '@/models/interfaces';

interface Props {
  id: string;
  options: SelectField[];
  label?: string;
  boxStyles?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const Dropdown: FC<Props> = ({
  id,
  label,
  boxStyles,
  placeholder,
  options,
  value,
  onChange
}) => {
  return (
    <div
      className={cn(
        `flex flex-col ${!!label && 'gap-0'} justify-self-start w-full`,
        boxStyles
      )}
    >
      <Conditional condition={!!label}>
        <Label htmlFor={id} className="text-left text-zinc-200 py-2">
          {label}
        </Label>
      </Conditional>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder ?? 'Selecione uma categoria'} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
