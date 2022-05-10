import { Response, NextFunction } from 'express';
import { CustomError, RequestType } from '../../utils';

const adminAuth = (req: RequestType, res: Response, next: NextFunction) => {
  const { userInfo } = req;
  if (userInfo?.role === 'admin') {
    next();
  } else {
    throw new CustomError('You are not authorized', 401);
  }
};

export default adminAuth;
