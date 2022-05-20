import { Response, NextFunction } from 'express';
import { CustomError, RequestType } from '../../utils';

const checkInterviewer = (req: RequestType, res:Response, next: NextFunction) => {
  const { role } : any = req.userInfo;

  if (role !== 'interviewer') {
    throw new CustomError('You are not authorized to access this resource', 401);
  }

  return next();
};

export default checkInterviewer;
