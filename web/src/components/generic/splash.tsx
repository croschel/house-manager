import { ActionStatus } from '@/models/enums';
import { FC, PropsWithChildren } from 'react';
import { Button } from '../ui/button';
import { LoadingSpinner } from './spinner';
import { Conditional } from './conditional';

type Props = {
  stateList: ActionStatus[];
  message?: string;
  retry?: () => void;
};

export const Splash: FC<PropsWithChildren<Props>> = ({
  stateList,
  message,
  retry,
  children
}) => (
  <>
    {stateList.some(
      (state) => state === ActionStatus.FAILED || state === ActionStatus.LOADING
    ) && (
      <div className="bg-black bg-opacity-50 flex flex-1 justify-center items-center z-10000">
        <div className="flex flex-col gap-6">
          {!stateList.includes(ActionStatus.FAILED) && (
            <LoadingSpinner size={60} />
          )}
          {message !== undefined && (
            <div className="pt-4 text-center text-xl">{message}</div>
          )}
          {stateList.includes(ActionStatus.FAILED) && (
            <div className="pt-2 text-center">
              <Button variant={'default'} onClick={() => retry?.()}>
                Tentar Novamente
              </Button>
            </div>
          )}
        </div>
      </div>
    )}
    <Conditional
      condition={stateList.every(
        (state) =>
          state === ActionStatus.SUCCESS || state === ActionStatus.INITIAL
      )}
    >
      <>{children}</>
    </Conditional>
  </>
);
