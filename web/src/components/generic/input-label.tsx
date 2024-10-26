import React, { FC } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import { Conditional } from './conditional';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

interface Props {
  id: string;
  label?: string;
  inputProps?: InputProps;
  inputStyles?: string;
  labelStyles?: string;
  boxStyles?: string;
}
export const InputLabel: FC<Props> = ({
  id,
  label,
  boxStyles,
  inputProps,
  inputStyles,
  labelStyles
}) => {
  return (
    <div
      className={cn(`flex flex-col ${!!label && 'gap-2'} w-full`, boxStyles)}
    >
      <Conditional condition={!!label}>
        <Label
          htmlFor={id}
          className={cn('text-left text-zinc-200', labelStyles)}
        >
          {label}
        </Label>
      </Conditional>
      <Input
        id={id}
        className={cn('col-span-3', inputStyles)}
        {...inputProps}
      />
    </div>
  );
};
