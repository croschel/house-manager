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
              <table
                className="w-full border-separate"
                style={{ borderSpacing: '0 16px' }}
              >
                <thead className="text-zinc-400">
                  <tr>
                    <th className="px-2 py-0 text-left font-semibold">
                      Comprado
                    </th>
                    <th className="px-2 py-0 text-left font-semibold">
                      Produto
                    </th>
                    <th className="px-2 py-0 text-left font-semibold">Qnt</th>
                    <th className="px-2 py-0 text-left font-semibold">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={index}
                      className={'text-zinc-200'}
                      style={{
                        borderRadius: '0.5rem',
                        boxShadow:
                          '0 4px 6px 1px rgba(0,0,0,0.4), 0 1px 2px -2px rgba(0,0,0,0.1)',
                        background: product.done ? '#27272a' : 'inherit'
                      }}
                    >
                      <td className="px-4 py-5">
                        <GenericCheckbox
                          label={''}
                          checked={product.done}
                          onChange={(value) => handleProducts(index, value)}
                        />
                      </td>
                      <td className="px-2 py-5">
                        <span className={product.done ? 'line-through' : ''}>
                          {product.name}
                        </span>
                      </td>
                      <td className="px-2 py-5">
                        <span className={product.done ? 'line-through' : ''}>
                          {product.amount}
                        </span>
                      </td>
                      <td className="px-2 py-5">
                        <span className={product.done ? 'line-through' : ''}>
                          {product.value}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
