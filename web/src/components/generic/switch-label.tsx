import { FC } from 'react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Conditional } from './conditional';

interface Props {
  label: string;
  checked: boolean;
  onChange: () => void;
  labelPosition: 'left' | 'right';
}

export const SwitchLabel: FC<Props> = ({
  label,
  checked,
  onChange,
  labelPosition = 'right'
}) => {
  return (
    <div className="flex items-center">
      <Conditional condition={labelPosition === 'left'}>
        <Label className="ml-2 text-zinc-200">{label}</Label>
      </Conditional>
      <Switch checked={checked} onCheckedChange={onChange} />
      <Conditional condition={labelPosition === 'right'}>
        <Label className="ml-2 text-zinc-200">{label}</Label>
      </Conditional>
    </div>
  );
};
