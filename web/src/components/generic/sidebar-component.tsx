import { Separator } from '@/components/ui/separator';
import {
  SidebarContext,
  SidebarContextProps,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageTitle, PageType } from '@/models/enums';
import { LogOutIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useAppDispatch } from '@/reducers';
import { logout } from '@/reducers/user/actions';

export default function SidebarComponent({
  children
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleWidth = (context: SidebarContextProps | null) => {
    if (context !== null) {
      if (context?.isMobile) {
        return 'w-full';
      } else if (context?.state === 'expanded') {
        return 'w-[calc(100vw_-_var(--sidebar-width))]';
      } else if (context?.state === 'collapsed') {
        return 'w-[calc(100vw_-_var(--sidebar-width-icon))]';
      }
    }
    return '';
  };

  const getPageName = () => {
    const pathArray = location?.pathname?.split('/');
    const path = pathArray[pathArray.length - 1];
    if (location.pathname.includes(PageType.Shopping)) {
      return PageTitle.shopping;
    }
    // @ts-ignore
    return PageTitle[path];
  };

  const handleLogout = () => {
    dispatch(logout()).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        navigate(PageType.Login);
      }
    });
  };

  return (
    <SidebarProvider className="w-screen">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-zinc-700 px-4">
          <SidebarTrigger className="-ml-1 bg-zinc-600 text-zinc-100" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-zinc-600" />
          <div className="flex items-center justify-between w-full">
            <h1 className="text-zinc-200 text-lg">
              {/* @ts-ignore */}
              {getPageName()}
            </h1>
            <Button onClick={handleLogout}>
              <LogOutIcon color="white" />
            </Button>
          </div>
        </header>
        {
          <SidebarContext.Consumer>
            {(context) => (
              <div className={`${handleWidth(context)}`}>
                <div className="flex w-full flex-col">
                  <div className="flex">{children}</div>
                </div>
              </div>
            )}
          </SidebarContext.Consumer>
        }
      </SidebarInset>
    </SidebarProvider>
  );
}
