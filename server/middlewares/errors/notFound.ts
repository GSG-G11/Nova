import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../utils';

const notFound = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (error.code === 404) {
    return res.status(404).send({
      status: 404,
      message: error.message,
    });
  }
  return next(error);
};

export default notFound;
