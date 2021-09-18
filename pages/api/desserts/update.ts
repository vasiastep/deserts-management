import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../api/database/connectDB';
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
        const dessert = await Dessert.findById(id).populate('products.product');
        if (!dessert) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: dessert });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const dessert = await Dessert.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!dessert) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: dessert });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedDessert = await Dessert.deleteOne({ _id: id });

        if (!deletedDessert) {
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
