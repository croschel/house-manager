import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';
import { Icon } from './icon';
import { icons } from 'lucide-react';
import bgHouse from '../../assets/small-logo.png';
import { Conditional } from './conditional';
import { useLocation } from 'react-router-dom';
import { PageType } from '@/models/enums';

interface DataProps {
  navMain: {
    title: string;
    url: string;
    items: {
      title: string;
      url: string;
      isActive: boolean;
      iconName: keyof typeof icons;
    }[];
  }[];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const { state } = useSidebar();
  const data: DataProps = {
    navMain: [
      {
        title: 'Menu Principal',
        url: '#',
        items: [
          {
            title: 'Controle de Despesas',
            url: PageType.ExpenseControl,
            isActive:
              location.pathname === PageType.ExpenseControl ||
              location.pathname ===
                `${PageType.ExpenseControl}${PageType.ExpenseList}`,
            iconName: 'Receipt'
          },
          {
            title: 'Controle de Compras',
            url: PageType.MarketControl,
            isActive:
              location.pathname === PageType.MarketControl ||
              location.pathname ===
                `${PageType.MarketControl}${PageType.MarketList}` ||
              location.pathname.includes(PageType.Shopping),
            iconName: 'ShoppingBasket'
          }
        ]
      }
    ]
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex gap-4 items-center">
          <img
            src={bgHouse}
            alt="House Manager Logo"
            className={
              state === 'expanded' ? 'w-[56px] h-[52px]' : 'w-[30px] h-[28px]'
            }
          />
          <Conditional condition={state === 'expanded'}>
            <span className="text-zinc-200">House Manager</span>
          </Conditional>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>
                        <Icon name={item.iconName} color="#E4E4E7" />
                        <span className="text-zinc-200">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
