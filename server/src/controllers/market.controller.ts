import { Request, Response } from "express";
import {
  createMarketList,
  createNewProductForMarketList,
  deleteMarketList,
  deleteProductFromMarketList,
  getMarketList,
  updateMarketList,
  updateProductFromMarketList,
} from "../services/market.service";
import { SearchRequest } from "../interfaces/requests/general";
import { BAD_REQUEST, OK } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import { StatusList } from "../enums/market";
import { getMonth, getYear } from "../utils/date";
import { marketSchema } from "../schemas/market.schemas";
import { CreateMarketList } from "../interfaces/requests/market";
import appAssert from "../utils/app-assert";

export const getMarketListHandler = catchErrors(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { to, from } = req.query as unknown as SearchRequest;

    const marketList = await getMarketList(user.userId, from, to);
    return res.status(OK).json(marketList);
  }
);

export const createMarketListHandler = catchErrors(
  async (req: Request, res: Response) => {
    const user = req.user;
    const newMarketList: CreateMarketList = {
      ...req.body,
      accountId: user.userId,
      createdAt: new Date().toISOString(),
      status: StatusList.ACTIVE,
      effectiveMonth: getMonth(req.body.date) + 1,
      effectiveYear: getYear(req.body.date),
      products: [],
    };
    marketSchema.parse(newMarketList);
    const market = await createMarketList(newMarketList);
    return res.status(201).json(market);
  }
);

export const updateMarketListHandler = catchErrors(
  async (req: Request, res: Response) => {
    const marketId = req.params.id;
    const updatedMarketList: CreateMarketList = {
      ...req.body,
      effectiveMonth: getMonth(req.body.date) + 1,
      effectiveYear: getYear(req.body.date),
    };
    marketSchema.parse(updatedMarketList);

    const market = await updateMarketList(marketId, updatedMarketList);
    return res.status(OK).json(market);
  }
);

export const deleteMarketListHandler = catchErrors(
  async (req: Request, res: Response) => {
    const marketId = req.params.id;
    const deletedMarketList = await deleteMarketList(marketId);
    return res.status(OK).json(deletedMarketList);
  }
);

export const updateProductFromMarketListHandler = catchErrors(
  async (req: Request, res: Response) => {
    const marketId = req.params.id;
    const updatedProduct = req.body;

    const market = await updateProductFromMarketList(
      marketId,
      updatedProduct.id,
      updatedProduct
    );
    return res.status(OK).json(market);
  }
);

export const createNewProductForMarketListHandler = catchErrors(
  async (req: Request, res: Response) => {
    const marketId = req.params.id;
    const newProduct = req.body;

    const market = await createNewProductForMarketList(marketId, newProduct);
    return res.status(OK).json(market);
  }
);

export const deleteProductFromMarketListHandler = catchErrors(
  async (req: Request, res: Response) => {
    const marketId = req.params.id;
    const productId = req.query.productId;

    if (!productId) {
      appAssert(false, BAD_REQUEST, "Product ID is required for deletion");
    }

    const market = await deleteProductFromMarketList(
      marketId,
      productId as string
    );
    return res.status(OK).json(market);
  }
);
