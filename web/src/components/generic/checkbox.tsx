import { Checkbox } from '@/components/ui/checkbox';
import { FC } from 'react';
import { Conditional } from './conditional';

interface Props {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const GenericCheckbox: FC<Props> = ({
  label,
  checked,
  onChange,
  description
}) => {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        id={`checkbox-${label.replace(' ', '-').toLowerCase()}`}
        defaultChecked={checked}
        onCheckedChange={(value) => onChange(value as boolean)}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={`checkbox-${label.replace(' ', '-').toLowerCase()}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
            peer-disabled:opacity-70"
        >
          {label}
        </label>
        <Conditional condition={!description}>
          <p className="text-sm text-muted-foreground">{description}</p>
        </Conditional>
      </div>
    </div>
  );
};
