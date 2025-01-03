import { DateRange } from 'react-day-picker';
import { Button } from '../ui/button';
import { DatePickerRange } from './date-picker-range';
import { FC, ReactNode, useEffect, useState } from 'react';
import { subDays } from 'date-fns';
import { Conditional } from './conditional';
import { Icon } from './icon';
import { useAppDispatch, useAppSelector } from '@/reducers';
import { selectExpenseDateFilter } from '@/reducers/expenses/selectors';
import { setExpenseDateFilter } from '@/reducers/expenses/actions';

type BtnVariant =
  | 'default'
  | 'link'
  | 'destructive'
  | 'creation'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'navMenu'
  | null
  | undefined;

interface Props {
  title: string;
  onSubmitFilter: (date: DateRange | undefined) => void;
  descriptionElement?: JSX.Element;
  handlePrimaryBtn?: () => void;
  handleSecondaryBtn?: () => void;
  primaryBtnLabel?: string;
  secondaryBtnLabel?: string;
  primaryBtnVariant?: BtnVariant;
  secondaryBtnVariant?: BtnVariant;
  dynamicFlex?: boolean;
}

export const MainFilterPage: FC<Props> = ({
  title,
  descriptionElement,
  onSubmitFilter,
  handlePrimaryBtn,
  handleSecondaryBtn,
  primaryBtnLabel,
  secondaryBtnLabel,
  primaryBtnVariant,
  secondaryBtnVariant,
  dynamicFlex = false
}) => {
  const dispatch = useAppDispatch();
  const expenseDateFilter = useAppSelector(selectExpenseDateFilter);
  const [date, setDate] = useState<DateRange | undefined>({
    ...expenseDateFilter
  });

  const handleSubmitFilter = () => {
    dispatch(setExpenseDateFilter(date as DateRange));
    onSubmitFilter(date);
  };
  return (
    <div
      className={`flex justify-between items-start ${dynamicFlex && 'flex-1 h-full'}`}
    >
      <div className="flex items-center">
        <div className="flex flex-col mr-8">
          <h1 className="text-[40px] text-zinc-200">{title}</h1>
          <Conditional condition={!!descriptionElement}>
            {descriptionElement as JSX.Element}
          </Conditional>
        </div>
        <DatePickerRange date={date} onChange={setDate} />
        <Button variant="outline" className="ml-1" onClick={handleSubmitFilter}>
          <Icon name="Filter" />
        </Button>
      </div>
      <div className="flex gap-4">
        <Conditional condition={!!primaryBtnLabel}>
          <Button variant={primaryBtnVariant} onClick={handlePrimaryBtn}>
            {primaryBtnLabel}
          </Button>
        </Conditional>
        <Conditional condition={!!secondaryBtnLabel}>
          <Button variant={secondaryBtnVariant} onClick={handleSecondaryBtn}>
            {secondaryBtnLabel}
          </Button>
        </Conditional>
      </div>
    </div>
  );
};
