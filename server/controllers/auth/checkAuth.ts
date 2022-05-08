import { Response } from 'express';
import { RequestType } from '../../utils';

const checkAuth = (req: RequestType, res: Response) => {
  const { userInfo } = req;
  res.json({ data: userInfo });
};

export default checkAuth;
