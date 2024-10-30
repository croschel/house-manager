import { ReactNode } from 'react';

export const MainContainer = ({
  children,
  noOverflow
}: {
  children: ReactNode;
  noOverflow?: boolean;
}) => {
  return (
    <div
      className={`flex w-full flex-col p-6 gap-4 h-[calc(100vh-105px)]
        ${noOverflow ? '' : 'overflow-y-auto'}`}
    >
      {children}
    </div>
  );
};
