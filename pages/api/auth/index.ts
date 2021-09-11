import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../api/database/connectDB';
import AuthController from '../../../api/modules/auth/auth.controller';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'POST':
      try {
        const { email, password } = req.body;

        const authData = await AuthController.authUserViaPassword(
          email,
          password,
        );

        res.status(200).json({ success: true, data: authData });
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
