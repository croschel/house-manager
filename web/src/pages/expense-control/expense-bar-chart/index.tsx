import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { FC } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

interface Props {
  last12MonthsFundsExpenses: any[];
}
export const ExpenseBarChart: FC<Props> = ({ last12MonthsFundsExpenses }) => {
  const chartConfigExpenseFund = {
    funds: {
      label: 'Proventos',
      color: '#5ec26b'
    },
    expense: {
      label: 'Despesas',
      color: '#E84545'
    }
  } satisfies ChartConfig;
  return (
    <div>
      <ChartContainer
        config={chartConfigExpenseFund}
        className="min-h-[230px] w-full"
      >
        <BarChart accessibilityLayer data={last12MonthsFundsExpenses}>
          <ChartTooltip content={<ChartTooltipContent />} />
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Bar dataKey="funds" fill="var(--color-funds)" radius={2} />
          <Bar dataKey="expenses" fill="var(--color-expense)" radius={2} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
