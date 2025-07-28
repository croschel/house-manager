import { Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from '../login';
import { SignUp } from '../signup';
import { ExpenseControl } from '../expense-control';
import { PageType } from '@/models/enums/pages';
import { MarketControl } from '../market-control';
import { ActualList } from '../market-control/actual-list';
import { Shopping } from '../market-control/shopping';
import { LoggedWrapper } from '@/components/generic/logged-wrapper';
import { setNavigate } from '@/lib/navigate';
import { ExpenseList } from '../expense-control/expense-list';

export const RoutesComponent = () => {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <Routes>
      <Route path={'/'} element={<LoggedWrapper />}>
        <Route
          index
          path={PageType.ExpenseControl}
          element={<ExpenseControl />}
        />
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
      </Route>
      <Route path={PageType.Login} element={<Login />} />
      <Route path={PageType.SignUp} element={<SignUp />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
