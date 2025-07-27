import { RootState } from '..';

export const selectMarketListSelected = (state: RootState) =>
  state.market.selectedMarketList;

export const selectMarketList = (state: RootState) =>
  state.market.allMarketList;

export const selectMarketDateFilter = (state: RootState) =>
  state.market.marketDateFilter;

export const selectMarketInfo = (state: RootState) => {
  const { allMarketList } = state.market;
  let lastTotalPaid = '$0.00';
  let lastLocation = '';
  let lastCheaperProduct = {
    name: '',
    value: '$0.00'
  };
  let lastExpensiveProduct = {
    name: '',
    value: '$0.00'
  };

  if (allMarketList.length > 0) {
    const sortedMarketList = [...allMarketList].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    const lastProduct = [...sortedMarketList[0].products].sort((a, b) => {
      return b.value - a.value;
    });
    lastTotalPaid = `$${sortedMarketList[0].totalValue.toFixed(2) ?? '0.00'}`;
    lastLocation = sortedMarketList[0].location ?? '';
    lastCheaperProduct = {
      name: lastProduct[0]?.name,
      value: `$${lastProduct[0]?.value.toFixed(2) ?? '0.00'}`
    };
    lastExpensiveProduct = {
      name: lastProduct[lastProduct.length - 1]?.name,
      value: `$${lastProduct[lastProduct.length - 1]?.value.toFixed(2) ?? '0.00'}`
    };
  }
  return {
    lastTotalPaid,
    lastLocation,
    lastCheaperProduct,
    lastExpensiveProduct
  };
};
