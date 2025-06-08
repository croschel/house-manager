import { BAD_REQUEST } from "../constants/http";
import { CreateMarketList } from "../interfaces/requests/market";
import MarketModel from "../models/market.model";
import appAssert from "../utils/app-assert";

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

export const createMarketList = async (market: CreateMarketList) => {
  return await MarketModel.create(market);
};

export const updateMarketList = async (
  marketId: string,
  market: CreateMarketList
) => {
  const updateMarketList = await MarketModel.findByIdAndUpdate(
    marketId,
    market,
    {
      new: true,
    }
  );
  if (!updateMarketList) {
    appAssert(
      updateMarketList,
      BAD_REQUEST,
      "Market list not found or update failed"
    );
  }
  return updateMarketList;
};
