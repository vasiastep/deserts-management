import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../api/database/connectDB';
import Product from '../../../api/modules/products/product.model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find({});

        res.status(200).json({ success: true, data: products });
      } catch (error) {
        console.log(error);

        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const product = await Product.create(req.body);

        res.status(201).json({ success: true, data: product });
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
