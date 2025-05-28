import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
  id: string;
  name: string;
  amount: number;
  value: number;
  createdAt: string;
  updatedAt: string;
  category: string; // Assuming category is a string, adjust if it's an enum
  done: boolean;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
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

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);
export default ProductModel;
