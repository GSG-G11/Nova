import { Request, Response, NextFunction } from 'express';

import { VerfiyAuth } from '../../utils/auth';

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { JWT_SECRET } = req.cookies;

  if (!JWT_SECRET) {
    res.status(401).json({ message: 'Login First!' });
  } else {
    try {
      await VerfiyAuth(JWT_SECRET);
      next();
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized user' });
    }
  }
};

export default userAuth;
