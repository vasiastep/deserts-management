import mongoose from 'mongoose';

export type ProductModel = {
  _id: string;
  name: string;
  price: number;
  caloricContent: number;
};

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    caloricContent: {
      type: Number,
      required: false,
    }
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);
