import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { BasePagination } from './base-pagination';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Dropdown } from './dropdown';
import { Conditional } from './conditional';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  primaryFilter?: string;
  primaryFilterLabel?: string;
  secondaryFilter?: string;
  secondaryFilterLabel?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  primaryFilter,
  primaryFilterLabel,
  secondaryFilter,
  secondaryFilterLabel
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <div
      className={cn('flex flex-1 flex-col gap-6 h-full', {
        // 'min-h-[700px] max-h-[700px]': !!primaryFilter || !!secondaryFilter,
        // 'min-h-[630px] max-h-[630px]': !primaryFilter && !secondaryFilter
      })}
    >
      <div>
        <Conditional condition={!!primaryFilter || !!secondaryFilter}>
          <div className="flex items-center justify-between py-4">
            <Conditional condition={!!primaryFilter}>
              <Input
                placeholder={`Filtrar por ${primaryFilterLabel ?? ''}...`}
                value={
                  (table
                    .getColumn(primaryFilter as string)
                    ?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table
                    .getColumn(primaryFilter as string)
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-[300px]"
              />
            </Conditional>
            <Conditional condition={!!secondaryFilter}>
              <Dropdown
                id={secondaryFilter as string}
                placeholder={`Filtrar por ${secondaryFilterLabel ?? ''}...`}
                value={
                  (table
                    .getColumn(secondaryFilter as string)
                    ?.getFilterValue() as string) ?? ''
                }
                onChange={(value) =>
                  table
                    .getColumn(secondaryFilter as string)
                    ?.setFilterValue(value)
                }
                options={[
                  { label: 'Receita', value: '1' },
                  { label: 'Despesa', value: '2' }
                ]}
                boxStyles="max-w-[300px]"
              />
            </Conditional>
          </div>
        </Conditional>

        <div className="rounded-md border border-zinc-700 max-h-[400px]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Nenhum resultado encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <BasePagination table={table} />
    </div>
  );
}
