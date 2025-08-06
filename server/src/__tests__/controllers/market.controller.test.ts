import { Request, Response, NextFunction } from "express";
import * as marketController from "../../controllers/market.controller";
import * as marketService from "../../services/market.service";
import { marketSchema } from "../../schemas/market.schemas";
import { StatusList } from "../../enums/market";
import { getMonth, getYear } from "../../utils/date";
import appAssert from "../../utils/app-assert";

jest.mock("../../services/market.service");
jest.mock("../../schemas/market.schemas");
jest.mock("../../utils/date");
jest.mock("../../utils/app-assert");

describe("Market Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockReq = {
      body: {},
      query: {},
      params: {},
      user: {
        userId: "user123",
        sessionId: "session123",
        iat: 1234567890,
        exp: 1234567890,
        aud: ["test"],
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getMarketListHandler", () => {
    it("should get market lists successfully", async () => {
      const mockMarketLists = [
        { _id: "market1", location: "Store 1", totalValue: 150 },
        { _id: "market2", location: "Store 2", totalValue: 200 },
      ];

      mockReq.query = {
        from: "2024-01-01",
        to: "2024-01-31",
      } as any;

      (marketService.getMarketList as jest.Mock).mockResolvedValue(
        mockMarketLists
      );

      await marketController.getMarketListHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(marketService.getMarketList).toHaveBeenCalledWith(
        "user123",
        "2024-01-01",
        "2024-01-31"
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockMarketLists);
    });
  });

  describe("createMarketListHandler", () => {
    it("should create market list successfully", async () => {
      const marketData = {
        date: new Date("2024-01-15"),
        location: "Supermarket XYZ",
      };

      const mockCreatedMarketList = {
        _id: "market123",
        ...marketData,
        accountId: "user123",
        status: StatusList.ACTIVE,
        effectiveMonth: 2,
        effectiveYear: 2024,
        totalValue: 0,
        products: [],
      };

      mockReq.body = marketData;

      (getMonth as jest.Mock).mockReturnValue(1); // January (0-indexed)
      (getYear as jest.Mock).mockReturnValue(2024);
      (marketSchema.parse as jest.Mock).mockReturnValue({
        ...marketData,
        accountId: "user123",
        status: StatusList.ACTIVE,
        effectiveMonth: 2,
        effectiveYear: 2024,
        totalValue: 0,
        location: "",
        products: [],
      });
      (marketService.createMarketList as jest.Mock).mockResolvedValue(
        mockCreatedMarketList
      );

      await marketController.createMarketListHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(getMonth).toHaveBeenCalledWith(marketData.date);
      expect(getYear).toHaveBeenCalledWith(marketData.date);
      expect(marketSchema.parse).toHaveBeenCalled();
      expect(marketService.createMarketList).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockCreatedMarketList);
    });
  });

  describe("updateMarketListHandler", () => {
    it("should update market list successfully", async () => {
      const marketId = "market123";
      const updatedData = {
        date: new Date("2024-01-20"),
        location: "Updated Store",
        totalValue: 250,
      };

      const mockUpdatedMarketList = {
        _id: marketId,
        ...updatedData,
        effectiveMonth: 2,
        effectiveYear: 2024,
      };

      mockReq.params = { id: marketId };
      mockReq.body = updatedData;

      (getMonth as jest.Mock).mockReturnValue(1);
      (getYear as jest.Mock).mockReturnValue(2024);
      (marketSchema.parse as jest.Mock).mockReturnValue({
        ...updatedData,
        effectiveMonth: 2,
        effectiveYear: 2024,
      });
      (marketService.updateMarketList as jest.Mock).mockResolvedValue(
        mockUpdatedMarketList
      );

      await marketController.updateMarketListHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(getMonth).toHaveBeenCalledWith(updatedData.date);
      expect(getYear).toHaveBeenCalledWith(updatedData.date);
      expect(marketSchema.parse).toHaveBeenCalled();
      expect(marketService.updateMarketList).toHaveBeenCalledWith(
        marketId,
        expect.any(Object)
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedMarketList);
    });
  });

  describe("deleteMarketListHandler", () => {
    it("should delete market list successfully", async () => {
      const marketId = "market123";
      const mockDeletedMarketList = {
        _id: marketId,
        location: "Test Store",
      };

      mockReq.params = { id: marketId };

      (marketService.deleteMarketList as jest.Mock).mockResolvedValue(
        mockDeletedMarketList
      );

      await marketController.deleteMarketListHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(marketService.deleteMarketList).toHaveBeenCalledWith(marketId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockDeletedMarketList);
    });
  });

  describe("updateProductFromMarketListHandler", () => {
    it("should update product successfully", async () => {
      const marketId = "market123";
      const productData = {
        id: "product1",
        name: "Updated Product",
        value: 25.5,
        done: true,
      };

      const mockUpdatedMarketList = {
        _id: marketId,
        products: [productData],
      };

      mockReq.params = { id: marketId };
      mockReq.body = productData;

      (
        marketService.updateProductFromMarketList as jest.Mock
      ).mockResolvedValue(mockUpdatedMarketList);

      await marketController.updateProductFromMarketListHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(marketService.updateProductFromMarketList).toHaveBeenCalledWith(
        marketId,
        productData.id,
        productData
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedMarketList);
    });
  });

  describe("createNewProductForMarketListHandler", () => {
    it("should create new product successfully", async () => {
      const marketId = "market123";
      const productData = {
        name: "New Product",
        amount: 2,
        value: 15.99,
        category: "DAIRY",
      };

      const mockUpdatedMarketList = {
        _id: marketId,
        products: [{ ...productData, id: "1" }],
      };

      mockReq.params = { id: marketId };
      mockReq.body = productData;

      (
        marketService.createNewProductForMarketList as jest.Mock
      ).mockResolvedValue(mockUpdatedMarketList);

      await marketController.createNewProductForMarketListHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(marketService.createNewProductForMarketList).toHaveBeenCalledWith(
        marketId,
        productData
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedMarketList);
    });
  });

  describe("deleteProductFromMarketListHandler", () => {
    it("should delete product successfully", async () => {
      const marketId = "market123";
      const productId = "product1";

      const mockUpdatedMarketList = {
        _id: marketId,
        products: [],
      };

      mockReq.params = { id: marketId };
      mockReq.query = { productId };

      (
        marketService.deleteProductFromMarketList as jest.Mock
      ).mockResolvedValue(mockUpdatedMarketList);

      await marketController.deleteProductFromMarketListHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(marketService.deleteProductFromMarketList).toHaveBeenCalledWith(
        marketId,
        productId
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedMarketList);
    });

    it("should throw if productId is not provided", async () => {
      const marketId = "market123";

      mockReq.params = { id: marketId };
      mockReq.query = {};

      (appAssert as jest.Mock).mockImplementationOnce(
        (value, status, message) => {
          if (!value) throw new Error(message);
        }
      );

      await marketController.deleteProductFromMarketListHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(appAssert).toHaveBeenCalledWith(
        false,
        expect.anything(),
        "Product ID is required for deletion"
      );
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      const error = mockNext.mock.calls[0][0] as unknown as Error;
      expect(error.message).toBe("Product ID is required for deletion");
    });
  });
});
