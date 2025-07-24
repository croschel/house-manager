import { FC, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '@/reducers';
import { selectCurrentNotification } from '@/reducers/notification/selectors';
import { NotificationType } from '@/models/enums';
import { Icon } from './icon';
import { icons } from 'lucide-react';
import { addNotificationAction } from '@/reducers/notification/actions';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface Props {
  autoClose?: number | false;
}

export const ToastNotify: FC<Props> = ({ autoClose = 5000 }) => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(selectCurrentNotification);

  const toastStyles = cn(
    `font-[Inter] py-[12px] px-[8px] border-l-4  border-solid border-transparent w-full min-w-[500px] !bg-zinc-700`,
    notification?.type === NotificationType.ERROR && 'border-red-500',
    notification?.type === NotificationType.SUCCESS && 'border-green-500',
    notification?.type === NotificationType.INFORMATION && 'border-blue-500',
    notification?.type === NotificationType.WARNING && 'border-yellow-500'
  );

  const DefaultToast = ({ iconName }: { iconName: keyof typeof icons }) => (
    <div className={'flex gap-2 items-start '}>
      <Icon name={iconName} size={20} />
      <div className={'flex flex-col gap-1 text-left'}>
        <h4 className={'font-semibold text-sm m-0'}>{notification?.title}</h4>
        <span className={'font-normal text-sm'}>
          {notification?.description}
        </span>
      </div>
    </div>
  );

  const ToastError = () => <DefaultToast iconName="Ban" />;
  const ToastSuccess = () => <DefaultToast iconName="BadgeCheck" />;
  const ToastWarning = () => <DefaultToast iconName="TriangleAlert" />;
  const ToastInformation = () => (
    <DefaultToast iconName="MessageCircleWarning" />
  );

  const closeButton = () => {
    const handleClose = () => {
      dispatch(addNotificationAction(undefined));
      toast.dismiss();
    };
    return (
      <Button className="p-0 h-fit" variant="icon" onClick={handleClose}>
        <Icon name="X" />
      </Button>
    );
  };

  useEffect(() => {
    const displayToastError = () => toast(<ToastError />);
    const displayToastSuccess = () => toast(<ToastSuccess />);
    const displayToastInformation = () => toast(<ToastInformation />);
    const displayToastWarning = () => toast(<ToastWarning />);
    switch (notification?.type) {
      case NotificationType.ERROR:
        displayToastError();
        break;
      case NotificationType.SUCCESS:
        displayToastSuccess();
        break;
      case NotificationType.INFORMATION:
        displayToastInformation();
        break;
      case NotificationType.WARNING:
        displayToastWarning();
        break;
    }
  }, [notification]);
  return (
    <ToastContainer
      autoClose={autoClose}
      limit={1}
      draggable={false}
      closeButton={closeButton}
      hideProgressBar
      icon={false}
      toastClassName={toastStyles}
      className={'background-zinc-700'}
      bodyClassName={`p-0`}
      position="bottom-left"
      closeOnClick={false}
      theme="dark"
    />
  );
};
