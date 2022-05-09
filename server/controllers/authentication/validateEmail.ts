import { Request, Response } from 'express';
import { verfiyToken, CustomError } from '../../utils';
import User from '../../database/Models/User';

const validateEmail = async (req: Request, res: Response) => {
  const { accessToken }: { accessToken?: string } = req.query;
  if (!accessToken) {
    throw new CustomError('Access token not found', 401);
  }

  const { email }: any = await verfiyToken(accessToken);
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  await User.updateOne({ email }, { $set: { is_verified: true } });

  return res.json({
    data: user,
    message: 'Your account is verified successfully',
  });
};

export default validateEmail;
