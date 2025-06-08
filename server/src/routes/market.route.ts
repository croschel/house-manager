import { Router } from "express";
import {
  createMarketListHandler,
  createNewProductForMarketListHandler,
  deleteMarketListHandler,
  deleteProductFromMarketListHandler,
  getMarketListHandler,
  updateMarketListHandler,
  updateProductFromMarketListHandler,
} from "../controllers/market.controller";
import { authenticate } from "../middleware/authenticate";

const marketRoutes = Router();

marketRoutes.get("/list", authenticate, getMarketListHandler);
marketRoutes.post("/create", authenticate, createMarketListHandler);
marketRoutes.put("/update/:id", authenticate, updateMarketListHandler);
marketRoutes.delete("/delete/:id", authenticate, deleteMarketListHandler);
marketRoutes.put(
  "/update-product/:id",
  authenticate,
  updateProductFromMarketListHandler
);
marketRoutes.post(
  "/create-product/:id",
  authenticate,
  createNewProductForMarketListHandler
);
marketRoutes.delete(
  "/delete-product/:id",
  authenticate,
  deleteProductFromMarketListHandler
);

export default marketRoutes;
