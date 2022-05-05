import { Request, Response } from 'express';
import { verifyToken } from '../../utils';
import User from '../../database/Models/User';

const validateEmail = async (req: Request, res: Response) => {
  const { accessToken }: { accessToken?: string } = req.query;

  if (!accessToken) {
    return res.status(401).json({
      data: 'No token provided',
      message: 'accessToken is not defined',
    });
  }
  const token: any = await verifyToken(accessToken);

  const user = await User.findOne({ email: token });

  if (!user) {
    return res.status(401).json({
      data: 'No user found',
      message: 'User not found',
    });
  }

  await User.updateOne({ email: token }, { $set: { is_verified: true } });

  return res.status(200).json({
    data: user,
    message: 'Email Valedated successfully',
  });
};

export default validateEmail;
