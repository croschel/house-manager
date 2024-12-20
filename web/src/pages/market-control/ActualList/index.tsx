import { Header } from '@/components/generic/header';
import { MainContainer } from '@/components/generic/main-container';
import { MainFilterPage } from '@/components/generic/main-filter-page';
import { DateRange } from 'react-day-picker';

export const ActualList = () => {
  const handleStartShopping = () => {
    alert('Iniciar Compra');
  };
  const handleFilter = (date: DateRange | undefined) => {
    console.log(date);
  };
  return (
    <div className="flex w-full flex-col">
      <Header />
      <MainContainer>
        <div className="flex flex-col justify-between h-full">
          <MainFilterPage
            title="Gerenciamento de Lista"
            primaryBtnLabel="Iniciar Compra"
            secondaryBtnLabel="Adicionar Produto"
            handlePrimaryBtn={handleStartShopping}
            onSubmitFilter={(date) => handleFilter(date)}
            primaryBtnVariant="outline"
            secondaryBtnVariant="creation"
          />
        </div>
      </MainContainer>
    </div>
  );
};
