import { FC } from 'react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Conditional } from './conditional';

interface Props {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  labelPosition: 'left' | 'right';
  disabled?: boolean;
}

export const SwitchLabel: FC<Props> = ({
  label,
  checked,
  onChange,
  labelPosition = 'right',
  disabled = false
}) => {
  return (
    <div className="flex items-center">
      <Conditional condition={labelPosition === 'left'}>
        <Label className="ml-2 text-zinc-200">{label}</Label>
      </Conditional>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      />
      <Conditional condition={labelPosition === 'right'}>
        <Label className="ml-2 text-zinc-200">{label}</Label>
      </Conditional>
    </div>
  );
};
