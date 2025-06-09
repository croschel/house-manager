import mongoose from "mongoose";
import { ProductDocument } from "./product.model";
import { StatusList } from "../enums/market";

export interface MarketDocument extends mongoose.Document {
  id: string;
  accountId: string;
  totalValue: number;
  date: Date;
  location: string;
  status: StatusList;
  effectiveMonth: number;
  effectiveYear: number;
  products: mongoose.Types.Array<ProductDocument>;
  createdAt: Date;
  updatedAt: Date;
}

const marketSchema = new mongoose.Schema(
  {
    accountId: {
      type: String,
      required: true,
    },
    totalValue: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: Object.values(StatusList),
      required: true,
      default: StatusList.ACTIVE,
    },
    effectiveMonth: {
      type: Number,
      required: true,
    },
    effectiveYear: {
      type: Number,
      required: true,
    },
    products: {
      type: mongoose.Schema.Types.Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const MarketModel = mongoose.model<MarketDocument>("Market", marketSchema);

export default MarketModel;
