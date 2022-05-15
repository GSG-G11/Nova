/* eslint-disable no-unused-vars */
import {
  Request, Response, NextFunction,
} from 'express';
import { CustomError } from '../../utils';

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: error.message,
    });
  }

  const status = error.code || 500;
  const message = error.message || 'Something went wrong';

  return res.status(status).send({
    status,
    message,
  });
};

export default errorHandler;
