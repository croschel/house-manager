import { Icon } from '@/components/generic/icon';
import { ExpenseValues } from '../enums';

export const categoriesIcons: Record<ExpenseValues, JSX.Element> = {
  [ExpenseValues.BILL]: <Icon name="Receipt" size={40} />,
  [ExpenseValues.CLOTHING]: <Icon name="Shirt" size={40} />,
  [ExpenseValues.EDUCATION]: <Icon name="BookOpen" size={40} />,
  [ExpenseValues.ENTERTAINMENT]: <Icon name="Film" size={40} />,
  [ExpenseValues.FOOD]: <Icon name="Utensils" size={40} />,
  [ExpenseValues.HEALTH]: <Icon name="HeartPulse" size={40} />,
  [ExpenseValues.HOUSING]: <Icon name="Home" size={40} />,
  [ExpenseValues.OTHER]: <Icon name="RectangleEllipsis" size={40} />,
  [ExpenseValues.RECREATION]: <Icon name="Dumbbell" size={40} />,
  [ExpenseValues.TRANSPORT]: <Icon name="Bus" size={40} />,
  [ExpenseValues.UTILITIES]: <Icon name="Lightbulb" size={40} />
};
