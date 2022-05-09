import { Response, NextFunction } from 'express';
import { CustomError, verifyToken, RequestType as Request } from '../../utils';

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
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
