import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../api/database/connectDB';
import Dessert from '../../../api/modules/desserts/dessert.model';
import Product from '../../../api/modules/products/product.model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        await Product.countDocuments();
        const desserts = await Dessert.find({}).populate('products.product');

        res.status(200).json({ success: true, data: desserts });
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
