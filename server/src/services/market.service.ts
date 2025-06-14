import { BAD_REQUEST } from "../constants/http";
import { CreateMarketList, Product } from "../interfaces/requests/market";
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

export const deleteMarketList = async (marketId: string) => {
  const deletedMarketList = await MarketModel.findByIdAndDelete(marketId);
  appAssert(
    deletedMarketList,
    BAD_REQUEST,
    "Market list not found or delete failed"
  );
  return deletedMarketList;
};

export const updateProductFromMarketList = async (
  marketId: string,
  productId: string,
  productData: any
) => {
  const marketList = await MarketModel.findById(marketId);
  appAssert(marketList, BAD_REQUEST, "Market list not found");
  const productIndex = marketList.products.findIndex((product) => {
    console.log("product", product);
    console.log("product.id", product.id);
    console.log("productId", productId);
    return product.id === productId;
  });
  appAssert(
    productIndex !== -1,
    BAD_REQUEST,
    "Product not found in market list"
  );

  marketList.products[productIndex] = {
    ...marketList.products[productIndex],
    ...productData,
    updatedAt: new Date().toISOString(),
  };

  await marketList.save();
  return marketList;
};

export const createNewProductForMarketList = async (
  marketId: string,
  productData: Product
) => {
  const marketList = await MarketModel.findById(marketId);
  appAssert(marketList, BAD_REQUEST, "Market list not found");

  const highestId = marketList.products.reduce((max, product) => {
    const idNum = parseInt(product.id, 10);
    return isNaN(idNum) ? max : Math.max(max, idNum);
  }, 0);

  const newProductData = {
    ...productData,
    id: (highestId + 1).toString(),
    createdAt: new Date().toISOString(),
    updatedAt: "",
    done: false,
  };

  marketList.products.push(newProductData);
  await marketList.save();
  return marketList;
};

export const deleteProductFromMarketList = async (
  marketId: string,
  productId: string
) => {
  const marketList = await MarketModel.findById(marketId);
  appAssert(marketList, BAD_REQUEST, "Market list not found");

  const productIndex = marketList.products.findIndex(
    (product) => product.id === productId
  );
  appAssert(
    productIndex !== -1,
    BAD_REQUEST,
    "Product not found in market list"
  );

  marketList.products.splice(productIndex, 1);
  await marketList.save();
  return marketList;
};
