import { Router } from "express";
import { getMarketListHandler } from "../controllers/market.controller";

const marketRoutes = Router();

marketRoutes.get("/list", getMarketListHandler);

export default marketRoutes;
