import { Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { RequestType, CustomError } from '../../utils';

const checkIdValid = (req: RequestType, res: Response, next: NextFunction) => {
  const { interviewId } = req.params;

  const validId: boolean = Types.ObjectId.isValid(interviewId);

  if (!validId) {
    throw new CustomError('Invalid ID', 400);
  }

  next();
};

export default checkIdValid;
