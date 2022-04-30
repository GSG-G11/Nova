import { Request, Response, NextFunction } from 'express';

const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const { userInfo } = req;
  // eslint-disable-next-line no-unused-expressions
  userInfo.role === 'admin' ? next() : res.status(401).json({ message: 'You are unathorized' });
};

export default adminAuth;
