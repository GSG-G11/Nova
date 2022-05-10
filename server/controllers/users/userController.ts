import { Response } from 'express';
import { RequestType } from '../../utils';

const updateReview = async (req: RequestType, res: Response) => {
  const { interviewId } : any = req.params;

  res.send(interviewId);
};

export {
  // eslint-disable-next-line import/prefer-default-export
  updateReview,
};
