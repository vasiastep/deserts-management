import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from "mongoose";

import connectDB from '../../../api/database/connectDB';
import Product from '../../../api/modules/products/product.model';
import Dessert from '../../../api/modules/desserts/dessert.model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!product) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const matchedDessert = await Dessert.findOne({ products: { $elemMatch: { product: new mongoose.Types.ObjectId(id as string) } } });

        if (matchedDessert) {
          return res.status(400).json({ success: false, message: `Продукт використовується в десерті: ${matchedDessert.name}` })
        }

        const deletedProduct = await Product.deleteOne({ _id: id });
        if (!deletedProduct) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
