import { GenericCheckbox } from '@/components/generic/checkbox';
import { Conditional } from '@/components/generic/conditional';
import { MainContainer } from '@/components/generic/main-container';
import { MainFilterPage } from '@/components/generic/main-filter-page';
import SidebarComponent from '@/components/generic/sidebar-component';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PageType, StatusList } from '@/models/enums';
import { MarketList, Product } from '@/models/interfaces';
import { useAppDispatch, useAppSelector } from '@/reducers';
import { updateMarketList } from '@/reducers/market/actions';
import { selectMarketListSelected } from '@/reducers/market/selectors';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Shopping = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const selectedMarketList = useAppSelector(selectMarketListSelected);
  const [products, setProducts] = useState<Product[]>(
    selectedMarketList?.products || []
  );

  const handleProducts = (index: number, value: boolean) => {
    const newProductList = products.map((product, i) =>
      i === index ? { ...product, done: value } : product
    );
    setProducts(newProductList);
  };

  const handleFinishProductList = async () => {
    const newProductList = products.filter((product) => product.done);
    await dispatch(
      updateMarketList({
        ...selectedMarketList,
        status: StatusList.DONE,
        products: newProductList
      } as MarketList)
    );
  };

  const handleSaveProductList = async () => {
    await dispatch(
      updateMarketList({
        ...selectedMarketList,
        products
      } as MarketList)
    );
  };

  useEffect(() => {
    if (!params.listId || selectedMarketList?._id !== params.listId)
      navigate(PageType.MarketControl);
  }, []);

  return (
    <SidebarComponent>
      <MainContainer>
        <MainFilterPage
          secondaryBtnLabel="Finalizar Compra"
          primaryBtnVariant="outline"
          primaryBtnLabel="Salvar"
          secondaryBtnVariant="destructive"
          handleSecondaryBtn={handleFinishProductList}
          handlePrimaryBtn={handleSaveProductList}
          disablePrimaryBtn={
            JSON.stringify(products) ===
            JSON.stringify(selectedMarketList?.products)
          }
        />
        <ScrollArea className="h-[calc(100vh-253px)] mt-6">
          <Conditional condition={products.length > 0}>
            <div className="max-w-[99%]">
              {products.map((product, index) => (
                <div
                  role="button"
                  className="flex items-center justify-between border-[1px] border-zinc-600 px-4 py-4
                    rounded-lg shadow-md shadow-black/30 hover:shadow-black/10 transition-shadow
                    duration-300 ease-in-out mb-4 text-zinc-200"
                >
                  <GenericCheckbox
                    label={''}
                    checked={product.done}
                    onChange={(value) => handleProducts(index, value)}
                  />
                  <span>{product.name}</span>
                  <span>{product.amount}</span>
                  <span>{product.value}</span>
                </div>
              ))}
            </div>
          </Conditional>
          <Conditional condition={products.length === 0}>
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-zinc-200">Nenhum produto encontrado</span>
            </div>
          </Conditional>
        </ScrollArea>
      </MainContainer>
    </SidebarComponent>
  );
};
