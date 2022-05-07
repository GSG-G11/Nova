import { Request, Response } from 'express';
import { verifyToken, CustomError } from '../../utils';
import User from '../../database/Models/User';

const validateEmail = async (req: Request, res: Response) => {
  const { accessToken }: { accessToken?: string } = req.query;

  if (!accessToken) {
    throw new CustomError('Access token not found', 401);
  }
  const token: any = await verifyToken(accessToken);

  const user = await User.findOne({ email: token.email });

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  await User.updateOne({ email: token.email }, { $set: { is_verified: true } });

  return res.status(200).json({
    data: user,
    message: 'Email Valedated successfully',
  });
};

export default validateEmail;
