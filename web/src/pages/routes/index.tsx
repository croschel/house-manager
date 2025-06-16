import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes
} from 'react-router-dom';
import { Login } from '../login';
import { SignUp } from '../signup';
import { ExpenseControl } from '../expense-control';
import { PageType } from '@/models/enums/pages';
import { ExpenseList } from '../expense-list';
import { MarketControl } from '../market-control';
import { ActualList } from '../market-control/actual-list';
import { Shopping } from '../market-control/shopping';

export const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={PageType.SignUp} element={<SignUp />} />
        <Route path={PageType.ExpenseControl} element={<ExpenseControl />} />
        <Route
          path={`${PageType.ExpenseControl}${PageType.ExpenseList}`}
          element={<ExpenseList />}
        />
        <Route path={PageType.MarketControl} element={<MarketControl />} />
        <Route
          path={`${PageType.MarketControl}${PageType.MarketList}`}
          element={<ActualList />}
        />
        <Route path={`${PageType.Shopping}/:listId`} element={<Shopping />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
