import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../utils';

const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const { userInfo } = req;
  if (userInfo.role === 'admin') {
    next();
  } else {
    throw new CustomError('You are not authorized', 401);
  }
};

export default adminAuth;
