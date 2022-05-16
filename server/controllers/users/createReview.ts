import { Response } from 'express';
import { RequestType } from '../../utils';

const createReview = async (req: RequestType, res: Response) => {
  const { id } = req.params;
  res.send(id);
};

export default createReview;
