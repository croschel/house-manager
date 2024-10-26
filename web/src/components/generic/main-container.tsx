import { ReactNode } from 'react';

export const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full h-full flex-col p-6 overflow-y-auto gap-4">
      {children}
    </div>
  );
};
