import { Column } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { Conditional } from './conditional';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface Props {
  column: Column<any, unknown>;
  headerLabel: string;
}

export const SortElement = ({ column, headerLabel }: Props) => {
  const isAsc = column.getIsSorted() === 'asc';
  const isDesc = column.getIsSorted() === 'desc';
  const noSort = column.getIsSorted() === false;
  const handleSorting = () => {
    if (isAsc) {
      column.toggleSorting(true);
    } else if (noSort) {
      column.toggleSorting(false);
    } else if (isDesc) {
      column.clearSorting();
    }
  };
  return (
    <Button size="icon" variant="icon" onClick={handleSorting}>
      <span className="font-semibold text-zinc-200 text-base text-left">
        {headerLabel}
      </span>
      <Conditional condition={isAsc}>
        <ArrowDown className="ml-2 h-4 w-4" />
      </Conditional>
      <Conditional condition={isDesc}>
        <ArrowUp className="ml-2 h-4 w-4" />
      </Conditional>
    </Button>
  );
};
