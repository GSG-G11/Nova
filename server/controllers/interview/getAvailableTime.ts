import { Response } from 'express';
import { RequestType } from '../../utils';

const getAvailableTime = async (req: RequestType, res: Response) => {
  res.send('getAvailableTime');
};

export default getAvailableTime;
