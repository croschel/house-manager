import { ActionStatus } from '@/models/enums';
import { FC, PropsWithChildren } from 'react';
import { Button } from '../ui/button';
import { LoadingSpinner } from './spinner';

type Props = {
  state: ActionStatus;
  message?: string;
  retry?: () => void;
};

export const Splash: FC<PropsWithChildren<Props>> = ({
  state = ActionStatus.INITIAL,
  message,
  retry,
  children
}) => (
  <>
    {state !== ActionStatus.SUCCESS && (
      <div
        className="bg-black bg-opacity-50 absolute h-[calc(100vh-105px)] top-[105px] inset-0 flex
          justify-center items-center z-10000"
      >
        <div className="flex flex-col gap-6">
          {state !== ActionStatus.FAILED && <LoadingSpinner size={60} />}
          {message !== undefined && (
            <div className="pt-4 text-center text-xl">{message}</div>
          )}
          {state === ActionStatus.FAILED && (
            <div className="pt-2 text-center">
              <Button variant={'default'} onClick={() => retry?.()}>
                Tentar Novamente
              </Button>
            </div>
          )}
        </div>
      </div>
    )}
    {children}
  </>
);
