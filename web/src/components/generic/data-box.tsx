import { icons } from 'lucide-react';
import { Icon } from './icon';
import { FC } from 'react';
import { Conditional } from './conditional';
import { cn } from '@/lib/utils';
import { categoriesIcons } from '@/models/constants/categories-icons';
import { ExpenseCategory } from '@/models/interfaces';
import { ExpenseValues } from '@/models/enums';

interface Props {
  iconName?: keyof typeof icons;
  iconColor?: string;
  iconSize?: number;
  title: string;
  size?: 'small' | 'medium' | 'fit-screen';
  mainValue?: string;
  subTitle?: string;
  category?: ExpenseCategory;
  customContent?: JSX.Element;
  className?: string;
  onClick?: () => void;
}

export const DataBox: FC<Props> = ({
  title,
  mainValue,
  subTitle,
  customContent,
  iconName,
  iconColor,
  iconSize,
  className = 'unset',
  size = 'fit-screen',
  category,
  onClick
}) => {
  return (
    <div
      className={cn(
        `flex flex-1 flex-col justify-between min-w-[300px] min-h-[160px] border
        rounded-xl border-zinc-700 px-[12px] py-[18px] hover:shadow-md overflow-auto
        hover:shadow-black/30 transition-shadow duration-300 ease-in-out cursor-pointer`,
        className,
        {
          'max-h-[200px]': size === 'small',
          'max-h-[400px]': size === 'medium'
        }
      )}
      onClick={onClick}
    >
      <div className="flex gap-2 justify-between">
        <span className="text-base text-zinc-200">{title}</span>
        <Conditional condition={!!iconName}>
          <Icon
            name={iconName as keyof typeof icons}
            color={iconColor}
            size={iconSize}
          />
        </Conditional>
      </div>
      <div
        className={`flex flex-col items-start gap-0 ${customContent && 'flex-1'}`}
      >
        <Conditional condition={!!customContent}>
          {customContent as JSX.Element}
        </Conditional>
        <Conditional condition={customContent === undefined}>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-start gap-0">
              <span className="text-2xl text-zinc-200">{mainValue}</span>
              <Conditional condition={!!subTitle}>
                <span className="text-xs text-zinc-400">{subTitle}</span>
              </Conditional>
            </div>
            <Conditional condition={category !== undefined}>
              <div className="flex text-zinc-300">
                {categoriesIcons[category as unknown as ExpenseValues]}
              </div>
            </Conditional>
          </div>
        </Conditional>
      </div>
    </div>
  );
};
