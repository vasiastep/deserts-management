import mongoose from 'mongoose';

export type DessertProduct = {
  productId: string;
  productName: string;
  productAmount: number;
  productPrice: number;
};

export type DessertModel = {
  name: string;
  price: number;
  products: string;
};

const DessertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    products: {
      type: [
        {
          _id: false,
          product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
          productAmount: { type: Number },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.models.Dessert ||
  mongoose.model('Dessert', DessertSchema);
