import mongoose from 'mongoose';

import { ProductModel } from '../products/product.model';

export type DessertProduct = {
  product: string | ProductModel;
  quantity: number;
};

export type DessertModel = {
  _id: string;
  name: string;
  products: DessertProduct[];
  utilitiesPercent: number;
  profitPercent: number;
};

const DessertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    products: {
      type: [
        {
          _id: false,
          product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
          quantity: { type: Number },
        },
      ],
      default: [],
    },
    utilitiesPercent: {
      type: Number,
      default: 0,
    },
    profitPercent: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Dessert ||
  mongoose.model('Dessert', DessertSchema);
