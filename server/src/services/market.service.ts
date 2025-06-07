import MarketModel from "../models/market.model";

export const getMarketList = async (
  accountId: string,
  from: Date,
  to?: Date
) => {
  // Check if date range is provided
  if (!from && !to) {
    const res = await MarketModel.find({ accountId });
    return res;
  }
  const marketList = await MarketModel.find({
    accountId,
    date: {
      $gte: new Date(from).toISOString(),
      $lte:
        to !== undefined
          ? new Date(to).toISOString()
          : new Date().toISOString(),
    },
  });
  if (!marketList) {
    return [];
  }
  return marketList;
};
