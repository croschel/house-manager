import { Icon } from '@/components/generic/icon';
import { ExpenseValues } from '../enums';

export const categoriesIcons: Record<ExpenseValues, JSX.Element> = {
  [ExpenseValues.BILL]: <Icon name="Receipt" size={34} />,
  [ExpenseValues.CLOTHING]: <Icon name="Shirt" size={34} />,
  [ExpenseValues.EDUCATION]: <Icon name="BookOpen" size={34} />,
  [ExpenseValues.ENTERTAINMENT]: <Icon name="Film" size={34} />,
  [ExpenseValues.FOOD]: <Icon name="Utensils" size={34} />,
  [ExpenseValues.HEALTH]: <Icon name="HeartPulse" size={34} />,
  [ExpenseValues.HOUSING]: <Icon name="House" size={34} />,
  [ExpenseValues.OTHER]: <Icon name="RectangleEllipsis" size={34} />,
  [ExpenseValues.RECREATION]: <Icon name="Dumbbell" size={34} />,
  [ExpenseValues.TRANSPORT]: <Icon name="Bus" size={34} />,
  [ExpenseValues.UTILITIES]: <Icon name="Lightbulb" size={34} />
};
