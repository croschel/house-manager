import { DateRange } from 'react-day-picker';
import { Button } from '../ui/button';
import { DatePickerRange } from './date-picker-range';
import { FC, ReactNode, useEffect, useState } from 'react';
import { subDays } from 'date-fns';
import { Conditional } from './conditional';

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
  onChange: (date: DateRange | undefined) => void;
  descriptionElement?: JSX.Element;
  handlePrimaryBtn?: () => void;
  handleSecondaryBtn?: () => void;
  primaryBtnLabel?: string;
  secondaryBtnLabel?: string;
  primaryBtnVariant?: BtnVariant;
  secondaryBtnVariant?: BtnVariant;
}

export const MainFilterPage: FC<Props> = ({
  title,
  descriptionElement,
  onChange,
  handlePrimaryBtn,
  handleSecondaryBtn,
  primaryBtnLabel,
  secondaryBtnLabel,
  primaryBtnVariant,
  secondaryBtnVariant
}) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 20),
    to: new Date()
  });

  useEffect(() => {
    onChange(date);
  }, [date]);
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-8 items-baseline">
        <div className="flex flex-col">
          <h1 className="text-[40px] text-zinc-200">{title}</h1>
          <Conditional condition={!!descriptionElement}>
            {descriptionElement as JSX.Element}
          </Conditional>
        </div>
        <DatePickerRange date={date} onChange={setDate} />
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
