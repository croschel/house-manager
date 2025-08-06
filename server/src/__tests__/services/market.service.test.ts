import MarketModel from "../../models/market.model";
import * as marketService from "../../services/market.service";
import appAssert from "../../utils/app-assert";
import { CreateMarketList, Product } from "../../interfaces/requests/market";
import { SupermarketSections } from "../../enums/market";

jest.mock("../../models/market.model");
jest.mock("../../utils/app-assert");

describe("Market Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getMarketList", () => {
    it("should return all market lists when no date range is provided", async () => {
      const accountId = "account123";
      const mockMarketLists = [
        { _id: "market1", location: "Store 1", accountId },
        { _id: "market2", location: "Store 2", accountId },
      ];

      (MarketModel.find as jest.Mock).mockResolvedValue(mockMarketLists);

      const result = await marketService.getMarketList(accountId, null as any);

      expect(MarketModel.find).toHaveBeenCalledWith({ accountId });
      expect(result).toEqual(mockMarketLists);
    });

    it("should return market lists within date range", async () => {
      const accountId = "account123";
      const fromDate = new Date("2024-01-01");
      const toDate = new Date("2024-01-31");
      const mockMarketLists = [
        { _id: "market1", location: "Store 1", accountId, date: "2024-01-15" },
      ];

      (MarketModel.find as jest.Mock).mockResolvedValue(mockMarketLists);

      const result = await marketService.getMarketList(
        accountId,
        fromDate,
        toDate
      );

      expect(MarketModel.find).toHaveBeenCalledWith({
        accountId,
        date: {
          $gte: fromDate.toISOString(),
          $lte: toDate.toISOString(),
        },
      });
      expect(result).toEqual(mockMarketLists);
    });

    it("should return empty array when no market lists found", async () => {
      const accountId = "account123";
      const fromDate = new Date("2024-01-01");

      (MarketModel.find as jest.Mock).mockResolvedValue(null);

      const result = await marketService.getMarketList(accountId, fromDate);

      expect(result).toEqual([]);
    });
  });

  describe("createMarketList", () => {
    it("should create a new market list successfully", async () => {
      const newMarketList: CreateMarketList = {
        accountId: "account123",
        totalValue: 150.75,
        date: new Date("2024-01-15"),
        location: "Supermarket XYZ",
        effectiveMonth: 1,
        effectiveYear: 2024,
        products: [],
      };

      const mockCreatedMarketList = { _id: "market123", ...newMarketList };

      (MarketModel.create as jest.Mock).mockResolvedValue(
        mockCreatedMarketList
      );

      const result = await marketService.createMarketList(newMarketList);

      expect(MarketModel.create).toHaveBeenCalledWith(newMarketList);
      expect(result).toEqual(mockCreatedMarketList);
    });
  });

  describe("updateMarketList", () => {
    it("should update market list successfully", async () => {
      const marketId = "market123";
      const updatedMarketList: CreateMarketList = {
        accountId: "account123",
        totalValue: 200.5,
        date: new Date("2024-01-15"),
        location: "Updated Store",
        effectiveMonth: 1,
        effectiveYear: 2024,
        products: [],
      };

      const mockUpdatedMarketList = { _id: marketId, ...updatedMarketList };

      (MarketModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        mockUpdatedMarketList
      );

      const result = await marketService.updateMarketList(
        marketId,
        updatedMarketList
      );

      expect(MarketModel.findByIdAndUpdate).toHaveBeenCalledWith(
        marketId,
        updatedMarketList,
        { new: true }
      );
      expect(result).toEqual(mockUpdatedMarketList);
    });

    it("should throw if market list not found", async () => {
      const marketId = "nonexistent";
      const updatedMarketList: CreateMarketList = {
        accountId: "account123",
        totalValue: 200.5,
        date: new Date("2024-01-15"),
        location: "Updated Store",
        effectiveMonth: 1,
        effectiveYear: 2024,
        products: [],
      };

      (MarketModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
      (appAssert as jest.Mock).mockImplementationOnce(
        (value, status, message) => {
          if (!value) throw new Error(message);
        }
      );

      await expect(
        marketService.updateMarketList(marketId, updatedMarketList)
      ).rejects.toThrow("Market list not found or update failed");
    });
  });

  describe("deleteMarketList", () => {
    it("should delete market list successfully", async () => {
      const marketId = "market123";
      const mockDeletedMarketList = {
        _id: marketId,
        location: "Test Store",
        accountId: "account123",
      };

      (MarketModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        mockDeletedMarketList
      );

      const result = await marketService.deleteMarketList(marketId);

      expect(MarketModel.findByIdAndDelete).toHaveBeenCalledWith(marketId);
      expect(appAssert).toHaveBeenCalledWith(
        mockDeletedMarketList,
        expect.anything(),
        "Market list not found or delete failed"
      );
      expect(result).toEqual(mockDeletedMarketList);
    });

    it("should throw if market list not found for deletion", async () => {
      const marketId = "nonexistent";

      (MarketModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
      (appAssert as jest.Mock).mockImplementationOnce(
        (value, status, message) => {
          if (!value) throw new Error(message);
        }
      );

      await expect(marketService.deleteMarketList(marketId)).rejects.toThrow(
        "Market list not found or delete failed"
      );
    });
  });

  describe("updateProductFromMarketList", () => {
    it("should update product in market list successfully", async () => {
      const marketId = "market123";
      const productId = "1";
      const productData = { done: true, value: 25.5 };

      const mockProduct = {
        id: "1",
        name: "Product 1",
        amount: 2,
        value: 20.0,
        done: false,
        category: SupermarketSections.PRODUCE,
        createdAt: "2024-01-01",
        updatedAt: "",
      };

      const mockMarketList = {
        _id: marketId,
        products: [mockProduct],
        save: jest.fn().mockResolvedValue(undefined),
      };

      (MarketModel.findById as jest.Mock).mockResolvedValue(mockMarketList);

      const result = await marketService.updateProductFromMarketList(
        marketId,
        productId,
        productData
      );

      expect(MarketModel.findById).toHaveBeenCalledWith(marketId);
      expect(appAssert).toHaveBeenCalledWith(
        mockMarketList,
        expect.anything(),
        "Market list not found"
      );
      expect(appAssert).toHaveBeenCalledWith(
        true,
        expect.anything(),
        "Product not found in market list"
      );
      expect(mockMarketList.products[0].done).toBe(true);
      expect(mockMarketList.products[0].value).toBe(25.5);
      expect(mockMarketList.save).toHaveBeenCalled();
      expect(result).toEqual(mockMarketList);
    });

    it("should throw if market list not found", async () => {
      const marketId = "nonexistent";
      const productId = "1";
      const productData = { done: true };

      (MarketModel.findById as jest.Mock).mockResolvedValue(null);
      (appAssert as jest.Mock).mockImplementationOnce(
        (value, status, message) => {
          if (!value) throw new Error(message);
        }
      );

      await expect(
        marketService.updateProductFromMarketList(
          marketId,
          productId,
          productData
        )
      ).rejects.toThrow("Market list not found");
    });

    it("should throw if product not found in market list", async () => {
      const marketId = "market123";
      const productId = "999";
      const productData = { done: true };

      const mockMarketList = {
        products: [
          {
            id: "1",
            name: "Product 1",
            amount: 2,
            value: 20.0,
            done: false,
            category: SupermarketSections.PRODUCE,
            createdAt: "2024-01-01",
            updatedAt: "",
          },
        ],
      };

      (MarketModel.findById as jest.Mock).mockResolvedValue(mockMarketList);
      (appAssert as jest.Mock)
        .mockImplementationOnce(() => {}) // market list exists, do nothing
        .mockImplementationOnce((value, status, message) => {
          if (!value) throw new Error(message);
        });

      await expect(
        marketService.updateProductFromMarketList(
          marketId,
          productId,
          productData
        )
      ).rejects.toThrow("Product not found in market list");
    });
  });

  describe("createNewProductForMarketList", () => {
    it("should create new product in market list successfully", async () => {
      const marketId = "market123";
      const productData: Product = {
        id: "", // Will be auto-generated
        name: "New Product",
        amount: 1,
        value: 15.99,
        category: SupermarketSections.DAIRY,
        createdAt: "",
        updatedAt: "",
        done: false,
      };

      const mockMarketList = {
        _id: marketId,
        products: [
          { id: "1", name: "Existing Product", done: false },
          { id: "3", name: "Another Product", done: false },
        ],
        save: jest.fn().mockResolvedValue(undefined),
      };

      (MarketModel.findById as jest.Mock).mockResolvedValue(mockMarketList);

      const result = await marketService.createNewProductForMarketList(
        marketId,
        productData
      );

      expect(MarketModel.findById).toHaveBeenCalledWith(marketId);
      expect(appAssert).toHaveBeenCalledWith(
        mockMarketList,
        expect.anything(),
        "Market list not found"
      );
      expect(mockMarketList.products).toHaveLength(3);
      expect(mockMarketList.products[2].id).toBe("4"); // Next highest ID
      expect(mockMarketList.products[2].name).toBe("New Product");
      expect(mockMarketList.products[2].done).toBe(false);
      expect(mockMarketList.save).toHaveBeenCalled();
      expect(result).toEqual(mockMarketList);
    });

    it("should throw if market list not found", async () => {
      const marketId = "nonexistent";
      const productData: Product = {
        id: "",
        name: "New Product",
        amount: 1,
        value: 15.99,
        category: SupermarketSections.DAIRY,
        createdAt: "",
        updatedAt: "",
        done: false,
      };

      (MarketModel.findById as jest.Mock).mockResolvedValue(null);
      (appAssert as jest.Mock).mockImplementationOnce(
        (value, status, message) => {
          if (!value) throw new Error(message);
        }
      );

      await expect(
        marketService.createNewProductForMarketList(marketId, productData)
      ).rejects.toThrow("Market list not found");
    });
  });

  describe("deleteProductFromMarketList", () => {
    it("should delete product from market list successfully", async () => {
      const marketId = "market123";
      const productId = "2";

      const mockMarketList = {
        _id: marketId,
        products: [
          { id: "1", name: "Product 1" },
          { id: "2", name: "Product 2" },
          { id: "3", name: "Product 3" },
        ],
        save: jest.fn().mockResolvedValue(undefined),
      };

      (MarketModel.findById as jest.Mock).mockResolvedValue(mockMarketList);

      const result = await marketService.deleteProductFromMarketList(
        marketId,
        productId
      );

      expect(MarketModel.findById).toHaveBeenCalledWith(marketId);
      expect(appAssert).toHaveBeenCalledWith(
        mockMarketList,
        expect.anything(),
        "Market list not found"
      );
      expect(appAssert).toHaveBeenCalledWith(
        true,
        expect.anything(),
        "Product not found in market list"
      );
      expect(mockMarketList.products).toHaveLength(2);
      expect(mockMarketList.products.find((p) => p.id === "2")).toBeUndefined();
      expect(mockMarketList.save).toHaveBeenCalled();
      expect(result).toEqual(mockMarketList);
    });

    it("should throw if market list not found", async () => {
      const marketId = "nonexistent";
      const productId = "1";

      (MarketModel.findById as jest.Mock).mockResolvedValue(null);
      (appAssert as jest.Mock).mockImplementationOnce(
        (value, status, message) => {
          if (!value) throw new Error(message);
        }
      );

      await expect(
        marketService.deleteProductFromMarketList(marketId, productId)
      ).rejects.toThrow("Market list not found");
    });

    it("should throw if product not found in market list", async () => {
      const marketId = "market123";
      const productId = "999";

      const mockMarketList = {
        products: [
          { id: "1", name: "Product 1" },
          { id: "2", name: "Product 2" },
        ],
      };

      (MarketModel.findById as jest.Mock).mockResolvedValue(mockMarketList);
      (appAssert as jest.Mock)
        .mockImplementationOnce(() => {}) // market list exists, do nothing
        .mockImplementationOnce((value, status, message) => {
          if (!value) throw new Error(message);
        });

      await expect(
        marketService.deleteProductFromMarketList(marketId, productId)
      ).rejects.toThrow("Product not found in market list");
    });
  });
});
