import { GenericCheckbox } from '@/components/generic/checkbox';
import { Header } from '@/components/generic/header';
import { MainContainer } from '@/components/generic/main-container';
import { MainFilterPage } from '@/components/generic/main-filter-page';
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
    <div className="flex w-full flex-col">
      <Header />
      <MainContainer>
        <MainFilterPage
          title="Compra Ativa"
          secondaryBtnLabel="Finalizar Compra"
          primaryBtnVariant="outline"
          secondaryBtnVariant="destructive"
          handleSecondaryBtn={handleCloseList}
          descriptionElement={
            <div className="flex text-zinc-400 gap-1">
              <span>{`23, abr 24 -`}</span>
              <span className="text-blue-400">Andamento</span>
            </div>
          }
        />
        <ScrollArea className="h-[calc(100vh-253px)] mt-6">
          {selectedMarketList?.products.map((product) => (
            <div
              role="button"
              className="flex items-center justify-between border-[1px] border-zinc-700 px-4 py-4
                rounded-lg shadow-md shadow-black/30 hover:shadow-black/10 transition-shadow
                duration-300 ease-in-out mb-4 text-zinc-400"
            >
              <GenericCheckbox label={''} checked={false} onChange={() => {}} />
              <span>{product.name}</span>
              <span>{product.amount}</span>
              <span>{product.value}</span>
            </div>
          ))}
        </ScrollArea>
      </MainContainer>
    </div>
  );
};
