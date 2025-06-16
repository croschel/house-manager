import { ActionStatus, PageType } from '@/models/enums';
import { useAppSelector } from '@/reducers';
import { selectGetUserLoading } from '@/reducers/loading/selectors';
import { selectLoggedUser } from '@/reducers/user/selectors';
import { Navigate } from 'react-router-dom';

export const LoggedWrapper = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectLoggedUser);
  const isLoadingUser = useAppSelector(selectGetUserLoading);
  if (
    isLoadingUser === ActionStatus.SUCCESS ||
    isLoadingUser === ActionStatus.FAILED
  ) {
    if (!user) {
      console.log('User not logged in, redirecting to login page');
      return <Navigate to={PageType.Login} replace />;
    }
  }

  return children;
};
