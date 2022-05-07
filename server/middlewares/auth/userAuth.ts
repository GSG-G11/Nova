import { Response, NextFunction } from 'express';
import { CustomError, RequestType, verifyToken } from '../../utils';

const userAuth = async (req: RequestType, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    throw new CustomError('Login First!', 401);
  } else {
    const userInfo: any = await verifyToken(token);
    if (userInfo.isVerified) {
      req.userInfo = userInfo;
      next();
    } else {
      throw new CustomError('You need to verify your account!', 401);
    }
  }
};

export default userAuth;
