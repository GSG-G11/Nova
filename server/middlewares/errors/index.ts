// eslint-disable-next-line import/no-import-module-exports
import { Request, Response } from 'express';

const errorHandler = (err: Error, req: Request, res: Response) => {
  if (err.code) {
    res.status(err.code).json({
      status: err.code,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};
module.exports = errorHandler;
