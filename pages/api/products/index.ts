import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../api/database/connectDB';
import Product from '../../../api/modules/products/product.model';
import User from '../../../api/modules/user/user.model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find({});

        await User.create({
          name: 'Oksana Stepanova',
          email: 'stepanovaoksana@gmail.com',
          password:
            '$2a$10$tl5Pq4FTkkgnDLG8JD.ZmeCh5J29dgcbRzJlaC8CQu8iFmXLxm97W',
        });

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
