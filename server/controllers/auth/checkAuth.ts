import { Response } from 'express';

const checkAuth = (req: any, res: Response) => {
  const { userInfo } = req;
  res.status(200).json({ data: userInfo });
};

export default checkAuth;
