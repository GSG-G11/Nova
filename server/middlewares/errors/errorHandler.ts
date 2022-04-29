/* eslint-disable no-unused-vars */
import {
  Request, Response, NextFunction,
} from 'express';
import CustomError from '../../utils/CustomError';

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error.code || 500;
  const message = error.message || 'Something went wrong';
  res.status(status).send({
    status,
    message,
  });
};

export default errorHandler;
