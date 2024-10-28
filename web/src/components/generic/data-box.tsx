import { icons } from 'lucide-react';
import { Icon } from './icon';
import { FC } from 'react';
import { Conditional } from './conditional';
import { cn } from '@/lib/utils';

interface Props {
  iconName?: keyof typeof icons;
  iconColor?: string;
  iconSize?: number;
  title: string;
  mainValue?: string;
  subTitle?: string;
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
  onClick
}) => {
  return (
    <div
      className={cn(
        `flex flex-1 flex-col justify-between min-w-[300px] min-h-[160px] border
        rounded-xl border-zinc-700 px-[12px] py-[18px] hover:shadow-md
        hover:shadow-black/30 transition-shadow duration-300 ease-in-out cursor-pointer`,
        className
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
      <div className="flex flex-col items-start gap-0">
        <Conditional condition={customContent === undefined}>
          <span className="text-2xl text-zinc-200">{mainValue}</span>
        </Conditional>
        <Conditional condition={!!customContent}>
          {customContent as JSX.Element}
        </Conditional>
        <Conditional condition={!!subTitle}>
          <span className="text-xs text-zinc-400">{subTitle}</span>
        </Conditional>
      </div>
    </div>
  );
};
