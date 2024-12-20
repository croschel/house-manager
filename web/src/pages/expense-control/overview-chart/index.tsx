import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { FC } from 'react';
import { Funnel, FunnelChart, LabelList } from 'recharts';

interface Props {
  expensesPerCategory: {
    name: string;
    category: string;
    value: number;
    fill: string;
  }[];
}

export const OverviewChart: FC<Props> = ({ expensesPerCategory }) => {
  return (
    <div className="w-full max-w-[920px] flex flex-1 items-center self-center">
      <ChartContainer className="h-[400px] w-full" config={{}}>
        <FunnelChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Funnel dataKey="value" data={expensesPerCategory} isAnimationActive>
            <LabelList
              position="right"
              fill="#fff"
              stroke="#fff"
              dataKey="name"
            />
          </Funnel>
        </FunnelChart>
      </ChartContainer>
    </div>
  );
};
