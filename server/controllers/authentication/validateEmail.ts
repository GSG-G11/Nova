import { Request, Response } from 'express';
import { verifyToken } from '../../utils';
import userSchema from '../../database/models/user';

const validateEmail = async (req: Request, res: Response) => {
  try {
    const { accessToken }: { accessToken?: string } = req.query;

    if (!accessToken) {
      return res.status(401).json({
        data: 'No token provided',
        message: 'accessToken is not defined',
      });
    }
    const token: any = await verifyToken(accessToken);

    const user = await userSchema.findOne({ token });

    await userSchema.updateOne({ token }, { $set: { is_verified: true } });

    return res.status(200).json({
      data: user,
      message: 'Email Valedated successfully',
    });
  } catch (error) {
    return res.json(error);
  }
};

export default validateEmail;
