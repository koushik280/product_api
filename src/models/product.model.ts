import { Schema, model, Document } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  category: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      index: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

export const Product = model<ProductDocument>(
  "Product",
  productSchema
);
