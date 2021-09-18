import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../api/database/connectDB';
import Dessert from '../../../api/modules/desserts/dessert.model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'POST':
      try {
        const data = req.body;

        const dessert = await Dessert.findOne({ name: data.name });

        if (dessert) {
          return res
            .status(400)
            .json({ success: false, message: 'Already exists' });
        }

        const newDessert = await Dessert.create(data);

        res.status(201).json({ success: true, data: newDessert });
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
