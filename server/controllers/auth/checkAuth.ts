import { Response } from 'express';
import { RequestType as Request } from '../../utils';

const checkAuth = (req: Request, res: Response) => {
  const { userInfo } = req;
  res.json({ data: userInfo });
};

export default checkAuth;
