import { Request, Response } from "express";
import { getMarketList } from "../services/market.service";
import { SearchRequest } from "../interfaces/requests/general";
import { OK } from "../constants/http";
import catchErrors from "../utils/catchErrors";

export const getMarketListHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { accountId, to, from } = req.query as unknown as SearchRequest;

    const marketList = await getMarketList(accountId, from, to);
    return res.status(OK).json({ marketList });
  }
);

export const createMarketListHandler = catchErrors(
  async (req: Request, res: Response) => {
    return res.status(OK).json({ message: "Not implemented yet" });
  }
);

export const updateMarketListHandler = catchErrors(
  async (req: Request, res: Response) => {
    res.status(OK).json({ message: "Not implemented yet" });
  }
);

export const deleteMarketListHandler = catchErrors(
  async (req: Request, res: Response) => {
    res.status(OK).json({ message: "Not implemented yet" });
  }
);

export const updateProductFromMarketListHandler = catchErrors(
  async (req: Request, res: Response) => {
    res.status(OK).json({ message: "Not implemented yet" });
  }
);

export const createNewProductForMarketListHandler = catchErrors(
  async (req: Request, res: Response) => {
    res.status(OK).json({ message: "Not implemented yet" });
  }
);

export const deleteProductFromMarketListHandler = catchErrors(
  async (req: Request, res: Response) => {
    res.status(OK).json({ message: "Not implemented yet" });
  }
);
