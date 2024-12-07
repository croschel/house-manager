import { useLocation, useNavigate } from 'react-router-dom';
import bgHouse from '../../assets/small-logo.png';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { PageType } from '@/models/enums/pages';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleAvatarOptions = () => {
    // TODO - Implement Avatar Options
    alert('Future Feature');
  };

  const navigateExpense = () => {
    navigate(PageType.ExpenseControl);
  };

  const navigateMarket = () => {
    navigate(PageType.MarketControl);
  };

  return (
    <header
      className="flex w-full items-center justify-between gap-4 px-6 py-4 border-b-[1px]
        border-zinc-700"
    >
      <div className="flex flex-1 items-center gap-4">
        <img
          src={bgHouse}
          alt="House Manager Logo"
          className="w-[76px] h-[72px]"
        />
        <h1 className="text-[24px] text-zinc-200">House Manager</h1>
        <nav className="ml-8 flex">
          <Button
            className={`text-[18px] ${
              location.pathname.includes(PageType.ExpenseControl)
                ? 'underline'
                : ''
              }`}
            variant="navMenu"
            onClick={navigateExpense}
          >
            Controle de Gastos
          </Button>
          <Button
            className={`text-zinc-200 text-[18px] ${
              location.pathname.includes(PageType.MarketControl)
                ? 'underline'
                : ''
              }`}
            variant="navMenu"
            onClick={navigateMarket}
          >
            Controle de Compras
          </Button>
        </nav>
      </div>
      <Avatar>
        <AvatarImage
          onClick={handleAvatarOptions}
          src="https://github.com/shadcn.png"
          className="z-10"
        />
      </Avatar>
    </header>
  );
};
