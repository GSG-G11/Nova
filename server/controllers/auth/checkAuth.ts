import { Response } from 'express';

const checkAuth = (req: any, res: Response) => {
  const { userInfo } = req;
  res.json({ data: userInfo });
};

export default checkAuth;
