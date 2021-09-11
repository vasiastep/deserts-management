import mongoose from 'mongoose';

export interface DessertProduct extends mongoose.Document {
  productId: string;
  productName: string;
  productAmount: number;
  productPrice: number;
}

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
          productId: { type: String },
          productName: { type: String },
          productAmount: { type: Number },
          productPrice: { type: Number },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.models.Dessert ||
  mongoose.model('Dessert', DessertSchema);
