import { icons } from 'lucide-react';
import { FC } from 'react';

interface Props {
  name: keyof typeof icons;
  color?: string;
  size?: number;
}

export const Icon: FC<Props> = ({ name, color, size }) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};
