import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format, formatDate, formatISO } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Label } from '../ui/label';

interface Props {
  id: string;
  date: string | undefined;
  setDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  label?: string;
  boxStyles?: string;
}
export const DatePicker: React.FC<Props> = ({
  id,
  date,
  setDate,
  label,
  boxStyles
}) => {
  return (
    <div
      className={cn(
        `flex flex-col ${!!label && 'gap-2'} items-start w-full`,
        boxStyles
      )}
    >
      <Label htmlFor={id} className="text-left text-zinc-200">
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal border-zinc-500 text-zinc-200',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-zinc-200" />
            {date ? (
              format(date, 'PPP')
            ) : (
              <span className="text-zinc-200">Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date !== undefined ? new Date(date) : date}
            onSelect={(value: Date | undefined) =>
              setDate(value !== undefined ? formatISO(value) : undefined)
            }
            initialFocus
            className="pointer-events-auto" // required to make calendar working with modal
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
