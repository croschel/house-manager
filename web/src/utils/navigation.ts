import { PageType } from '@/models/enums';
import { useLocation, useNavigate } from 'react-router-dom';

export const navigateToPreviousPage = (
  location: ReturnType<typeof useLocation>,
  navigate: ReturnType<typeof useNavigate>
) => {
  const pageMapping: { [key: string]: string } = {
    [PageType.ExpenseList]: PageType.ExpenseControl,
    [PageType.MarketList]: PageType.MarketControl,
    [PageType.Shopping]: `${PageType.MarketControl}${PageType.MarketList}`
  };

  for (const key in pageMapping) {
    if (location.pathname.includes(key)) {
      navigate(pageMapping[key]);
      return;
    }
  }

  navigate(PageType.ExpenseControl);
};
