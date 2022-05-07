import { Response, NextFunction } from 'express';
import { CustomError } from '../../utils';
import { verfiyAuth } from '../../utils/auth';

const userAuth = async (req: any, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    throw new CustomError('Login First!', 401);
  } else {
    const userInfo = await verfiyAuth(token);
    if (userInfo.isVerified) {
      req.userInfo = userInfo;
      next();
    } else {
      throw new CustomError('You need to verify your account!', 401);
    }
  }
};

export default userAuth;
