import { ActionStatus, PageType } from '@/models/enums';
import { useAppSelector } from '@/reducers';
import { selectGetUserLoading } from '@/reducers/loading/selectors';
import { selectLoggedUser } from '@/reducers/user/selectors';
import { Navigate, Outlet } from 'react-router-dom';
import { Splash } from './splash';

export const LoggedWrapper = () => {
  const user = useAppSelector(selectLoggedUser);
  const loadingUserAction = useAppSelector(selectGetUserLoading);

  if (loadingUserAction === ActionStatus.LOADING) {
    return <Splash stateList={[loadingUserAction]} />;
  }
  return !!user ? <Outlet /> : <Navigate to={PageType.Login} replace />;
};
