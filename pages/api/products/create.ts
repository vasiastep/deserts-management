import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../api/database/connectDB';
import Product from '../../../api/modules/products/product.model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'POST':
      try {
        const data = req.body;

        const product = await Product.findOne({ name: data.name });

        if (product) {
          return res
            .status(400)
            .json({ success: false, message: 'Already exists' });
        }

        const newProduct = await Product.create(data);

        res.status(201).json({ success: true, data: { name: newProduct } });
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
