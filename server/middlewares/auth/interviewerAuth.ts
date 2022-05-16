import { Response, NextFunction } from 'express';
import { RequestType } from '../../utils';

const checkInterviewer = (req: RequestType, res:Response, next: NextFunction) => {
  const { role } : any = req.userInfo;

  if (role !== 'interviewer') {
    return res.status(401).send({
      message: 'You are not authorized to access this resource',
    });
  }

  return next();
};

export default checkInterviewer;
