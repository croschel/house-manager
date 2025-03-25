import { GenericCheckbox } from '@/components/generic/checkbox';
import { Header } from '@/components/generic/header';
import { MainContainer } from '@/components/generic/main-container';
import { MainFilterPage } from '@/components/generic/main-filter-page';
import SidebarComponent from '@/components/generic/sidebar-component';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PageType } from '@/models/enums';
import { useAppSelector } from '@/reducers';
import { selectMarketListSelected } from '@/reducers/market/selectors';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Shopping = () => {
  const handleCloseList = () => {};
  const params = useParams();
  const navigate = useNavigate();
  const selectedMarketList = useAppSelector(selectMarketListSelected);
  useEffect(() => {
    if (!params.listId || selectedMarketList?.id !== params.listId)
      navigate(PageType.MarketControl);
  }, []);

  return (
    <SidebarComponent>
      <MainContainer>
        <MainFilterPage
          secondaryBtnLabel="Finalizar Compra"
          primaryBtnVariant="outline"
          secondaryBtnVariant="destructive"
          handleSecondaryBtn={handleCloseList}
        />
        <ScrollArea className="h-[calc(100vh-253px)] mt-6">
          <div className="max-w-[99%]">
            {selectedMarketList?.products.map((product) => (
              <div
                role="button"
                className="flex items-center justify-between border-[1px] border-zinc-600 px-4 py-4
                  rounded-lg shadow-md shadow-black/30 hover:shadow-black/10 transition-shadow
                  duration-300 ease-in-out mb-4 text-zinc-200"
              >
                <GenericCheckbox
                  label={''}
                  checked={false}
                  onChange={() => {}}
                />
                <span>{product.name}</span>
                <span>{product.amount}</span>
                <span>{product.value}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </MainContainer>
    </SidebarComponent>
  );
};
