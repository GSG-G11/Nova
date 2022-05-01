import { Response, NextFunction } from 'express';
import CustomError from '../../utils/CustomError/index';

import { verfiyAuth } from '../../utils/auth';

const userAuth = async (req: any, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    next(new CustomError('Login First!', 401));
  } else {
    const { decoded } = await verfiyAuth(token);
    const { userInfo } = decoded;
    req.userInfo = userInfo;
    next();
  }
};

export default userAuth;
